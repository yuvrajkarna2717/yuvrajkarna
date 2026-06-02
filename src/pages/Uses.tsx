import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/useTheme";
import AnimationTitle from "../Home/AnimationTitle";

interface UseItem {
  name: string;
  description: string;
  url?: string;
}

interface UseCategory {
  category: string;
  emoji: string;
  items: UseItem[];
}

const usesData: UseCategory[] = [
  {
    category: "Editor",
    emoji: "✏️",
    items: [
      {
        name: "VS Code",
        description:
          "Primary editor. Lightweight, fast, and endlessly extensible.",
        url: "https://code.visualstudio.com",
      },
      {
        name: "Cursor",
        description: "AI-first editor for pair-programming with LLMs.",
        url: "https://cursor.sh",
      },
    ],
  },
  {
    category: "Terminal",
    emoji: "⬛",
    items: [
      {
        name: "Git Bash",
        description:
          "Default terminal on Windows for Unix-like commands.",
        url: "https://git-scm.com",
      },
      {
        name: "Windows Terminal",
        description: "Multi-tab, clean terminal experience on Windows.",
        url: "https://aka.ms/terminal",
      },
    ],
  },
  {
    category: "Browser",
    emoji: "🌐",
    items: [
      {
        name: "Chrome",
        description: "Primary browser. DevTools are unmatched.",
        url: "https://www.google.com/chrome",
      },
      {
        name: "Arc",
        description: "Secondary browser for cleaner research sessions.",
        url: "https://arc.net",
      },
    ],
  },
  {
    category: "VS Code Extensions",
    emoji: "🧩",
    items: [
      {
        name: "GitHub Copilot",
        description: "AI code completion that actually understands context.",
        url: "https://github.com/features/copilot",
      },
      {
        name: "Prettier",
        description: "Auto-format on save. No more debating style.",
        url: "https://prettier.io",
      },
      {
        name: "ESLint",
        description: "Catch bugs and bad patterns before they ship.",
        url: "https://eslint.org",
      },
      {
        name: "Tailwind CSS IntelliSense",
        description: "Autocomplete for Tailwind classes.",
        url: "https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss",
      },
      {
        name: "Thunder Client",
        description: "Lightweight REST client right inside VS Code.",
        url: "https://www.thunderclient.com",
      },
      {
        name: "GitLens",
        description: "Git history, blame, and comparisons inline.",
        url: "https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens",
      },
    ],
  },
  {
    category: "Design & Productivity",
    emoji: "🎨",
    items: [
      {
        name: "Figma",
        description: "UI design, wireframing, and prototyping.",
        url: "https://figma.com",
      },
      {
        name: "Notion",
        description: "Notes, tasks, and project planning all in one.",
        url: "https://notion.so",
      },
    ],
  },
  {
    category: "Hardware",
    emoji: "💻",
    items: [
      {
        name: "Dell Laptop",
        description: "Daily driver for all development work.",
      },
      {
        name: "External Monitor",
        description:
          "Extra screen real estate for multi-window dev workflows.",
      },
    ],
  },
];

export default function Uses() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-black dark:text-white">
      {/* Top bar */}
      <div className="w-full md:px-[10rem] px-6 py-8 flex items-center justify-between">
        <Link
          to="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
        >
          ← Back home
        </Link>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-full border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20">
        <AnimationTitle title="Uses" />
        <p className="text-gray-500 dark:text-gray-400 text-lg mt-6 mb-12 text-center">
          The tools, software, and hardware I use day-to-day. Updated regularly.
        </p>

        <div className="space-y-12">
          {usesData.map(cat => (
            <section key={cat.category}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>{cat.emoji}</span>
                <span>{cat.category}</span>
              </h2>
              <div className="space-y-3">
                {cat.items.map(item => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-xs text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition underline mt-1"
                      >
                        Visit ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
