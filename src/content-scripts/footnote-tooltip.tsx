import { Tooltip } from "./components/tooltip";
import { createRoot } from "react-dom/client";
import { getConfig } from "../utils";

/**
 * Transform an array of {@link Node}s into a {@link JSX.Element}.
 * Only a small subset is implemented so that the function is small enough
 * and yet can handle Zenn's footnotes.
 * @param nodes - Nodes to transform.
 * @returns Transformed JSX.
 */
const nodesToJSX = (nodes: Node[]): JSX.Element => (
  <p>
    {nodes.map((node) => {
      const { nodeName, textContent } = node;
      switch (nodeName) {
        case "#text":
          return textContent;
        case "A":
          return (
            <a
              // This type assertion should be safe because the switch case
              //ensures that `node` is an anchor element.
              href={(node as HTMLAnchorElement).href}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {textContent}
            </a>
          );
        case "EM":
          return <em>{textContent}</em>;
        case "STRONG":
          return <strong>{textContent}</strong>;
        default:
          throw new Error("Unsupported HTML element found.");
      }
    })}
  </p>
);

getConfig("footnote-tooltip").then((enabled) => {
  if (enabled) {
    const footnoteRefs = document.querySelectorAll<HTMLAnchorElement>(
      "sup.footnote-ref > a"
    );
    const footnoteItems = document.querySelectorAll(
      "section.footnotes > ol.footnotes-list > li.footnote-item > p"
    );
    let index = Math.min(footnoteRefs.length, footnoteItems.length);
    while (index-- > 0) {
      const span = document.createElement("span");
      const footnoteRef = footnoteRefs[index];
      const { id, href } = footnoteRef;
      const tooltipContent = nodesToJSX(
        [...footnoteItems[index].childNodes].filter(
          // This type assertion should be safe because the optional chain takes
          // care of the case where `n` is actually a non-`Element` `Node`.
          (n) => !(n as Element).classList?.contains("footnote-backref")
        )
      );
      createRoot(span).render(
        <Tooltip id={id} href={href} index={index + 1}>
          {tooltipContent}
        </Tooltip>
      );
      footnoteRef.replaceWith(span);
    }
  }
});
