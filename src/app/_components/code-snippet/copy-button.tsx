"use client";

import { useCopyToClipboard } from "basehub/react-code-block/client";
import { Button } from "@/common/button";
import { ClipboardCopyIcon, CheckIcon } from "@radix-ui/react-icons";

export function CopyButton() {
  const { copied, onCopy } = useCopyToClipboard();

  return (
    <Button unstyled className="relative -mx-2 p-2" onClick={onCopy}>
      <span className="sr-only">Copy</span>
      {copied ? <CheckIcon /> : <ClipboardCopyIcon />}
    </Button>
  );
}
