import AnimationTitle from "./AnimationTitle";

interface Milestone {
  year: string;
  title: string;
  description: string;
  emoji: string;
  highlight?: string;
}

const milestones: Milestone[] = [
  {
    year: "2021",
    title: "The Spark",
    emoji: "💡",
    description:
      'Wrote my first "Hello, World!" — and got completely hooked. Started learning HTML, CSS, and JavaScript from scratch.',
    highlight: "First line of code",
  },
  {
    year: "2022",
    title: "The Grind",
    emoji: "⛰️",
    description:
      "Committed to DSA and competitive programming. Ground through hundreds of LeetCode problems, building algorithmic thinking from the ground up.",
    highlight: "500+ problems solved",
  },
  {
    year: "2023",
    title: "The Deep Dive",
    emoji: "🧠",
    description:
      "Dove into CS fundamentals — OS, databases, computer networks, system design. Started building real projects and contributing to open source on GitHub.",
    highlight: "1000+ GitHub contributions",
  },
  {
    year: "2024",
    title: "The Builder",
    emoji: "🔨",
    description:
      "Joined Iquadra Information Services as a Software Engineer Intern. Shipped production features on iQua.ai, an AI-powered interview platform serving 10K+ users.",
    highlight: "First professional role",
  },
  {
    year: "2025",
    title: "The Journey Continues",
    emoji: "🚀",
    description:
      "Transitioned to full-time engineer. Currently building PNN (a news platform with WebRTC) and Dhanvv (a healthcare platform with real-time WebSocket architecture).",
    highlight: "Full-time engineer",
  },
];

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="py-20 px-6 md:px-[10rem] bg-gray-50 dark:bg-dark-bg"
    >
      <AnimationTitle title="Timeline" />
      <p className="text-gray-500 dark:text-gray-400 mt-4 mb-14 text-center max-w-xl mx-auto">
        The path from curious beginner to professional engineer — one year at a
        time.
      </p>

      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10" />

        <div className="space-y-10">
          {milestones.map(m => (
            <div key={m.year} className="relative flex gap-6">
              {/* Dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-dark-bg border-2 border-gray-300 dark:border-white/20 flex items-center justify-center shadow-sm">
                  <span className="text-xl">{m.emoji}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-3 pb-2">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded">
                    {m.year}
                  </span>
                  {m.highlight && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium">
                      {m.highlight}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-1">
                  {m.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
