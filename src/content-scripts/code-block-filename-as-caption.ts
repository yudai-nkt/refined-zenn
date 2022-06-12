import { css } from "goober";
import { getConfig } from "../utils";

const enabled = await getConfig("code-block-filename-as-caption");
if (enabled) {
  const isASCII = (str: string): boolean =>
    [...str].every((c) => {
      const codePoint = c.codePointAt(0);
      return codePoint !== undefined && codePoint <= 127;
    });

  const codeBlockFilenames = document.querySelectorAll(
    "span.code-block-filename"
  );
  // Monospaced font is applied using ".znc .code-block-filename" selector,
  // hence the double ampersand to beat it in terms of specificity.
  const resetFontFamily = css`
    && {
      font-family: var(--font-base);
    }
  `;

  for (const filename of codeBlockFilenames) {
    if (filename.textContent !== null) {
      if (!isASCII(filename.textContent)) {
        filename.classList.add(resetFontFamily);
      }
    } else {
      console.warn(
        "DOM structure might have changed; filename for code block found, but textContent is not set."
      );
    }
  }
}
