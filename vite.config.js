import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react()],
  envPrefix: "REACT_APP_",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
