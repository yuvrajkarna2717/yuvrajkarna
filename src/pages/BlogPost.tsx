import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/useTheme";
import { getBlogBySlug } from "../lib/blogUtils";
import "highlight.js/styles/github.css";

// We conditionally import the dark theme via CSS custom properties instead
// of swapping stylesheet imports (avoids flash on theme change).

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { theme, toggleTheme } = useTheme();

  const post = slug ? getBlogBySlug(slug) : undefined;

  // Scroll to top on mount / slug change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  // External posts should never be rendered here – redirect out
  if (post.external && post.externalUrl) {
    window.location.href = post.externalUrl;
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-black dark:text-white">
      {/* Top bar */}
      <div className="w-full md:px-[10rem] px-6 py-8 flex items-center justify-between">
        <Link
          to="/blog"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
        >
          ← All posts
        </Link>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-full border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Article */}
      <article className="max-w-2xl mx-auto px-6 pb-24">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">{post.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500 mb-10">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} read</span>
        </div>

        {/* Markdown content */}
        <div
          className={`prose max-w-none
            prose-sm md:prose-base
            prose-headings:font-semibold
            prose-headings:text-black dark:prose-headings:text-white
            prose-p:text-gray-700 dark:prose-p:text-gray-300
            prose-a:text-black dark:prose-a:text-white prose-a:underline prose-a:underline-offset-2
            prose-strong:text-black dark:prose-strong:text-white
            prose-blockquote:border-l-gray-300 dark:prose-blockquote:border-l-gray-600
            prose-blockquote:text-gray-500 dark:prose-blockquote:text-gray-400
            prose-code:text-black dark:prose-code:text-white
            prose-pre:bg-gray-100 dark:prose-pre:bg-white/5
            prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-white/10
            prose-pre:rounded-xl
            prose-table:text-sm
            prose-th:text-black dark:prose-th:text-white
            prose-td:text-gray-600 dark:prose-td:text-gray-300
            prose-hr:border-gray-200 dark:prose-hr:border-white/10
            ${theme === "dark" ? "prose-invert" : ""}
          `}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10">
          <Link
            to="/blog"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
          >
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
