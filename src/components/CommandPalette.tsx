import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  action: () => void;
}

const allCommands: CommandItem[] = [
  {
    id: "top",
    label: "Go to Top",
    icon: "🏠",
    description: "Scroll to the top of the page",
    action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  },
  {
    id: "about",
    label: "About Me",
    icon: "👤",
    description: "Jump to the about section",
    action: () =>
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "skills",
    label: "Skills",
    icon: "🛠",
    description: "Tech skills & tools",
    action: () =>
      document
        .getElementById("skills")
        ?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "stats",
    label: "Stats",
    icon: "📊",
    description: "GitHub & LeetCode numbers",
    action: () =>
      document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "timeline",
    label: "Timeline",
    icon: "📅",
    description: "Career timeline year by year",
    action: () =>
      document
        .getElementById("timeline")
        ?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "experience",
    label: "Experience",
    icon: "💼",
    description: "Professional work history",
    action: () =>
      document
        .getElementById("experience")
        ?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "projects",
    label: "Projects",
    icon: "🚀",
    description: "Portfolio projects",
    action: () =>
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "opensource",
    label: "Open Source",
    icon: "🔓",
    description: "Open source contributions",
    action: () =>
      document
        .getElementById("opensource")
        ?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "education",
    label: "Education",
    icon: "🎓",
    description: "Academic background",
    action: () =>
      document
        .getElementById("education")
        ?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: "🏆",
    description: "Professional certifications",
    action: () =>
      document
        .getElementById("certifications")
        ?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "now",
    label: "What I'm doing now",
    icon: "⚡",
    description: "Current projects & learning",
    action: () =>
      document.getElementById("now")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "blog",
    label: "Blog",
    icon: "📝",
    description: "Articles & writing",
    action: () =>
      document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "story",
    label: "My Story",
    icon: "📖",
    description: "The full journey",
    action: () => {
      window.location.href = "/story";
    },
  },
  {
    id: "uses",
    label: "Uses / Setup",
    icon: "⚙️",
    description: "Tools and hardware I use",
    action: () => {
      window.location.href = "/uses";
    },
  },
  {
    id: "github",
    label: "GitHub",
    icon: "🐙",
    description: "github.com/yuvrajkarna2717",
    action: () => window.open("https://github.com/yuvrajkarna2717", "_blank"),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "💼",
    description: "Connect professionally",
    action: () =>
      window.open("https://linkedin.com/in/yuvrajkarna", "_blank"),
  },
  {
    id: "resume",
    label: "View Resume",
    icon: "📄",
    description: "Open PDF resume",
    action: () => window.open("/resume/YuvrajKarna.pdf", "_blank"),
  },
  {
    id: "email",
    label: "Email Me",
    icon: "📧",
    description: "yuvrajkarna.code@gmail.com",
    action: () => {
      window.location.href = "mailto:yuvrajkarna.code@gmail.com";
    },
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? allCommands.filter(
        c =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
    : allCommands;

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown")
        setSelected(s => Math.min(s + 1, filtered.length - 1));
      if (e.key === "ArrowUp") setSelected(s => Math.max(s - 1, 0));
      if (e.key === "Enter" && filtered[selected]) {
        filtered[selected].action();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, filtered, selected, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[18vh] bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl mx-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-white/10">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search sections, links..."
            className="flex-1 bg-transparent text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none"
          />
          <kbd className="hidden sm:block text-xs text-gray-400 dark:text-gray-500 border border-gray-300 dark:border-white/20 rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>

        {/* Results */}
        <ul className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
              No results for &ldquo;{query}&rdquo;
            </li>
          ) : (
            filtered.map((cmd, i) => (
              <li key={cmd.id}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === selected
                      ? "bg-gray-100 dark:bg-white/10"
                      : "hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                >
                  <span className="text-base flex-shrink-0">{cmd.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-black dark:text-white">
                      {cmd.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {cmd.description}
                    </p>
                  </div>
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Footer hints */}
        <div className="px-4 py-2 border-t border-gray-200 dark:border-white/10 flex gap-4 text-xs text-gray-400 dark:text-gray-500">
          <span>
            <kbd className="border border-gray-300 dark:border-white/20 rounded px-1">
              ↑↓
            </kbd>{" "}
            navigate
          </span>
          <span>
            <kbd className="border border-gray-300 dark:border-white/20 rounded px-1">
              ↵
            </kbd>{" "}
            select
          </span>
          <span>
            <kbd className="border border-gray-300 dark:border-white/20 rounded px-1">
              esc
            </kbd>{" "}
            close
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
