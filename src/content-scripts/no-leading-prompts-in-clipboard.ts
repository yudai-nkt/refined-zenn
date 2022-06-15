import { getConfig } from "../utils";

const enabled = await getConfig("no-leading-prompts-in-clipboard");
if (enabled) {
  const trimLeadingPrompts = (code: string): string =>
    code
      .split("\n")
      .map((l) => l.replace(/(\$ )?(.*)/, "$2"))
      .join("\n");

  const copyButtons = document.querySelectorAll(
    // Supported languages and aliases can be found here:
    // https://github.com/PrismJS/prism/tree/master/tests/languages
    // https://prismjs.com/#supported-languages
    ["bash", "shell", "shell-session", "sh-session", "shellsession"]
      .map((lang) => `pre.language-${lang} + button`)
      .join(", ")
  );

  for (const button of copyButtons) {
    button.addEventListener("click", ({ currentTarget }) => {
      if (currentTarget instanceof Element) {
        void navigator.clipboard.writeText(
          trimLeadingPrompts(
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion --
             * - The adjacent sibling combinator in the query selector ensures
             *   that `currentTarget` has a previous sibling.
             * - There should be a text to copy when this event listener is fired.
             */
            currentTarget.previousSibling!.textContent!.replace(/\n$/, "")
          )
        );
      }
    });
  }
}
