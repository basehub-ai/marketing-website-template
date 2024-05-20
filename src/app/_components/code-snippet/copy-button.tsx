"use client";

import { ClipboardCopyIcon } from "@radix-ui/react-icons";

export function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
      }}
    >
      <ClipboardCopyIcon />
    </button>
  );
}
