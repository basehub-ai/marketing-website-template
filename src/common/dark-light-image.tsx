"use client";

import { useHasRendered } from "@/hooks/use-has-rendered";
import { type DarkLightImageFragment } from "@/lib/basehub/fragments";
import { useTheme } from "next-themes";
import Image, { type ImageProps } from "next/image";

type DarkLightImageProps = DarkLightImageFragment &
  Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
    alt?: string;
  };

export function DarkLightImage({ alt, dark, light, ...props }: DarkLightImageProps) {
  const { resolvedTheme } = useTheme();
  const hasRendered = useHasRendered();

  const image = resolvedTheme === "dark" && dark ? dark : light;

  if (!hasRendered || !resolvedTheme) {
    return (
      <Image
        alt={light.alt ?? alt ?? ""}
        height={light.height}
        src={light.url}
        width={light.width}
        {...props}
      />
    );
  }

  return (
    <Image
      alt={image.alt ?? alt ?? ""}
      height={image.height}
      src={image.url}
      width={image.width}
      {...props}
    />
  );
}
