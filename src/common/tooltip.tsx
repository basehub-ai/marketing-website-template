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
            "max-w-[160px] rounded-md bg-surface-primary p-2 text-sm text-text-secondary shadow dark:bg-dark-surface-primary dark:text-dark-text-secondary dark:shadow-grayscale-400",
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
      className="-mt-px drop-shadow-[1px_2.2px_1px_rgba(0,0,0,0.15)] dark:drop-shadow-[1px_2.5px_1.2px_rgb(var(--grayscale-rgb-400)_/_0.6)]"
      fill="none"
      height="9"
      viewBox="0 0 12 9"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="fill-surface-primary dark:fill-dark-surface-primary"
        d="M5.23351 7.80043L0.894781 0.75L11.1052 0.749999L6.76649 7.80043C6.41506 8.37151 5.58494 8.37151 5.23351 7.80043Z"
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
