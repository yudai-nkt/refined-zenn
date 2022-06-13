import * as RadixSwitch from "@radix-ui/react-switch";
import { css } from "goober";
import { type FunctionComponent } from "react";

type SwitchProps = Pick<RadixSwitch.SwitchProps, "checked" | "onCheckedChange">;

const rootStyle = css`
  all: unset;
  width: 28px;
  height: 12px;
  background-color: rgb(189 193 198);
  border-radius: 999px;
  position: relative;
  transition: background-color linear 80ms;

  &[data-state="checked"] {
    background-color: rgb(26 115 232 / 50%);
  }
`;

const thumbStyle = css`
  display: block;
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 40%);
  transform: translateY(-2px);
  transition: transform linear 80ms, background-color linear 80ms;
  will-change: transform;

  &[data-state="checked"] {
    transform: translate(18px, -2px);
    background-color: rgb(38 115 232);
  }
`;

export const Switch: FunctionComponent<SwitchProps> = (props) => (
  <RadixSwitch.Root className={rootStyle} {...props}>
    <RadixSwitch.Thumb className={thumbStyle} />
  </RadixSwitch.Root>
);
