import { css } from "goober";
import { type FunctionComponent } from "react";
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
    id: "no-leading-prompts-in-clipboard",
    title: "コードブロックのコピー時にプロンプトを削除",
    description:
      "ターミナル操作のコードブロックをコピーする際，行頭のプロンプトを自動で削除します．",
  },
  {
    id: "code-block-filename-as-caption",
    title: "コードブロックのファイル名をキャプションとして表示",
    description:
      "コードブロックのファイル名部分に非ASCII文字が含まれる場合，ファイル名ではなくキャプションとみなしてサンセリフ体で表示します．",
  },
].sort((a, b) => a.id.localeCompare(b.id, "en"));

const style = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 480px;
  min-height: 300px;
  padding-right: 12px;
  padding-left: 12px;
`;

export const App: FunctionComponent = () => (
  <div className={style}>
    {options.map((opt, i) => (
      <Option {...opt} key={i} />
    ))}
  </div>
);
