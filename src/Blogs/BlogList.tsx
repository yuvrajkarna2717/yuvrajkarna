import { Link } from "react-router-dom";
import { Calendar, ArrowRight, FileText } from "lucide-react";

export interface Blog {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export const blogs: Blog[] = [
  {
    slug: "first-post",
    title: "My First Post",
    date: "2025-08-10",
    excerpt: "This is the introduction to my first post...",
  },
  {
    slug: "second-post",
    title: "My Second Post",
    date: "2025-08-11",
    excerpt: "Exploring deeper into my thoughts in this second post...",
  },
];

export default function BlogList() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="relative min-h-screen w-full bg-white text-white font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-black mb-4">
            Latest Articles
          </h1>
          <p className="text-gray-600 text-lg">
            Discover insights, tutorials, and thoughts
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <Link
              to={`/blogs/${post.slug}`}
              key={post?.slug}
              className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-gray-200"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                    <FileText className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>

                <h2 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(post.date)}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
                    Read more →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No articles published yet</p>
          </div>
        )}
      </div>
    </main>
  );
}
