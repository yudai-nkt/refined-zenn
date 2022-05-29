import { getConfig } from "../utils";

getConfig("footnote-tooltip").then((enabled) => {
  if (enabled) {
    const footnoteRefs = document.querySelectorAll("sup.footnote-ref > a");
    const footnoteItems = document.querySelectorAll(
      "section.footnotes > ol.footnotes-list > li.footnote-item > p"
    );
    let index = Math.min(footnoteRefs.length, footnoteItems.length);
    while (index-- > 0) {
      const footnoteText = [...footnoteItems[index].childNodes]
        .map((n) =>
          // This type assertion should be safe because the optional chain takes care of
          // the case where `n` is actually a non-`Element` `Node`.
          (n as Element).classList?.contains("footnote-backref")
            ? ""
            : n.textContent
        )
        .join("");
      footnoteRefs[index].setAttribute("title", footnoteText);
    }
  }
});
