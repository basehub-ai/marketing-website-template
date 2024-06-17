import { type DarkLightImageFragment } from "@/lib/basehub/fragments";
import clsx from "clsx";
import type { ImageProps } from "next/image";
import { BaseHubImage } from "basehub/next-image";

type DarkLightImageProps = DarkLightImageFragment &
  Omit<ImageProps, "src" | "alt"> & {
    alt?: string;
  };

export function DarkLightImage({
  alt,
  dark,
  light,
  className,
  width,
  height,
  ...props
}: DarkLightImageProps) {
  return (
    <>
      {dark ? (
        <BaseHubImage
          alt={dark.alt ?? alt ?? ""}
          className={clsx("hidden dark:block", className)}
          height={height ?? dark.height}
          src={dark.url}
          width={width ?? dark.width}
          {...props}
        />
      ) : null}
      <BaseHubImage
        alt={light.alt ?? alt ?? ""}
        className={clsx(dark && "dark:hidden", className)}
        height={height ?? light.height}
        src={light.url}
        width={width ?? light.width}
        {...props}
      />
    </>
  );
}
