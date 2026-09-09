import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/useTheme";

interface Props {
  className?: string;
}

/**
 * Shared theme-toggle button used across the navbar and standalone pages.
 */
export default function ThemeToggle({ className = "" }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`p-2 rounded-full border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition-all ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
