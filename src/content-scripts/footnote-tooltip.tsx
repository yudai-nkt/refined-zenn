import { Tooltip } from "./components/tooltip";
import { createRoot } from "react-dom/client";
import { getConfig } from "../utils";
import { css } from "goober";
import { createElement } from "react";

/**
 * Transform an array of {@link Node}s into an equivalent {@link JSX.Element}.
 * @param nodes - Nodes to transform.
 * @returns Transformed JSX.
 */
const nodesToJSX = (nodes: Node[]): JSX.Element => (
  <span>
    {nodes.map((node) => {
      const { nodeName, textContent } = node;
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
        return createElement(
          element,
          attributes,
          nodesToJSX([...node.childNodes])
        );
      } else {
        console.warn("Unsupported node found.");
        return textContent;
      }
    })}
  </span>
);

getConfig("footnote-tooltip").then((enabled) => {
  if (enabled) {
    /**
     * Workaround for incorrect placement of tooltips. Since Radix UI's
     * Popper component inlines the transformation using the `style`
     * attribute, use of `!important` should be justified.
     */
    const adjustPlacement = (x: number, y: number) => css`
      div[data-radix-popper-content-wrapper] {
        transform: translate3d(${x}px, ${y}px, 0px) !important;
      }
    `;
    const bboxSection = document
      .querySelector("section")!
      .getBoundingClientRect();

    const footnoteItems = document.querySelectorAll(
      "section.footnotes > ol.footnotes-list > li.footnote-item > p"
    );
    for (const footnoteItem of footnoteItems) {
      // The child combinator in the query selector ensures
      // that `footnoteItem` has a parent.
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
        const bboxRef = footnoteRef.getBoundingClientRect();
        const [offsetX, offsetY] = [
          bboxRef.left - bboxSection.left,
          bboxRef.top - bboxSection.top,
        ];
        newRef.classList.add(adjustPlacement(offsetX + 12, offsetY + 24));
        createRoot(newRef).render(
          <Tooltip
            id={footnoteRef.id}
            href={footnoteRef.href}
            label={footnoteRef.text}
          >
            {tooltipContent}
          </Tooltip>
        );
        footnoteRef.replaceWith(newRef);
      }
    }
  }
});
