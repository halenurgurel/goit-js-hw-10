import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/goit-js-hw-10/",
  build: {
    rollupOptions: {
      input: {
        main: resolve("./index.html"),
        timer: resolve("./01-timer.html"),
        snackbar: resolve("./02-snackbar.html"),
      },
    },
  },
});
