import { build } from "esbuild";

/** @type {import("esbuild").BuildOptions} */
const options = {
  entryPoints: [
    "src/content-scripts/footnote-tooltip.ts",
    "src/content-scripts/sticky-header.ts",
  ],
  bundle: true,
  minify: true,
  outdir: "dist/esbuild",
  outbase: "src",
  target: "es2022",
  logLevel: "info",
};
build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
