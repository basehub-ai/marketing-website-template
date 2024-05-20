import type { BundledLanguage } from "shiki";

import { fragmentOn } from ".basehub";

import { CopyButton } from "./copy-button";
import { Highlighter } from "./highlight";
import s from "./code-snippet.module.scss";

export const codeSnippetFragment = fragmentOn("BlockCodeSnippet", {
  code: true,
  language: true,
});

export type CodeSnippetFragment = fragmentOn.infer<typeof codeSnippetFragment>;

export function CodeSnippet({ code, ...props }: CodeSnippetFragment) {
  // get title from props.code is between <title> and </title>
  const [, title] = /<title>(.*?)<\/title>/.exec(code) ?? [,];

  // delete all the line with <title> and </title> for example (sarsa <title>testtitle> \n test) -> test
  code = code.replace(/^.*<title>.*<\/title>.*\n/gm, "");

  return (
    <div className={s["code-snippet"]}>
      <header className={s.header}>
        <span>{title ?? "Untitled"}</span>
        <CopyButton text={code} />
      </header>
      <CodeSnippetContent code={code} {...props} />
    </div>
  );
}

export function CodeSnippetContent({ code, language }: CodeSnippetFragment) {
  return (
    <div className={s.content}>
      <Highlighter lang={language as BundledLanguage}>{code}</Highlighter>
    </div>
  );
}
