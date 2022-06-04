import { css } from "goober";
import { getConfig } from "../utils";

getConfig("code-block-filename-as-caption").then((enabled) => {
  if (enabled) {
    const isASCII = (str: string): boolean =>
      [...str].every((c) => c.charCodeAt(0) <= 127);

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
      if (!isASCII(filename.textContent!)) {
        filename.classList.add(resetFontFamily);
      }
    }
  }
});
