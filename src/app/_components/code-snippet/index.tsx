import type { BundledLanguage } from "shiki";

import { fragmentOn } from "basehub";

import { CopyButton } from "./copy-button";
import { Highlighter } from "./highlight";
import s from "./code-snippet.module.scss";
import { languagesIcons } from "./language";
import { FileIcon } from "@radix-ui/react-icons";

export const codeSnippetFragment = fragmentOn("CodeSnippetComponent", {
  _id: true,
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
        <div className="flex items-center">
          <span className="mr-2 size-4">
            {languagesIcons[code.language as BundledLanguage] ?? <FileIcon />}
          </span>
          <span className="text-text-secondary dark:text-dark-text-secondary">{_title}</span>
        </div>
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
