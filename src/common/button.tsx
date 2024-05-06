import {type VariantProps, cva} from "class-variance-authority";
import Link, {type LinkProps} from "next/link";

const $button = cva(
  "inline-flex gap-1 items-center justify-center h-8 px-5 shrink-0 rounded-full focus-visible:ring-control focus-visible:ring-2  focus:ring-control focus:ring-2 dark:focus:ring-dark-control dark:focus:ring-2 text-sm",
  {
    variants: {
      intent: {
        primary:
          "bg-neutral-500 text-neutral-50 hover:bg-neutral-600 hover:text-neutral-50 border-neutral-600",
        secondary:
          "bg-surface-secondary text-text-primary border-border border dark:bg-dark-surface-secondary dark:text-dark-text-primary dark:border-dark-border hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary",
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
    },
  },
);

type ButtonProps<C extends keyof JSX.IntrinsicElements> = VariantProps<typeof $button> &
  JSX.IntrinsicElements[C] & {icon?: React.ReactNode; unstyled?: boolean};

export function Button({
  children,
  intent = "primary",
  disabled = false,
  onlyButton = false,
  icon,
  iconSide = "left",
  unstyled,
  className,
  ...props
}: ButtonProps<"button">) {
  return (
    <button
      className={$button({
        intent: unstyled ? undefined : intent,
        disabled,
        onlyButton,
        iconSide: icon ? iconSide : undefined,
        unstyled,
        className,
      })}
      disabled={disabled}
      {...props}
    >
      {children}
      {icon}
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
  ...props
}: ButtonProps<"a"> & LinkProps) {
  return (
    <Link
      className={$button({
        intent: unstyled ? undefined : intent,
        disabled,
        onlyButton,
        iconSide: icon ? iconSide : undefined,
        className,
        unstyled,
      })}
      {...props}
    >
      {children}
      {icon}
    </Link>
  );
}
