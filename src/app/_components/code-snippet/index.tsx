import type { BundledLanguage } from "shiki";

import { fragmentOn } from ".basehub";

import { CopyButton } from "./copy-button";
import { Highlighter } from "./highlight";
import s from "./code-snippet.module.scss";

export const codeSnippetFragment = fragmentOn("CodeSnippetComponent", {
  code: {
    code: true,
    language: true,
  },
  _title: true,
});

export type CodeSnippetFragment = fragmentOn.infer<typeof codeSnippetFragment>;

export function CodeSnippet({ code, _title = "Untitled" }: CodeSnippetFragment) {
  return (
    <div className={s["code-snippet"]}>
      <header className={s.header}>
        <span className="text-text-secondary dark:text-dark-text-secondary">{_title}</span>
        <CopyButton text={code.code} />
      </header>
      <CodeSnippetContent {...code} />
    </div>
  );
}

export function CodeSnippetContent({ code, language }: CodeSnippetFragment["code"]) {
  return (
    <div className={s.content}>
      <Highlighter lang={language as BundledLanguage}>{code}</Highlighter>
    </div>
  );
}
