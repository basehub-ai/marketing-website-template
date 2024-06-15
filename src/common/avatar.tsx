"use client";
import clsx from "clsx";
import { BaseHubImage } from "basehub/next-image";

import { type AvatarFragment, type AuthorFragment } from "@/lib/basehub/fragments";

import { CustomTooltip } from "./tooltip";

export function Author({ image, _title }: AuthorFragment) {
  return (
    <CustomTooltip content={_title}>
      <BaseHubImage
        alt={image.alt ?? `Avatar for ${_title}`}
        className="size-8 rounded-full border-2 border-surface-primary object-cover transition-all dark:border-dark-surface-primary"
        height={image.height}
        src={image.url}
        width={image.width}
      />
    </CustomTooltip>
  );
}

export function Avatar({ className, alt, url, ...props }: AvatarFragment & { className?: string }) {
  return (
    <BaseHubImage
      alt={alt ?? "Avatar"}
      className={clsx(
        "size-7 shrink-0 rounded-full border-2 border-surface-primary object-cover dark:border-dark-surface-primary",
        className,
      )}
      src={url}
      {...props}
      height={28}
      width={28}
    />
  );
}
