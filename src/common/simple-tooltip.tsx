"use client";
import clsx from "clsx";
import * as Tooltip from "@radix-ui/react-tooltip";

export type SimpleTooltipProps = {
  content: React.ReactNode;
  delayDuration?: Tooltip.TooltipProps["delayDuration"];
  disabled?: boolean;
  className?: string;
} & Omit<Tooltip.TooltipProps, "className">;

export function SimpleTooltip({ children, content, className, ...props }: SimpleTooltipProps) {
  return (
    <Tooltip.TooltipProvider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={clsx(
              "max-w-[160px] rounded-md border border-border bg-surface-primary p-2 text-sm text-text-secondary dark:border-dark-border dark:bg-dark-surface-primary dark:text-dark-text-secondary",
              className,
            )}
            {...props}
          >
            {content}
            <Tooltip.Arrow className="fill-surface-primary dark:fill-dark-surface-primary" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.TooltipProvider>
  );
}

export function TooltipProvider({ children }: { children?: React.ReactNode }) {
  return <Tooltip.Provider>{children}</Tooltip.Provider>;
}
