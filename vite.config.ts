import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site → served from https://<user>.github.io/EBench-home/
// Override with BASE_PATH env (e.g. "/" for a custom domain) at build time.
const base = process.env.BASE_PATH ?? "/EBench-home/";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1200,
  },
});
