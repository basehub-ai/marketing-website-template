"use client";
import clsx from "clsx";
import Image, { type ImageProps } from "next/image";

import { type AvatarFragment, type AuthorFragment } from "@/lib/basehub/fragments";

import { CustomTooltip } from "./tooltip";

export function Author({
  image,
  _title,
  ...props
}: AuthorFragment & Omit<ImageProps, "src" | "alt">) {
  return (
    <CustomTooltip content={_title}>
      <Image
        alt={image.alt ?? `Avatar for ${_title}`}
        className="size-8 rounded-full border-2 border-surface-primary object-cover transition-all dark:border-dark-surface-primary"
        height={image.height}
        src={image.url}
        width={image.width}
        {...props}
      />
    </CustomTooltip>
  );
}

export function Avatar({
  className,
  alt,
  url,
  ...props
}: AvatarFragment & Omit<ImageProps, "src" | "alt">) {
  return (
    <Image
      alt={alt ?? "Avatar"}
      className={clsx(
        "size-7 shrink-0 rounded-full border-2 border-surface-primary object-cover dark:border-dark-surface-primary",
        className,
      )}
      height={28}
      src={url}
      width={28}
      {...props}
    />
  );
}
