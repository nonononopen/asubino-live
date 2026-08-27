import { defineConfig } from "vite";

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
});
