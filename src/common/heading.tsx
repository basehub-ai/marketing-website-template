import {Slot} from "@radix-ui/react-slot";
import {cx} from "class-variance-authority";

interface HeadingProps {
  children: React.ReactNode;
  tag: React.ReactNode;
  subtitle: React.ReactNode;
  className?: string;
}

export function Heading({tag, subtitle, className, ...props}: HeadingProps) {
  const Comp = Slot;

  return (
    <div className="flex flex-col items-center gap-3">
      <Tag>{tag}</Tag>
      <div className="flex flex-col items-center justify-center gap-1">
        <Comp className={cx("text-center text-3xl md:text-4xl", className)} {...props} />
        <p className="text-pretty text-center text-lg font-light text-text-tertiary dark:text-dark-text-tertiary md:text-xl">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export function Tag({
  className,
  children,
  asChild,
  ...props
}: React.AllHTMLAttributes<HTMLDivElement> & {asChild?: boolean}) {
  const Comp = asChild ? Slot : "h3";

  return (
    <Comp
      className={cx(
        "flex items-center justify-center gap-2 rounded-full border border-border bg-surface-primary px-3.5 pb-px text-text-tertiary dark:border-dark-border dark:bg-dark-surface-primary dark:text-dark-text-tertiary",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
