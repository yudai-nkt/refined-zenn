import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import { manifest } from "./src/manifest";

export default defineConfig({
  build: { target: ["chrome89"] },
  plugins: [react(), crx({ manifest })],
});
