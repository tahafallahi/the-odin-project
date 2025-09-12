import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./src", // your source folder
  build: {
    outDir: "../dist-vite", // keep separate from webpack's dist
    rollupOptions: {
      input: {
        main: resolve(__dirname, "template.html"),
      },
    },
  },
});
