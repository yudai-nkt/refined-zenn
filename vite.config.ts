import { defineConfig, type Plugin } from "vite";
import preact from "@preact/preset-vite";

// In order to not delete manifest.json and assets built by ESbuild,
// Vite needs to set output directory to `/dist/vite`.
// However, manifest.json sets serving root to `/dist`, so the script element
// needs to be modified accordingly.
const replaceScriptURI: Plugin = {
  name: "replace-script-uri",
  transformIndexHtml: {
    transform: (html) => html.replace(/src="(.*)"/, 'src="/vite$1"'),
    enforce: "post",
  },
};

export default defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: { "options-ui": "./src/options-ui/index.html" },
    },
    outDir: "../dist/vite",
    emptyOutDir: true,
  },
  plugins: [preact(), replaceScriptURI],
});
