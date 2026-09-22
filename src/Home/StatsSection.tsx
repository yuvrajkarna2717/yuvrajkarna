import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import AnimationTitle from "./AnimationTitle";
import { apiUrl } from "../lib/api";

interface GitHubData {
  repos: number;
  followers: number;
  stars: number;
}

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || target === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, nodeRef };
}

function StatCard({
  label,
  value,
  suffix = "",
  description,
}: {
  label: string;
  value: number | null;
  suffix?: string;
  description?: string;
}) {
  const { count, nodeRef } = useCountUp(value ?? 0);
  return (
    <div
      ref={nodeRef}
      className="text-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all"
    >
      <p className="text-4xl font-bold text-black dark:text-white mb-1 font-mono tabular-nums">
        {value === null ? "—" : `${count.toLocaleString()}${suffix}`}
      </p>
      <p className="text-sm font-medium text-black dark:text-white">{label}</p>
      {description && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {description}
        </p>
      )}
    </div>
  );
}

interface LeetCodeData {
  total: number;
  easy: number;
  medium: number;
  hard: number;
}

const LEETCODE_CACHE_KEY = "lc_stats_cache_v2";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getCachedLeetCode(): LeetCodeData | null {
  try {
    const raw = localStorage.getItem(LEETCODE_CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw) as {
      data: LeetCodeData;
      timestamp: number;
    };
    if (Date.now() - timestamp > CACHE_TTL_MS) return null; // expired
    if (!data || data.total === 0) return null; // ignore bad/zeroed cache
    return data;
  } catch {
    return null;
  }
}

function setCachedLeetCode(data: LeetCodeData) {
  try {
    localStorage.setItem(
      LEETCODE_CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // storage quota exceeded — ignore
  }
}

async function fetchLeetCodeStats(): Promise<LeetCodeData> {
  const res = await fetch(apiUrl("/api/leetcode/yuvrajkarna"));
  if (!res.ok) throw new Error(`LeetCode API error ${res.status}`);
  const json = await res.json();
  const data: LeetCodeData = json.solved;

  // If the user wasn't matched (or the API returned nothing), all counts are 0.
  // Treat that as a failed fetch so we keep the fallback and don't cache zeros.
  if (data.total === 0) {
    throw new Error("LeetCode returned no data");
  }

  return data;
}

export default function StatsSection() {
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [githubLive, setGithubLive] = useState(false);
  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null);
  const [leetcodeLive, setLeetcodeLive] = useState(false);

  useEffect(() => {
    // ── LeetCode: read from cache first, fetch only if stale ──────────────
    const cached = getCachedLeetCode();
    if (cached) {
      setLeetcode(cached);
      setLeetcodeLive(true);
    } else {
      fetchLeetCodeStats()
        .then(data => {
          setCachedLeetCode(data);
          setLeetcode(data);
          setLeetcodeLive(true);
        })
        .catch(() => {
          // network/CORS error — keep fallback values, no live indicator
        });
    }

    // ── GitHub ────────────────────────────────────────────────────────────
    fetch(apiUrl("/api/github/yuvrajkarna2717"))
      .then(r => {
        if (!r.ok) throw new Error(`GitHub worker error ${r.status}`);
        return r.json();
      })
      .then(data => {
        const stats: GitHubData = {
          repos: data?.totals?.repos ?? 0,
          followers: data?.totals?.followers ?? 0,
          stars: data?.totals?.stars ?? 0,
        };
        // A zeroed-out response means the worker's GitHub call failed
        // (e.g. rate limit). Treat it as an error and show the fallback.
        if (
          !data ||
          (stats.repos === 0 && stats.followers === 0 && stats.stars === 0)
        ) {
          return;
        }
        setGithub(stats);
        setGithubLive(true);
      })
      .catch(() => {
        setGithub(null);
      });
  }, []);

  return (
    <section id="stats" className="py-20 px-4 sm:px-6 bg-white dark:bg-dark-bg">
      <AnimationTitle title="By the Numbers" />
      <p className="text-gray-500 dark:text-gray-400 mt-4 mb-12 text-center max-w-xl mx-auto">
        Metrics that tell the story better than words.
      </p>

      {/* GitHub */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-2 mb-4">
          <FaGithub className="w-5 h-5" />
          <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
            GitHub
          </h3>
          {githubLive && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
              live
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Public Repos"
            value={github?.repos ?? null}
            description="Open-source projects"
          />
          <StatCard
            label="GitHub Stars"
            value={github?.stars ?? null}
            description="Across all repos"
          />
          <StatCard
            label="Followers"
            value={github?.followers ?? null}
            description="On GitHub"
          />
        </div>
      </div>

      {/* LeetCode */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <SiLeetcode className="w-5 h-5" />
          <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
            LeetCode
          </h3>
          {leetcodeLive && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
              live
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            label="Total Solved"
            value={leetcode?.total ?? null}
            suffix="+"
            description="Problems solved"
          />
          <StatCard
            label="Easy"
            value={leetcode?.easy ?? null}
            suffix="+"
            description="Easy problems"
          />
          <StatCard
            label="Medium"
            value={leetcode?.medium ?? null}
            suffix="+"
            description="Medium problems"
          />
          <StatCard
            label="Hard"
            value={leetcode?.hard ?? null}
            suffix="+"
            description="Hard problems"
          />
        </div>
      </div>
    </section>
  );
}
