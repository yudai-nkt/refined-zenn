import * as fs from "node:fs/promises";
import sharp from "sharp";

await fs.mkdir("public/icons", { recursive: true });

await Promise.all(
  [128, 48, 16].map((size) =>
    sharp("src/icon.svg")
      .resize(size, size)
      .png()
      .toFile(`public/icons/icon-${size}.png`)
  )
);
