import { type DarkLightImageFragment } from "@/lib/basehub/fragments";
import clsx from "clsx";
import type { ImageProps } from "next/image";
import { BaseHubImage } from "basehub/next-image";

type DarkLightImageProps = DarkLightImageFragment &
  Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
    alt?: string;
  };

export function DarkLightImage({ alt, dark, light, className, ...props }: DarkLightImageProps) {
  return (
    <>
      {dark ? (
        <BaseHubImage
          alt={dark.alt ?? alt ?? ""}
          className={clsx("hidden dark:block", className)}
          height={dark.height}
          src={dark.url}
          width={dark.width}
          {...props}
        />
      ) : null}
      <BaseHubImage
        alt={light.alt ?? alt ?? ""}
        className={clsx(dark && "dark:hidden", className)}
        height={light.height}
        src={light.url}
        width={light.width}
        {...props}
      />
    </>
  );
}
