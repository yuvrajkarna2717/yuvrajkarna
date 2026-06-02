import { FcLike } from "react-icons/fc";
import { SiHappycow } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="md:px-6 md:pt-8 pt-6 text-center text-black dark:text-white md:pb-6 pb-6">
      <div className="flex flex-row items-center justify-center gap-2 text-xl sm:text-2xl">
        <p className="flex items-center gap-2">
          Crafted with <FcLike className="w-5 h-5" /> and passion by
        </p>
        <a
          href="https://www.linkedin.com/in/yuvrajkarna"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
        >
          Yuvraj
        </a>
        <SiHappycow className="w-6 h-6 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 group-hover:translate-x-2 group-hover:-translate-y-2" />
      </div>
      <div className="mt-3 flex items-center justify-center gap-4 text-sm text-gray-400 dark:text-gray-500">
        <Link to="/uses" className="hover:text-black dark:hover:text-white transition">
          Uses
        </Link>
        <span>·</span>
        <a
          href="https://github.com/yuvrajkarna2717"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white transition"
        >
          GitHub
        </a>
        <span>·</span>
        <a
          href="mailto:yuvrajkarna.code@gmail.com"
          className="hover:text-black dark:hover:text-white transition"
        >
          Email
        </a>
      </div>
      <p className="mt-2 text-xs text-gray-300 dark:text-gray-600">
        Press <kbd className="border border-gray-300 dark:border-gray-600 rounded px-1">Ctrl+K</kbd> for command palette ·{" "}
        <kbd className="border border-gray-300 dark:border-gray-600 rounded px-1">`</kbd> for terminal
      </p>
    </footer>
  );
}

