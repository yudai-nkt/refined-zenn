import { AnchorTooltip } from "./components/AnchorTooltip";
import { createRoot } from "react-dom/client";
import { getConfig } from "../utils";
import { createElement } from "react";

/**
 * Transform an array of {@link Node}s into an equivalent {@link JSX.Element}.
 * @param nodes - Nodes to transform.
 * @returns Transformed JSX.
 */
/* eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types --
 * Node cannot be immutable.
 */
const nodesToJSX = (nodes: Node[]): JSX.Element => (
  <span>
    {nodes.map((node) => {
      const { childNodes, nodeName, textContent } = node;
      if (nodeName === "#text") {
        return textContent;
      } else if (node instanceof Element) {
        const element = nodeName.toLowerCase();
        const attributes = Object.fromEntries(
          [...node.attributes].map(({ nodeName, nodeValue }) => [
            nodeName,
            nodeValue,
          ])
        );
        return createElement(element, attributes, nodesToJSX([...childNodes]));
      } else {
        console.warn("Unsupported node found.");
        return textContent;
      }
    })}
  </span>
);

const enabled = await getConfig("footnote-tooltip");
if (enabled) {
  const footnoteItems = document.querySelectorAll(
    "section.footnotes > ol.footnotes-list > li.footnote-item > p"
  );
  for (const footnoteItem of footnoteItems) {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion --
     * The child combinator in the query selector ensures
     * that `footnoteItem` has a parent.
     */
    const footnoteId = footnoteItem.parentElement!.id;
    const footnoteRefs = document.querySelectorAll<HTMLAnchorElement>(
      `sup.footnote-ref > a[href='#${footnoteId}']`
    );
    const tooltipContent = nodesToJSX(
      [...footnoteItem.childNodes].filter(
        (n) =>
          !(n instanceof Element && n.classList.contains("footnote-backref"))
      )
    );
    for (const footnoteRef of footnoteRefs) {
      const newRef = document.createElement("span");
      createRoot(newRef).render(
        <AnchorTooltip
          id={footnoteRef.id}
          href={footnoteRef.href}
          label={footnoteRef.text}
        >
          {tooltipContent}
        </AnchorTooltip>
      );
      footnoteRef.replaceWith(newRef);
    }
  }
}
