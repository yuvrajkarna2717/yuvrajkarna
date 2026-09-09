import { useEffect } from "react";

const SITE_URL = "https://yuvrajkarna.pages.dev";
const DEFAULT_TITLE = "Yuvraj Karna | Software Engineer";
const DEFAULT_DESCRIPTION =
  "I'm Yuvraj Karna, a Software Engineer and Full Stack Developer specializing in building scalable modern web applications using JavaScript, React, Node.js, and Python.";
const DEFAULT_IMAGE = `${SITE_URL}/preview.png`;

interface PageMeta {
  title?: string;
  description?: string;
  /** Absolute or root-relative path for the canonical URL, e.g. "/blog". */
  path?: string;
  image?: string;
  /** "website" (default) or "article". */
  type?: "website" | "article";
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

/**
 * Imperatively syncs document title and SEO meta tags for the current route.
 * Lightweight alternative to react-helmet for a small CSR SPA.
 */
export function usePageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
}: PageMeta) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Yuvraj Karna` : DEFAULT_TITLE;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    setMetaTag("name", "title", fullTitle);
    setMetaTag("name", "description", description);

    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:url", url);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", image);

    setMetaTag("property", "twitter:url", url);
    setMetaTag("property", "twitter:title", fullTitle);
    setMetaTag("property", "twitter:description", description);
    setMetaTag("property", "twitter:image", image);

    setCanonical(url);
  }, [title, description, path, image, type]);
}
