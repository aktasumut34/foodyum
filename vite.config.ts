import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
export default defineConfig({
  plugins: [vue(), svgLoader()],
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "Foodyum",
      fileName: (format) => `foodyum.${format}.js`,
    },
  },
});
