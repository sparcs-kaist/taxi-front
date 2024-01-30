import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(), react({ jsxImportSource: "@emotion/react" })],
  envDir: "../..",
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
    host: true,
    proxy: {
      "/api": {
        target: process.env.REACT_APP_BACK_URL ?? "http://localhost:9000",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/socket.io": {
        target: process.env.REACT_APP_IO_URL ?? "http://localhost:9000",
        ws: true,
      },
    },
  },
});
