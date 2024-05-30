import { type VariantProps, cva } from "class-variance-authority";
import Link, { type LinkProps } from "next/link";

export const $button = cva(
  "inline-flex gap-1 items-center justify-center shrink-0 rounded-full ring-control focus-visible:ring-2 outline-none",
  {
    variants: {
      intent: {
        primary:
          "bg-neutral-500 text-neutral-50 hover:bg-neutral-600 hover:text-neutral-50 border-neutral-600",
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
        md: "h-7 px-3.5 text-xs md:text-sm md:h-8 md:px-5",
        lg: "h-9 px-5 text-sm md:text-base md:h-10",
      },
    },
    defaultVariants: {
      size: "md",
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
  size,
  ...props
}: ButtonProps<"button">) {
  return (
    <button
      className={
        unstyled
          ? className
          : $button({
              intent,
              disabled,
              onlyButton,
              iconSide: icon ? iconSide : undefined,
              unstyled,
              className,
              size,
            })
      }
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
  size,
  ...props
}: ButtonProps<"a"> & LinkProps) {
  return (
    <Link
      className={
        unstyled
          ? className
          : $button({
              intent,
              disabled,
              onlyButton,
              iconSide: icon ? iconSide : undefined,
              className,
              unstyled,
              size,
            })
      }
      {...props}
    >
      {children}
      {icon ? <span>{icon}</span> : null}
    </Link>
  );
}
