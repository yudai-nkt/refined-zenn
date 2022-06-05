import * as RadixTooltip from "@radix-ui/react-tooltip";
import { css } from "goober";
import type { ReactNode, FunctionComponent } from "react";

type TooltipProps = Pick<HTMLAnchorElement, "href" | "id"> & {
  index: number;
  children: ReactNode;
};

const contentStyle = css`
  background-color: ghostwhite;
  max-width: 400px;
  z-index: 9;
  line-height: 1.4;
  font-size: 12px;
  padding: 5px;
  border-radius: 4px;
`;

export const Tooltip: FunctionComponent<TooltipProps> = ({
  index,
  children,
  ...anchorAttributes
}) => (
  <RadixTooltip.Root>
    <RadixTooltip.Trigger>
      <a {...anchorAttributes}>[{index}]</a>
    </RadixTooltip.Trigger>
    <RadixTooltip.Content className={contentStyle} align="start">
      {children}
    </RadixTooltip.Content>
  </RadixTooltip.Root>
);
