import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
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
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        news: resolve(__dirname, "news.html"),
        concerts: resolve(__dirname, "concerts.html"),
        concert: resolve(__dirname, "concert.html"),
        access: resolve(__dirname, "access.html"),
        contact: resolve(__dirname, "contact.html"),
        availability: resolve(__dirname, "availability.html"),
      },
    },
  },
});
