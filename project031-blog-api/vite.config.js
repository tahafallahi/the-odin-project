import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "blog-ui",
  envDir: "../",
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
