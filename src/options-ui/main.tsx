import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion --
 * `index.html` has an element whose ID is `app`,
 */
createRoot(document.querySelector("#app")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
