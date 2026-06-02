import AnimationTitle from "./AnimationTitle";

// ─── Update these to reflect what you're currently doing ─────────────────────
const items = [
  {
    emoji: "🔨",
    label: "Building",
    primary: "PNN — a full-featured news platform",
    secondary: "React · Redux Toolkit · TailwindCSS · WebRTC",
  },
  {
    emoji: "📖",
    label: "Learning",
    primary: "Distributed systems & system design",
    secondary: "Designing Data-Intensive Applications · ByteByteGo",
  },
  {
    emoji: "📚",
    label: "Reading",
    primary: "The Pragmatic Programmer",
    secondary: "by Andrew Hunt and David Thomas",
  },
  {
    emoji: "🎧",
    label: "Listening to",
    primary: "Syntax.fm",
    secondary: "Weekly podcast on modern web development",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function NowSection() {
  return (
    <section
      id="now"
      className="py-20 px-6 md:px-[10rem] bg-gray-50 dark:bg-dark-bg"
    >
      <AnimationTitle title="Now" />
      <p className="text-gray-500 dark:text-gray-400 mt-4 mb-10 text-center max-w-xl mx-auto">
        A snapshot of what I'm currently up to — updated regularly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {items.map(item => (
          <div
            key={item.label}
            className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all"
          >
            <span className="text-2xl mt-0.5">{item.emoji}</span>
            <div>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className="font-semibold text-black dark:text-white text-sm leading-snug">
                {item.primary}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {item.secondary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
