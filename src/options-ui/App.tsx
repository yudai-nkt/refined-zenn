import { css } from "goober";
import { Option, type OptionProps } from "./components/Option";

const options: OptionProps[] = [
  {
    id: "footnote-tooltip",
    title: "脚注の内容をツールチップ表示",
    description:
      "脚注アンカーにカーソルをマウスオーバーすると，脚注の内容をツールチップで表示します．",
  },
  {
    id: "sticky-header",
    title: "ヘッダーをページ上部に固定",
    description:
      "ページをスクロールしてもヘッダーが固定されて見えるようにします．",
  },
  {
    id: "trim-leading-prompts-in-clipboard",
    title: "コードブロックのコピー時にプロンプトを削除",
    description:
      "ターミナル操作のコードブロックをコピーする際，行頭のプロンプトを自動で削除します．",
  },
];

const style = css`
  min-width: 480px;
  min-height: 300px;
  padding-left: 12px;
  padding-right: 12px;
`;

export const App = () => (
  <div class={style}>
    {options.map((opt, i) => (
      <Option {...opt} key={i} />
    ))}
  </div>
);
