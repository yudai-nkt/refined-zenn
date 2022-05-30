import { promises as fs } from "node:fs";
import * as path from "node:path";
import preact from "@preact/preset-vite";
import { build, type InlineConfig, type Plugin } from "vite";

const watch = process.env.WATCH === "true" ? {} : undefined;
const baseConfig: InlineConfig = {
  configFile: false,
};
// In order to not delete manifest.json and content scripts when options UI is
// rebuilt, Vite needs to set output directory to `/dist/extension/options-ui`.
// However, manifest.json sets serving root to `/dist`, so the script element
// needs to be modified accordingly.
const replaceScriptURI = ({ prefix }: { prefix: string }): Plugin => ({
  name: "replace-script-uri",
  transformIndexHtml: {
    transform: (html) => html.replace(/src="(.*)"/, `src="${prefix}$1"`),
    enforce: "post",
  },
});

const contentScriptsConfig = (basename: string): InlineConfig => ({
  ...baseConfig,
  build: {
    lib: {
      entry: path.resolve("src/content-scripts", basename),
      name: basename.replace("-", "_"),
      formats: ["iife"],
      fileName: (fmt) => "index.js",
    },
    outDir: path.resolve(
      "dist/extension/content-scripts",
      basename.replace(/\.tsx?$/, "")
    ),
    watch,
  },
});

const optionsUIConfig: InlineConfig = {
  ...baseConfig,
  root: "src/options-ui",
  build: {
    rollupOptions: {
      input: { bundle: "src/options-ui/index.html" },
    },
    outDir: "../../dist/extension/options-ui",
    emptyOutDir: true,
    watch,
  },
  plugins: [preact(), replaceScriptURI({ prefix: "/extension/options-ui" })],
};

const contentScripts = await fs.readdir("src/content-scripts");

await Promise.all([
  ...contentScripts.map((script) => build(contentScriptsConfig(script))),
  build(optionsUIConfig),
]);
