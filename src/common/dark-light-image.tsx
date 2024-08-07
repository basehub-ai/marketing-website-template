import { type DarkLightImageFragment } from "@/lib/basehub/fragments";
import clsx from "clsx";
import { BaseHubImage, type BaseHubImageProps } from "basehub/next-image";

type DarkLightImageProps = DarkLightImageFragment &
  Omit<BaseHubImageProps, "src" | "alt"> & {
    alt?: string;
    withPlaceholder?: boolean;
  };

export function DarkLightImage({
  alt,
  dark,
  light,
  className,
  width,
  height,
  withPlaceholder,
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
          {...(withPlaceholder && dark.blurDataURL
            ? {
                placeholder: "blur",
                blurDataURL: dark.blurDataURL,
              }
            : {})}
        />
      ) : null}
      <BaseHubImage
        alt={light.alt ?? alt ?? ""}
        className={clsx(dark && "dark:hidden", className)}
        height={height ?? light.height}
        src={light.url}
        width={width ?? light.width}
        {...props}
        {...(withPlaceholder && light.blurDataURL
          ? {
              placeholder: "blur",
              blurDataURL: light.blurDataURL,
            }
          : {})}
      />
    </>
  );
}
