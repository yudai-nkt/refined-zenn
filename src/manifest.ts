import { defineManifest } from "@crxjs/vite-plugin";

export const manifest = defineManifest({
  manifest_version: 3,
  name: "Refined Zenn",
  description: "Zennの機能やUIの一部を変更するChrome拡張機能です．",
  version: "0.1.0",
  content_scripts: [
    {
      matches: ["https://zenn.dev/*"],
      js: ["src/content-scripts/sticky-header.ts"],
    },
    {
      matches: ["https://zenn.dev/*/articles/*"],
      js: [
        "src/content-scripts/footnote-tooltip.ts",
        "src/content-scripts/trim-leading-prompts-in-clipboard.ts",
      ],
    },
  ],
  options_ui: {
    page: "src/options-ui/index.html",
  },
  permissions: ["clipboardWrite", "storage"],
});
