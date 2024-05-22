import type { BundledLanguage } from "shiki";

import { fragmentOn } from ".basehub";

import { CopyButton } from "./copy-button";
import { Highlighter } from "./highlight";
import s from "./code-snippet.module.scss";

export const codeSnippetFragment = fragmentOn("BlockCodeSnippet", {
  code: true,
  language: true,
});

export type CodeSnippetFragment = fragmentOn.infer<typeof codeSnippetFragment> & {
  title?: string;
};

export function CodeSnippet({ code, title = "Untitled", ...props }: CodeSnippetFragment) {
  return (
    <div className={s["code-snippet"]}>
      <header className={s.header}>
        <span>{title}</span>
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
