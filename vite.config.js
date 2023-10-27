import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(), react()],
  envPrefix: "REACT_APP_",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    outDir: "./build",
  },
});
