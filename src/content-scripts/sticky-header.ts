import { css } from "goober";
import { getConfig } from "../utils";

const enabled = await getConfig("sticky-header");
if (enabled) {
  const stickyHeader = css`
    position: sticky;
    top: 0;
    z-index: 2;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  `;

  const header = document.querySelector("header");
  if (header !== null) {
    header.classList.add(stickyHeader);
  } else {
    console.warn("DOM structure might have changed; header is missing.");
  }

  const pathname = window.location.pathname.split("/").slice(1);

  if (pathname[0] === "") {
    const foo = css`
      top: 62px;
    `;
    const navigation = document.querySelector("nav");
    if (navigation !== null) {
      navigation.classList.add(foo);
    } else {
      console.warn(
        "DOM structure might have changed; navigation bar is missing."
      );
    }
  }

  if (pathname.length === 3 && pathname[1] === "articles") {
    const adjustVerticalPosition = css`
      top: 80px;
    `;
    const sidebar = document.querySelector("div.ArticleSidebar_stikcy__eTeB7");
    if (sidebar !== null) {
      sidebar.classList.add(adjustVerticalPosition);
    } else {
      console.warn("DOM structure might have changed; sidebar is missing.");
    }
  }
}
