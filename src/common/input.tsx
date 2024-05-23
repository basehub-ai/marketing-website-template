import { cva, cx } from "class-variance-authority";

import { Button } from "./button";

export const $input = cva("", {
  variants: {
    disabled: {
      true: "",
    },
    error: {
      true: "",
    },
    focus: {
      true: "",
    },
  },
});

export function Input({
  className,
  disabled,
  error,
  ...props
}: React.ComponentProps<"input"> & { error?: string | null }) {
  return (
    <div className="relative">
      <input className={cx($input({ className, error: !!error, disabled }))} {...props} />
      <Button className="absolute right-1 top-1" intent="tertiary">
        Submit
      </Button>
    </div>
  );
}
