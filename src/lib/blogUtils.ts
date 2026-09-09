export interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  summary: string;
  /** If true, the blog card links to `externalUrl` instead of /blog/:slug */
  external: boolean;
  externalUrl?: string;
}

export interface BlogPost extends BlogMeta {
  content: string;
}

// ---------------------------------------------------------------------------
// Simple frontmatter parser (no Node-only deps)
// ---------------------------------------------------------------------------
function parseFrontmatter(raw: string): {
  meta: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const yamlStr = match[1];
  const content = match[2];
  const meta: Record<string, unknown> = {};

  for (const line of yamlStr.split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const raw = line.slice(colonIdx + 1).trim();

    // inline array  e.g. tags: ["React", "Node.js"]
    if (raw.startsWith("[") && raw.endsWith("]")) {
      meta[key] = raw
        .slice(1, -1)
        .split(",")
        .map(s => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else if (raw === "true") {
      meta[key] = true;
    } else if (raw === "false") {
      meta[key] = false;
    } else {
      meta[key] = raw.replace(/^["']|["']$/g, "");
    }
  }

  return { meta, content };
}

// ---------------------------------------------------------------------------
// Load all blogs at build-time via Vite's import.meta.glob
// ---------------------------------------------------------------------------
const rawFiles = import.meta.glob("../content/blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

export const allBlogs: BlogPost[] = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const slug = slugFromPath(path);
    const { meta, content } = parseFrontmatter(raw);
    return {
      slug,
      title: (meta.title as string) ?? slug,
      date: (meta.date as string) ?? "",
      readTime: (meta.readTime as string) ?? "",
      tags: (meta.tags as string[]) ?? [],
      summary: (meta.summary as string) ?? "",
      external: (meta.external as boolean) ?? false,
      externalUrl: (meta.externalUrl as string) ?? "",
      content,
    };
  })
  .sort((a, b) => {
    // Sort by date descending. Falls back to 0 for unparseable/equal dates so
    // the sort is stable instead of arbitrarily flipping equal entries.
    const ta = new Date(a.date).getTime();
    const tb = new Date(b.date).getTime();
    const va = Number.isNaN(ta) ? 0 : ta;
    const vb = Number.isNaN(tb) ? 0 : tb;
    return vb - va;
  });

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return allBlogs.find(b => b.slug === slug);
}
