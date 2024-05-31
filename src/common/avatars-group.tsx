import React from "react";

export function AvatarsGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLImageElement>) {
  return (
    <div className={clsx("flex -space-x-3 rtl:space-x-reverse", className)} {...props}>
      {children}
    </div>
  );
}
