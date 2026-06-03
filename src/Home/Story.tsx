import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, Sun, Moon } from "lucide-react";
import { FaBackward } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { useTheme } from "../context/useTheme";

// ── Types ─────────────────────────────────────────────────────────────────────
interface GitHubData {
  repos: number;
  followers: number;
  stars: number;
}
interface LeetCodeData {
  total: number;
  easy: number;
  medium: number;
  hard: number;
}

// ── Worker endpoints ──────────────────────────────────────────────────────────
const WORKER = "https://leetcode-stats-worker.yuvrajkarna.workers.dev";

const LC_CACHE_KEY = "lc_stats_cache";
const CACHE_TTL = 24 * 60 * 60 * 1000;

const LC_FALLBACK: LeetCodeData = { total: 1000, easy: 400, medium: 480, hard: 120 };
const GH_FALLBACK: GitHubData   = { repos: 30, followers: 50, stars: 25 };

function getCachedLC(): LeetCodeData | null {
  try {
    const raw = localStorage.getItem(LC_CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    return Date.now() - ts < CACHE_TTL ? data : null;
  } catch { return null; }
}
function setCachedLC(data: LeetCodeData) {
  try { localStorage.setItem(LC_CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); }
  catch { /* ignore */ }
}

// ── Animated number hook ──────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || target === 0) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── Sub-components ────────────────────────────────────────────────────────────
function Num({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <span ref={ref} className="font-mono tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-green-500">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
      live
    </span>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 my-16">
      <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/20" />
      <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Story() {
  const navigate  = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [gh,   setGh]   = useState<GitHubData>(GH_FALLBACK);
  const [lc,   setLc]   = useState<LeetCodeData>(LC_FALLBACK);
  const [ghLive, setGhLive] = useState(false);
  const [lcLive, setLcLive] = useState(false);

  // ── Fetch data ──────────────────────────────────────────────────────────
  useEffect(() => {
    // LeetCode – serve cache first
    const cached = getCachedLC();
    if (cached) { setLc(cached); setLcLive(true); }
    else {
      fetch(`${WORKER}/?username=yuvrajkarna27`)
        .then(r => r.json())
        .then(json => {
          const nums: { difficulty: string; count: number }[] =
            json?.data?.matchedUser?.submitStats?.acSubmissionNum ?? [];
          const get = (d: string) => nums.find(n => n.difficulty === d)?.count ?? 0;
          const data = { total: get("All"), easy: get("Easy"), medium: get("Medium"), hard: get("Hard") };
          setCachedLC(data);
          setLc(data);
          setLcLive(true);
        })
        .catch(() => {/* keep fallback */});
    }

    // GitHub
    fetch(`${WORKER}/github?username=yuvrajkarna2717`)
      .then(r => r.json())
      .then((data: GitHubData) => { setGh(data); setGhLive(true); })
      .catch(() => {/* keep fallback */});

    // Scroll progress
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = {
    leetcode:      "https://leetcode.com/u/yuvrajkarna27",
    geeksforgeeks: "https://auth.geeksforgeeks.org/user/yuvrajkarna27",
    github:        "https://github.com/yuvrajkarna2717",
    githubRepos:   "https://github.com/yuvrajkarna2717?tab=repositories",
    contact:       "mailto:yuvrajkarna.code@gmail.com",
    resume:        "/resume/YuvrajKarna.pdf",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-black dark:text-white">
      {/* ── Scroll progress bar ──────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-white/10 z-50">
        <div
          className="h-full bg-black dark:bg-white transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Fixed controls ───────────────────────────────────────────────── */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-white dark:bg-white/10 backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40 transition-all shadow-sm"
        >
          <FaBackward className="w-3.5 h-3.5" />
          Back
        </button>
      </div>
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2.5 bg-white dark:bg-white/10 backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40 transition-all shadow-sm"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <p className="text-sm font-mono text-gray-400 dark:text-gray-500 tracking-widest uppercase">
            My coding odyssey
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
            From <em className="not-italic text-gray-400 dark:text-gray-500">Hello World</em>
            <br />to Here
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg mx-auto">
            A personal account of late nights, stubborn bugs, and the quiet satisfaction
            of shipping something real. Told honestly, without polish.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <a
              href="#chapter-1"
              className="px-7 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:scale-105 transition-transform"
            >
              Start reading
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full text-sm font-semibold border border-gray-200 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40 transition-all flex items-center gap-2"
            >
              <FaGithub className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* Teaser stats row */}
          <div className="flex items-center justify-center gap-8 pt-8 text-center">
            <div>
              <p className="text-2xl font-bold font-mono"><Num value={lc.total} />+</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">problems solved</p>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />
            <div>
              <p className="text-2xl font-bold font-mono"><Num value={gh.repos} />+</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">repos shipped</p>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />
            <div>
              <p className="text-2xl font-bold font-mono"><Num value={gh.followers} />+</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">GitHub followers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTERS ─────────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 pb-32 space-y-0">

        {/* ── Chapter 1: The Spark ─────────────────────────────────────── */}
        <section id="chapter-1" className="pt-8">
          <p className="text-xs font-mono text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-3">
            Chapter 01
          </p>
          <h2 className="text-3xl sm:text-4xl font-black mb-8 leading-tight">
            The Spark
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            There's a version of this story that starts with a dramatic midnight epiphany.
            Mine was less cinematic. I was watching a tutorial, typed <code className="text-sm bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">console.log("Hello")</code>,
            and something changed. Not in the code — in me. I felt the machine do exactly
            what I told it to. No ambiguity, no negotiation. Just logic.
          </p>

          <blockquote className="border-l-4 border-black dark:border-white pl-5 my-8 text-xl font-light italic text-gray-700 dark:text-gray-300 leading-relaxed">
            "That feeling of making something out of nothing — I've been chasing it ever since."
          </blockquote>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            I spent the next weeks taking apart websites in DevTools. Every time I changed a
            style or removed an element, a little dopamine hit. I wasn't building anything useful.
            I was just exploring. But that curiosity — unstructured and obsessive — laid the
            foundation for everything that followed.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            HTML turned into CSS turned into JavaScript turned into "okay, what else is there?"
            The answer, it turned out, was everything.
          </p>
        </section>

        <Divider />

        {/* ── Chapter 2: The Grind ─────────────────────────────────────── */}
        <section id="chapter-2">
          <p className="text-xs font-mono text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-3">
            Chapter 02
          </p>
          <h2 className="text-3xl sm:text-4xl font-black mb-8 leading-tight">
            The Grind
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            I opened LeetCode for the first time expecting it to be like the tutorials — a walkthrough
            with a happy ending. Problem #1: Two Sum. Easy difficulty. I sat with it for forty minutes.
            Eventually I got it. Then I tried something medium, and I didn't get it for two days.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            That was the beginning of a long, slow rewiring of how my brain works. Two pointers.
            Sliding windows. Recursion. Dynamic programming — which felt like dark magic until,
            one afternoon, it didn't. Patterns started appearing where there were only problems before.
          </p>

          {/* LeetCode stats callout */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <SiLeetcode className="w-5 h-5 text-orange-500" />
              <span className="font-semibold text-sm">LeetCode</span>
              {lcLive && <LiveBadge />}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { label: "Total solved", value: lc.total, suffix: "+" },
                { label: "Easy",         value: lc.easy,  suffix: "+" },
                { label: "Medium",       value: lc.medium, suffix: "+" },
                { label: "Hard",         value: lc.hard,  suffix: "+" },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-2xl font-bold font-mono">
                    <Num value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-gray-200 dark:border-white/10">
              <a
                href={links.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:underline text-gray-500 dark:text-gray-400"
              >
                View LeetCode profile <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <blockquote className="border-l-4 border-black dark:border-white pl-5 my-8 text-xl font-light italic text-gray-700 dark:text-gray-300 leading-relaxed">
            "Every failed submission was a question I hadn't asked myself yet."
          </blockquote>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I failed a lot. I still do. But I learned to sit with the discomfort of not knowing
            instead of immediately Googling the answer. That patience — or stubbornness, depending
            on who you ask — is probably the most useful skill I've built.
          </p>
        </section>

        <Divider />

        {/* ── Chapter 3: The Foundation ────────────────────────────────── */}
        <section id="chapter-3">
          <p className="text-xs font-mono text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-3">
            Chapter 03
          </p>
          <h2 className="text-3xl sm:text-4xl font-black mb-8 leading-tight">
            The Foundation
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Solving problems is one thing. Understanding <em>why</em> the solution works is another.
            GeeksforGeeks became my off-campus university. Trees, graphs, heaps, hashing — reading the
            theory behind the patterns I was learning on LeetCode made everything click differently.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Computer science has history. Algorithms have inventors. There's a reason quicksort is
            taught in every first-year course and it's not arbitrary. Learning <em>that</em>
            history made me care about the craft in a different way — not just "does it pass?" but
            "is this the right approach?"
          </p>

          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <SiGeeksforgeeks className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-sm">GeeksforGeeks</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Data structures, algorithms, OS, DBMS, system design — built the CS fundamentals
              that I still reach for in every technical conversation.
            </p>
            <div className="mt-4">
              <a
                href={links.geeksforgeeks}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:underline text-gray-500 dark:text-gray-400"
              >
                View GFG profile <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Theory without practice becomes trivia fast. But practice without theory becomes
            brittle. The combination — solving problems while understanding the science
            underneath — is what I kept coming back to.
          </p>
        </section>

        <Divider />

        {/* ── Chapter 4: The Builder ───────────────────────────────────── */}
        <section id="chapter-4">
          <p className="text-xs font-mono text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-3">
            Chapter 04
          </p>
          <h2 className="text-3xl sm:text-4xl font-black mb-8 leading-tight">
            The Builder
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            At some point, problem-solving in isolation stopped being enough. I needed to make
            things. Real things. Things other people could use. GitHub went from a place I'd heard
            about to the place where ideas went to become software.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            My first few repos were embarrassing. Copy-pasted tutorials with minor modifications.
            But then I built something that actually worked — a project I was proud enough to show
            people. The commit history tells the story of someone figuring it out in public,
            one push at a time.
          </p>

          {/* GitHub stats callout */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <FaGithub className="w-5 h-5" />
              <span className="font-semibold text-sm">GitHub</span>
              {ghLive && <LiveBadge />}
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Public repos",   value: gh.repos },
                { label: "Total stars",    value: gh.stars },
                { label: "Followers",      value: gh.followers },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-2xl font-bold font-mono"><Num value={s.value} /></p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-gray-200 dark:border-white/10 flex flex-wrap gap-4">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:underline text-gray-500 dark:text-gray-400"
              >
                View profile <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={links.githubRepos}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:underline text-gray-500 dark:text-gray-400"
              >
                Browse repos <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <blockquote className="border-l-4 border-black dark:border-white pl-5 my-8 text-xl font-light italic text-gray-700 dark:text-gray-300 leading-relaxed">
            "Open source taught me that code is a conversation, not a monologue."
          </blockquote>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Someone opened an issue on one of my libraries from a company I'd never heard of.
            They were using it in production. That message shifted something. I started writing
            code like it mattered — because someone, somewhere, might actually read it.
          </p>
        </section>

        <Divider />

        {/* ── Chapter 5: What's Next ───────────────────────────────────── */}
        <section id="chapter-5">
          <p className="text-xs font-mono text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-3">
            Chapter 05
          </p>
          <h2 className="text-3xl sm:text-4xl font-black mb-8 leading-tight">
            Still Writing
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            This story doesn't have an ending because it isn't finished. Every skill I've
            built has revealed five more I don't have yet. Every project I've shipped has
            generated ideas for the next one. The horizon keeps moving, and I've made peace
            with that.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            The developer I am today would genuinely impress the person who first typed
            that <code className="text-sm bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">console.log</code>.
            But I'm still that same person — curious, stubborn, and convinced that the next
            thing I build will be the most interesting thing I've ever made.
          </p>

          <blockquote className="border-l-4 border-black dark:border-white pl-5 my-8 text-xl font-light italic text-gray-700 dark:text-gray-300 leading-relaxed">
            "I'm still asking 'how does this work?' — just with better tools to find out."
          </blockquote>
        </section>

        <Divider />

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <section id="contact" className="py-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Let's build something together.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
            Whether you're hiring, collaborating, or just want to talk about an interesting
            problem — my inbox is open.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <a
              href={links.contact}
              className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:scale-105 transition-transform text-sm"
            >
              Say hello
            </a>
            <a
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full font-semibold border border-gray-200 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40 transition-all text-sm"
            >
              Read my résumé
            </a>
          </div>
        </section>

      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 dark:border-white/10 py-10 px-6 text-center">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Built with curiosity, powered by caffeine.
          <span className="ml-2 font-mono text-xs">// story still in progress</span>
        </p>
      </div>
    </div>
  );
}
