import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import AnimationTitle from "./AnimationTitle";
import { allBlogs } from "../lib/blogUtils";

// Show the 4 most recent posts in the home section
const previewPosts = allBlogs.slice(0, 4);

export default function Blog() {
  return (
    <section id="blog" className="py-20 px-6 md:px-[10rem] bg-white dark:bg-dark-bg">
      <AnimationTitle title="Blog" />
      <p className="text-gray-500 dark:text-gray-400 mt-4 mb-10 text-center max-w-xl mx-auto">
        Writing about things I've built, broken, and learned.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {previewPosts.map(post => {
          const isExternal = post.external && post.externalUrl;

          const cardContent = (
            <div className="group block p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all duration-200 hover:-translate-y-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-base font-semibold leading-snug group-hover:underline mb-2 flex items-start gap-1">
                {post.title}
                {isExternal && (
                  <ArrowUpRight className="w-4 h-4 shrink-0 mt-0.5 text-gray-400 dark:text-gray-500" />
                )}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                {post.summary}
              </p>

              <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime} read</span>
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
