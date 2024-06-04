"use client";

import { Button } from "@/common/button";
import { ClipboardCopyIcon, CheckIcon } from "@radix-ui/react-icons";
import React from "react";

export function CopyButton({ text }: { text: string }) {
  const [isShowingTooltip, setIsShowingTooltip] = React.useState(false);
  const handleClick = async () => {
    await navigator.clipboard.writeText(text);
    setIsShowingTooltip(true);
    setTimeout(() => setIsShowingTooltip(false), 2000);
  };

  return (
    <Button unstyled className="relative" onClick={handleClick}>
      {isShowingTooltip ? <CheckIcon /> : <ClipboardCopyIcon />}
    </Button>
  );
}
