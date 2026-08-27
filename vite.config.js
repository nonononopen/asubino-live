import { defineConfig } from "vite";

const removedPages = new Set([
  "/news.html",
  "/contact.html",
  "/concerts.html",
  "/concert.html",
  "/access.html",
  "/availability.html",
]);

function rejectRemovedHtml() {
  return (req, res, next) => {
    const path = (req.url || "").split("?")[0];
    if (removedPages.has(path)) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Not Found");
      return;
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
      name: "reject-removed-html",
      configureServer(server) {
        server.middlewares.use(rejectRemovedHtml());
      },
      configurePreviewServer(server) {
        server.middlewares.use(rejectRemovedHtml());
      },
    },
  ],
});
