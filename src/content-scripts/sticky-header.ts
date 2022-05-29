import { css } from "goober";
import { getConfig } from "../utils";

getConfig("sticky-header").then((enabled) => {
  if (enabled) {
    const stickyHeader = css`
      position: sticky;
      top: 0;
      z-index: 2;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    `;

    const header = document.querySelector("header");
    header!.classList.add(stickyHeader);

    const pathname = window.location.pathname.split("/").slice(1);

    if (pathname[0] === "") {
      const foo = css`
        top: 62px;
      `;
      document.querySelector("nav")!.classList.add(foo);
    }

    if (pathname.length === 3 && pathname[1] === "articles") {
      const adjustVerticalPosition = css`
        top: 80px;
      `;
      document
        .querySelector("div.ArticleSidebar_stikcy__eTeB7")!
        .classList.add(adjustVerticalPosition);
    }
  }
});
