import { type VariantProps, cva } from "class-variance-authority";
import Link, { type LinkProps } from "next/link";

export const $button = cva(
  "gap-1 font-normal shrink-0 rounded-full ring-control focus-visible:ring-2 outline-none",
  {
    variants: {
      intent: {
        primary:
          "bg-accent-500 text-accent-50 hover:bg-accent-600 hover:text-accent-50 border-accent-600",
        secondary:
          "bg-surface-secondary text-text-primary border-border border dark:bg-dark-surface-secondary dark:text-dark-text-primary dark:border-dark-border hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary",
        tertiary:
          "bg-text-primary text-surface-primary dark:bg-dark-text-primary dark:text-dark-surface-primary border border-dark-border dark:border-border hover:bg-dark-surface-tertiary dark:hover:bg-surface-tertiary",
      },
      disabled: {
        true: "opacity-30",
      },
      onlyButton: {
        true: "rounded-sm",
      },
      iconSide: {
        left: "flex-row-reverse pl-3",
        right: "flex-row pr-3",
      },
      unstyled: {
        true: "px-0 py-0 bg-transparent border-none hover:bg-transparent hover:border-none dark:hover:bg-transparent dark:hover:border-none dark:bg-transparent dark:border-none",
      },
      size: {
        md: "inline-flex items-center justify-center h-7 px-3.5 text-xs md:text-sm md:h-8 md:px-5",
        lg: "inline-flex items-center justify-center h-9 px-5 text-sm md:text-base md:h-10",
      },
    },
  },
);

type ButtonProps<C extends keyof JSX.IntrinsicElements> = VariantProps<typeof $button> &
  JSX.IntrinsicElements[C] & {
    icon?: React.ReactNode;
    unstyled?: boolean;
  };

export function Button({
  children,
  intent = "primary",
  disabled = false,
  onlyButton = false,
  icon,
  iconSide = "left",
  unstyled,
  className,
  size = "md",
  ...props
}: ButtonProps<"button">) {
  return (
    <button
      className={$button(
        !unstyled
          ? {
              intent,
              disabled,
              onlyButton,
              iconSide: icon ? iconSide : undefined,
              unstyled,
              className,
              size,
            }
          : { className },
      )}
      disabled={disabled}
      {...props}
    >
      {children}
      {icon ? <span>{icon}</span> : null}
    </button>
  );
}

export function ButtonLink({
  children,
  intent = "primary",
  disabled = false,
  onlyButton = false,
  icon,
  iconSide = "left",
  unstyled,
  className,
  size = "md",
  ...props
}: ButtonProps<"a"> & LinkProps) {
  return (
    <Link
      className={$button(
        !unstyled
          ? {
              intent,
              disabled,
              onlyButton,
              iconSide: icon ? iconSide : undefined,
              className,
              unstyled,
              size,
            }
          : { className },
      )}
      {...props}
    >
      {children}
      {icon ? <span>{icon}</span> : null}
    </Link>
  );
}
