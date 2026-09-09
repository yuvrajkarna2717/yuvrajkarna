// Generates public/sitemap.xml from static routes + blog markdown files.
// Run as part of the build (see package.json "prebuild").
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const BLOG_DIR = join(root, "src", "content", "blogs");
const OUT = join(root, "public", "sitemap.xml");
const SITE_URL = "https://yuvrajkarna.pages.dev";

// Static routes with their priority/changefreq.
const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/blog", priority: "0.9", changefreq: "weekly" },
  { path: "/story", priority: "0.7", changefreq: "monthly" },
  { path: "/uses", priority: "0.6", changefreq: "monthly" },
];

function frontmatterFlag(raw, key) {
  const m = raw.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
}

async function collectBlogRoutes() {
  let files = [];
  try {
    files = await readdir(BLOG_DIR);
  } catch {
    return [];
  }

  const routes = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const raw = await readFile(join(BLOG_DIR, file), "utf8");
    // Skip external posts — they don't have a page on this site.
    if (frontmatterFlag(raw, "external") === "true") continue;
    const slug = file.replace(/\.md$/, "");
    routes.push({
      path: `/blog/${slug}`,
      priority: "0.7",
      changefreq: "monthly",
    });
  }
  return routes;
}

function urlEntry({ path, priority, changefreq }) {
  return `  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const routes = [...staticRoutes, ...(await collectBlogRoutes())];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(urlEntry).join("\n\n")}
</urlset>
`;

await writeFile(OUT, xml, "utf8");
console.log(`sitemap.xml generated with ${routes.length} URLs`);
