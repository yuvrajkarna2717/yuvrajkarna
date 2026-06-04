import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  assetsInclude: ["**/*.md"],
  build: {
    // Target modern browsers — smaller, faster output
    target: "esnext",
    // Split CSS per chunk for better cache granularity
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Markdown renderer + syntax highlighting — only loaded on /blog/:slug
          if (
            /react-markdown|remark|rehype|highlight\.js|micromark|mdast|unist|vfile|hast/.test(
              id
            )
          ) {
            return "vendor-markdown";
          }
          // Icon libraries — shared chunk, cached independently
          if (/react-icons|lucide-react/.test(id)) {
            return "vendor-icons";
          }
          // React core — most stable, longest cache life
          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/react-router")
          ) {
            return "vendor-react";
          }
        },
      },
    },
  },
});
