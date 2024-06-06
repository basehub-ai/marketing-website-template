"use client";

import { type DarkLightImageFragment } from "@/lib/basehub/fragments";
import { useTheme } from "next-themes";
import Image, { type ImageProps } from "next/image";

type DarkLightImageProps = DarkLightImageFragment &
  Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
    alt?: string;
  };

export function DarkLightImage({ alt, ...props }: DarkLightImageProps) {
  const { theme, systemTheme } = useTheme();

  const currentTheme = (theme === "system" ? systemTheme : theme) as "dark" | "light";

  const image = props[currentTheme] ?? props.light;

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
