import { css } from "goober";
import type { FunctionComponent } from "react";
import { useChromeStorageLocal } from "use-chrome-storage";
import { Switch } from "./Switch";

export type OptionProps = {
  id: string;
  title: string;
  description: string;
};

const headingContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const optionTitle = css`
  font-size: 14px;
  margin-bottom: 4px;
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
    <>
      <div className={headingContainer}>
        <h1 className={optionTitle}>{title}</h1>
        <Switch checked={checked} onCheckedChange={handleChange} />
      </div>
      <div>{description}</div>
    </>
  );
};
