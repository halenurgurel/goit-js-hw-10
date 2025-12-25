import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        timer: resolve(__dirname, "01-timer.html"),
        snackbar: resolve(__dirname, "02-snackbar.html"),
      },
    },
  },
});
