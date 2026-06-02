import AnimationTitle from "./AnimationTitle";

interface BlogPost {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  summary: string;
  url: string;
}

// ─── Add / update your real blog post URLs here ──────────────────────────────
const posts: BlogPost[] = [
  {
    title: "How I Reduced Bundle Size by 40% Using Dynamic Imports",
    date: "Apr 2025",
    readTime: "5 min",
    tags: ["React", "Performance", "Webpack"],
    summary:
      "A deep dive into code-splitting strategies that cut our news platform's initial bundle from 2.4 MB to 1.4 MB.",
    url: "https://dev.to/yuvrajkarna",
  },
  {
    title: "WebRTC from Scratch: Building Video Recording in the Browser",
    date: "Mar 2025",
    readTime: "8 min",
    tags: ["WebRTC", "JavaScript", "Media"],
    summary:
      "Everything I learned building a WebRTC recorder — device selection, MediaRecorder API, and the browser quirks nobody warns you about.",
    url: "https://dev.to/yuvrajkarna",
  },
  {
    title: "Why I Wrote My Own React Hooks Library",
    date: "Jan 2025",
    readTime: "4 min",
    tags: ["React", "Open Source", "npm"],
    summary:
      "The story behind react-utility-hooks — what drove me to publish my first npm package and what I learned shipping open source.",
    url: "https://dev.to/yuvrajkarna",
  },
  {
    title: "Redis + Socket.io: Real-Time at Scale",
    date: "Dec 2024",
    readTime: "6 min",
    tags: ["Redis", "Socket.io", "Node.js"],
    summary:
      "How we used Redis Pub/Sub to synchronise WebSocket events across multiple Node.js instances in the Dhanvv healthcare platform.",
    url: "https://dev.to/yuvrajkarna",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Blog() {
  return (
    <section id="blog" className="py-20 px-6 md:px-[10rem] bg-white dark:bg-dark-bg">
      <AnimationTitle title="Blog" />
      <p className="text-gray-500 dark:text-gray-400 mt-4 mb-10 text-center max-w-xl mx-auto">
        Writing about things I've built, broken, and learned.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {posts.map(post => (
          <a
            key={post.title}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-base font-semibold leading-snug group-hover:underline mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              {post.summary}
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime} read</span>
              <span className="ml-auto text-black dark:text-white group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
