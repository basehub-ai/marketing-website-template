import {cx} from "class-variance-authority";
import React from "react";

export function AvatarsGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLImageElement>) {
  return (
    <div className={cx("flex -space-x-3 rtl:space-x-reverse", className)} {...props}>
      {children}
    </div>
  );
}
