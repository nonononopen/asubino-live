import { defineConfig } from "vite";
import { resolve } from "path";

const htmlPages = [
  "index",
  "news",
  "concerts",
  "concert",
  "access",
  "contact",
  "availability",
];

function rewriteToHtmlFolder() {
  return (req, _res, next) => {
    const [pathname, search] = (req.url || "/").split("?");
    const query = search ? `?${search}` : "";
    if (pathname === "/" || pathname === "/index.html") {
      req.url = `/html/index.html${query}`;
    } else {
      const match = pathname.match(/^\/([a-z0-9-]+\.html)$/i);
      if (match) {
        req.url = `/html/${match[1]}${query}`;
      }
    }
    next();
  };
}

export default defineConfig({
  appType: "mpa",
  publicDir: false,
  server: {
    host: "0.0.0.0",
    port: 43141,
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 43141,
  },
  plugins: [
    {
      name: "serve-html-folder-as-root",
      configureServer(server) {
        server.middlewares.use(rewriteToHtmlFolder());
      },
      configurePreviewServer(server) {
        server.middlewares.use(rewriteToHtmlFolder());
      },
    },
  ],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        htmlPages.map((name) => [name, resolve(__dirname, `html/${name}.html`)])
      ),
    },
  },
});
