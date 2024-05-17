"use client";
import Image from "next/image";
import {cx} from "class-variance-authority";

import {type AvatarFragment, type AuthorFragment} from "@/lib/basehub/fragments";

import {SimpleTooltip} from "./simple-tooltip";

export function Author({image, _title}: AuthorFragment) {
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

export function Avatar({
  className,
  alt,
  width,
  height,
  url,
  ...props
}: AvatarFragment & {className?: string}) {
  return (
    <Image
      alt={alt ?? "Avatar"}
      className={cx(
        "size-7 rounded-full border-2 border-surface-primary dark:border-dark-surface-primary",
        className,
      )}
      height={height}
      src={url}
      width={width}
      {...props}
    />
  );
}
