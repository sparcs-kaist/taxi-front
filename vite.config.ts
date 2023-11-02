import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(), react({ jsxImportSource: "@emotion/react" })],
  envPrefix: "REACT_APP_",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    outDir: "./build",
  },
  server: {
    port: 3000,
  },
});
