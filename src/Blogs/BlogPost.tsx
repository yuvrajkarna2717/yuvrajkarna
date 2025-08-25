import { useParams } from "react-router-dom";

interface Frontmatter {
  title?: string;
  date?: string;
  excerpt?: string;
}

interface MdxModule {
  default: React.ComponentType;
  frontmatter?: Frontmatter;
}

const posts = import.meta.glob<MdxModule>("../posts/*.mdx", { eager: true });

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  console.log("Slug:", slug);
  console.log("Posts:", posts);

  if (!slug) return <h2>Invalid blog slug</h2>;

  const post = posts[`../posts/${slug}.mdx`];

  if (!post) return <h2>Post not found</h2>;

  const PostComponent = post.default;
  // return <PostComponent />;

  return (
    <main className="relative min-h-screen w-full bg-white text-gray-900 font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0 pointer-events-none px-8" />
      <div className="relative z-10  px-6 py-12">
        <PostComponent />
      </div>
      
    </main>
  );
}
