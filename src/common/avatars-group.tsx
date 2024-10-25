import clsx from "clsx";
import * as React from "react";
import { TooltipProvider } from "./tooltip";

export function AvatarsGroup({
  className,
  children,
  animate = false,
  ...props
}: React.HTMLAttributes<HTMLImageElement> & { animate?: boolean }) {
  if (animate)
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

  return (
    <div className={clsx("flex -space-x-3 rtl:space-x-reverse", className)} {...props}>
      {children}
    </div>
  );
}
