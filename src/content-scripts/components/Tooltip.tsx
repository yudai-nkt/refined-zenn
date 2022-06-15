import * as RadixTooltip from "@radix-ui/react-tooltip";
import { css } from "goober";
import type { ReactNode, FunctionComponent } from "react";

type TooltipProps = Pick<HTMLAnchorElement, "href" | "id"> & {
  label: string;
  children: ReactNode;
};

const contentStyle = css`
  z-index: 9;
  max-width: 400px;
  padding: 5px;
  font-size: 12px;
  line-height: 1.4;
  background: var(--c-base-bg);
  border: 1px solid var(--c-gray-border-lighter);
  border-radius: 4px;
  box-shadow: 2px 2px 2px #21253840;
`;

export const Tooltip: FunctionComponent<TooltipProps> = ({
  label,
  children,
  ...anchorAttributes
}) => (
  <RadixTooltip.Root>
    <RadixTooltip.Trigger>
      <a {...anchorAttributes}>{label}</a>
    </RadixTooltip.Trigger>
    <RadixTooltip.Portal>
      <RadixTooltip.Content className={`znc ${contentStyle}`} align="start">
        {children}
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  </RadixTooltip.Root>
);
