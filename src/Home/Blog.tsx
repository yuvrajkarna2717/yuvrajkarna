import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import AnimationTitle from "./AnimationTitle";
import { allBlogs } from "../lib/blogUtils";

// Show the 4 most recent posts in the home section
const previewPosts = allBlogs.slice(0, 4);

export default function Blog() {
  return (
    <section id="blog" className="py-20 px-4 sm:px-6 bg-white dark:bg-dark-bg">
      <AnimationTitle title="Blog" />
      <p className="text-gray-500 dark:text-gray-400 mt-4 mb-10 text-center max-w-xl mx-auto">
        Writing about things I've built, broken, and learned.
      </p>

      <div className="max-w-3xl mx-auto divide-y divide-gray-100 dark:divide-white/10">
        {previewPosts.map(post => {
          const isExternal = post.external && post.externalUrl;

          const rowContent = (
            <div className="flex items-center justify-between gap-4 py-3.5 group -mx-2 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <p className="flex-1 min-w-0 text-sm font-medium leading-snug flex items-center gap-1.5 group-hover:underline">
                <span className="truncate">{post.title}</span>
                {isExternal && (
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-gray-400 dark:text-gray-500" />
                )}
              </p>
              <div className="shrink-0 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                <div className="hidden sm:flex gap-1.5">
                  {post.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="whitespace-nowrap hidden md:inline">
                  {post.date}
                </span>
                <span className="whitespace-nowrap">{post.readTime}</span>
                <span className="text-black dark:text-white group-hover:translate-x-0.5 transition-transform duration-150">
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
              {rowContent}
            </a>
          ) : (
            <Link key={post.slug} to={`/blog/${post.slug}`}>
              {rowContent}
            </Link>
          );
        })}
      </div>

      {/* View all link */}
      <div className="flex justify-center mt-10">
        <Link
          to="/blog"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition underline underline-offset-4"
        >
          View all posts →
        </Link>
      </div>
    </section>
  );
}
