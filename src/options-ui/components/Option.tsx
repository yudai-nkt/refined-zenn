import { css } from "goober";
import type { FunctionComponent } from "react";
import { useChromeStorageLocal } from "use-chrome-storage";
import { Switch } from "./Switch";

export type OptionProps = {
  id: string;
  title: string;
  description: string;
};

const optionContainer = css`
  color: #202124;

  div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

export const Option: FunctionComponent<OptionProps> = ({
  id,
  title,
  description,
}) => {
  const [checked, toggleCheck] = useChromeStorageLocal(id, false);
  const handleChange = (_: boolean) => {
    toggleCheck((c) => !c);
  };
  return (
    <div className={optionContainer}>
      <div>
        <h1>{title}</h1>
        <Switch checked={checked} onCheckedChange={handleChange} />
      </div>
      <div>{description}</div>
    </div>
  );
};
