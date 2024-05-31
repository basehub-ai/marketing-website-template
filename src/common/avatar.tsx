"use client";
import clsx from "clsx";
import Image from "next/image";

import { type AvatarFragment, type AuthorFragment } from "@/lib/basehub/fragments";

import { SimpleTooltip } from "./simple-tooltip";

export function Author({ image, _title }: AuthorFragment) {
  return (
    <SimpleTooltip content={_title}>
      <Image
        alt={image.alt ?? "Avatar"}
        className="size-7 rounded-full border-2 border-surface-primary dark:border-dark-surface-primary"
        height={image.height}
        src={image.url}
        width={image.width}
      />
    </SimpleTooltip>
  );
}

export function Avatar({ className, alt, url, ...props }: AvatarFragment & { className?: string }) {
  return (
    <Image
      alt={alt ?? "Avatar"}
      className={clsx(
        "size-7 shrink-0 rounded-full border-2 border-surface-primary dark:border-dark-surface-primary",
        className,
      )}
      src={url}
      {...props}
      height={28}
      width={28}
    />
  );
}
