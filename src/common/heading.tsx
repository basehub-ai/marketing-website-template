import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva, cx } from "class-variance-authority";

const $headingContainer = cva("flex flex-col gap-3", {
  variants: {
    align: {
      center: "items-center self-center",
      left: "items-start self-start",
      right: "items-end self-end",
    },
  },
  defaultVariants: {
    align: "center",
  },
});

type HeadingProps = {
  children: React.ReactNode;
  tag?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  title?: string;
} & VariantProps<typeof $headingContainer>;

export function Heading({ tag, subtitle, className, align, ...props }: HeadingProps) {
  const Comp = Slot;

  return (
    <div className={$headingContainer({ align, className })}>
      {tag ? <Tag>{tag}</Tag> : null}
      <div
        className={cx("flex flex-col justify-center gap-1", {
          "items-start self-start": align === "left",
          "items-center self-center": align === "center" || !align,
          "items-end self-end": align === "right",
        })}
      >
        <Comp
          className={cx("text-3xl font-medium md:text-4xl", {
            "text-center": align === "center" || !align,
            "text-left": align === "left",
            "text-right": align === "right",
          })}
          {...props}
        />
        {subtitle ? (
          <p
            className={cx(
              "text-pretty text-lg font-light text-text-tertiary dark:text-dark-text-tertiary md:text-xl",
              {
                "text-center": align === "center" || !align,
                "text-left": align === "left",
                "text-right": align === "right",
              },
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function Tag({
  className,
  children,
  asChild,
  ...props
}: React.AllHTMLAttributes<HTMLDivElement> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "h3";

  return (
    <Comp
      className={cx(
        "flex min-h-7 items-center justify-center gap-2 rounded-full border border-border bg-surface-primary px-3.5 pb-px text-sm font-medium text-text-tertiary dark:border-dark-border dark:bg-dark-surface-primary dark:text-dark-text-tertiary md:text-base",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
