import clsx from "clsx";
import React from "react";
import { TooltipProvider } from "./tooltip";

export function AvatarsGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLImageElement>) {
  return (
    <TooltipProvider delayDuration={50}>
      <div
        className={clsx("flex -space-x-3 hover:space-x-0.5 rtl:space-x-reverse", className)}
        {...props}
      >
        {children}
      </div>
    </TooltipProvider>
  );
}
