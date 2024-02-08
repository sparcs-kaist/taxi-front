import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "../..", "REACT_APP_");
  return {
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
          target: env.REACT_APP_BACK_URL ?? "http://localhost:9000",
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/socket.io": {
          target: env.REACT_APP_IO_URL ?? "http://localhost:9000",
          ws: true,
        },
      },
    },
  };
});
