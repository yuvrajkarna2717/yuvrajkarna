import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import AnimationTitle from "../Home/AnimationTitle";
import { allBlogs } from "../lib/blogUtils";
import { usePageMeta } from "../lib/usePageMeta";

const ALL_TAGS = "All";

export default function BlogList() {
  const [activeTag, setActiveTag] = useState(ALL_TAGS);

  usePageMeta({
    title: "Blog",
    description:
      "Writing about things I've built, broken, and learned — web development, React, backend, and more.",
    path: "/blog",
  });

  // Collect unique tags across all posts
  const tags = [
    ALL_TAGS,
    ...Array.from(new Set(allBlogs.flatMap(b => b.tags))),
  ];

  const filtered =
    activeTag === ALL_TAGS
      ? allBlogs
      : allBlogs.filter(b => b.tags.includes(activeTag));

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-black dark:text-white">
      {/* Top bar */}
      <div className="w-full px-4 sm:px-6 md:px-12 py-6 sm:py-8 flex items-center justify-between">
        <Link
          to="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
        >
          ← Back home
        </Link>
        <ThemeToggle />
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-24">
        <AnimationTitle title="Blog" />
        <p className="text-gray-500 dark:text-gray-400 text-base mt-4 mb-10 text-center">
          Writing about things I've built, broken, and learned.
        </p>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`text-xs px-3 py-1 rounded-full border transition-all duration-150 ${
                activeTag === tag
                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                  : "border-gray-300 dark:border-white/20 text-gray-500 dark:text-gray-400 hover:border-gray-500 dark:hover:border-white/40"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Post list */}
        <div className="space-y-4">
          {filtered.map(post => {
            const isExternal = post.external && post.externalUrl;

            const cardContent = (
              <div className="group p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all duration-200 hover:-translate-y-0.5">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-base font-semibold leading-snug group-hover:underline mb-2 flex items-start gap-1">
                  {post.title}
                  {isExternal && (
                    <ArrowUpRight className="w-4 h-4 shrink-0 mt-0.5 text-gray-400 dark:text-gray-500" />
                  )}
                </h2>

                {/* Summary */}
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  {post.summary}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} read</span>
                  {isExternal && (
                    <>
                      <span>·</span>
                      <span className="text-gray-400 dark:text-gray-500">
                        External
                      </span>
                    </>
                  )}
                  <span className="ml-auto text-black dark:text-white group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </div>
              </div>
            );

            return isExternal ? (
              <a
                key={post.slug}
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {cardContent}
              </a>
            ) : (
              <Link key={post.slug} to={`/blog/${post.slug}`}>
                {cardContent}
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 dark:text-gray-500 mt-16 text-sm">
            No posts tagged "{activeTag}" yet.
          </p>
        )}
      </div>
    </div>
  );
}
