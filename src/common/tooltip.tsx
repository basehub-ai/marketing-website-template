"use client";
import clsx from "clsx";
import * as Tooltip from "@radix-ui/react-tooltip";

export type SimpleTooltipProps = {
  content: React.ReactNode;
  delayDuration?: Tooltip.TooltipProps["delayDuration"];
  disabled?: boolean;
  className?: string;
  side?: Tooltip.TooltipContentProps["side"];
  sideOffset?: Tooltip.TooltipContentProps["sideOffset"];
} & Omit<Tooltip.TooltipProps, "className">;

export function SimpleTooltip({ delayDuration = 200, ...props }: SimpleTooltipProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <CustomTooltip {...props} />
    </TooltipProvider>
  );
}

export function CustomTooltip({ children, content, className, ...props }: SimpleTooltipProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className={clsx(
            "z-[999] max-w-[160px] rounded-md border border-border bg-surface-secondary px-2 py-1 text-sm text-text-secondary dark:border-dark-border dark:bg-dark-surface-secondary dark:text-dark-text-secondary",
            className,
          )}
          {...props}
        >
          {content}
          <Tooltip.Arrow asChild>
            <Arrow />
          </Tooltip.Arrow>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function Arrow() {
  return (
    <svg
      className="-mt-px"
      fill="none"
      height="10"
      viewBox="0 0 12 10"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="fill-surface-secondary stroke-border dark:fill-dark-surface-secondary dark:stroke-dark-border"
        d="M6.76649 7.55043C6.41506 8.12151 5.58494 8.12151 5.23351 7.55043L0.894781 0.500001L11.1052 0.5L6.76649 7.55043Z"
      />
      <path
        className="fill-surface-secondary dark:fill-dark-surface-secondary"
        d="M1.3418 0H10.7666L10.1989 1H1.80013L1.3418 0Z"
      />
    </svg>
  );
}

export function TooltipProvider({
  children,
  delayDuration = 200,
}: {
  children?: React.ReactNode;
  delayDuration?: number;
}) {
  return (
    <Tooltip.Provider delayDuration={delayDuration} skipDelayDuration={500}>
      {children}
    </Tooltip.Provider>
  );
}
