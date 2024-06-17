import clsx from "clsx";

import { Button } from "./button";

export function Input({
  className,
  disabled,
  error,
  buttonContent = "Submit",
  ...props
}: React.ComponentProps<"input"> & { error?: string | null; buttonContent?: string }) {
  return (
    <div className="relative">
      <input
        className={clsx(
          "h-9 w-full rounded-full border border-border py-2 pl-4 pr-28 dark:border-dark-border md:h-11",
          "disabled:opacity-50",
          "placeholder:text-sm placeholder:text-text-tertiary dark:placeholder-dark-text-tertiary",
          "text-sm text-text-primary dark:text-dark-text-primary",
          "outline-none focus-visible:ring-2 focus-visible:ring-control",
          error ? "text-error placeholder:text-error/50" : "",
          className,
        )}
        disabled={disabled}
        {...props}
      />
      {error ? (
        <p className="dark:text-dark-error absolute -bottom-5 left-4 text-xs text-error">{error}</p>
      ) : null}
      <Button
        className={clsx(
          "absolute right-1 top-1 !h-7 peer-disabled:opacity-50 md:right-1.5 md:top-1.5 md:!h-8",
          error && "opacity-50",
        )}
        disabled={disabled}
        intent="tertiary"
        type="submit"
      >
        {buttonContent}
      </Button>
    </div>
  );
}
