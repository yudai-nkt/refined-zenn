import { getConfig } from "../utils";

getConfig("trim-leading-prompts-in-clipboard").then((enabled) => {
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
          navigator.clipboard.writeText(
            // The adjacent sibling combinator in the query selector ensures
            // that `currentTarget` has a previous sibling.
            trimLeadingPrompts(
              currentTarget.previousSibling!.textContent!.replace(/\n$/, "")
            )
          );
        }
      });
    }
  }
});
