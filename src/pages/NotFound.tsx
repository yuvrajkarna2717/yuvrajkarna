import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/useTheme";

export default function NotFound() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-black dark:text-white flex flex-col">
      {/* Top bar */}
      <div className="flex justify-end p-6">
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

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-lg w-full">
          {/* Terminal window */}
          <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-200 dark:bg-white/10 border-b border-gray-300 dark:border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                bash — 404
              </span>
            </div>
            <div className="p-6 space-y-2 text-sm leading-relaxed">
              <p>
                <span className="text-green-600 dark:text-green-400">
                  yuvraj@portfolio
                </span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-500">~</span>
                <span className="text-gray-400">$ </span>
                <span>navigate /this-page</span>
              </p>
              <p className="text-red-500">
                bash: /this-page: No such file or directory
              </p>
              <p className="text-gray-400 dark:text-gray-500">
                # Looks like you got lost in the code.
              </p>
              <p className="text-gray-400 dark:text-gray-500">
                # Try heading back to safety.
              </p>
              <p className="mt-4">
                <span className="text-green-600 dark:text-green-400">
                  yuvraj@portfolio
                </span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-500">~</span>
                <span className="text-gray-400">$ </span>
                <span className="animate-pulse">▋</span>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-6xl font-bold mb-2">404</p>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              This page doesn't exist.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition font-sans text-sm"
            >
              ← Go Home
            </Link>
            <Link
              to="/story"
              className="px-6 py-2 border border-gray-300 dark:border-white/20 text-black dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition font-sans text-sm"
            >
              My Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
