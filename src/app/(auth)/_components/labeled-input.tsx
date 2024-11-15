import * as React from "react";
import { clsx } from "clsx";

export function LabeledInput({
  label,
  id: _id,
  className,
  ...props
}: { label: string; id?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const reactId = React.useId();
  const id = _id ?? reactId;

  return (
    <LabeledWrapper id={id} label={label}>
      <input
        className={clsx(
          className,
          "rounded-md border border-border bg-surface-secondary py-2 pl-3 pr-3.5 text-sm placeholder:text-sm placeholder:text-text-tertiary/50 dark:border-dark-border dark:bg-dark-surface-tertiary dark:placeholder:text-dark-text-tertiary/50",
        )}
        id={id}
        {...props}
      />
    </LabeledWrapper>
  );
}

export const LabeledTextarea = ({
  label,
  id: _id,
  ref,
  className,
  ...props
}: { label: string } & JSX.IntrinsicElements["textarea"]) => {
  const reactId = React.useId();
  const id = _id ?? reactId;

  return (
    <LabeledWrapper id={id} label={label}>
      <textarea
        ref={ref}
        className={clsx(
          className,
          "rounded-md border border-border bg-surface-secondary py-2 pl-3 pr-3.5 text-sm [form-sizing:content] placeholder:text-sm placeholder:text-text-tertiary dark:border-dark-border dark:bg-dark-surface-tertiary dark:placeholder:text-dark-text-tertiary",
        )}
        id={id}
        {...props}
      />
    </LabeledWrapper>
  );
};

export const LabeledWrapper = ({
  label,
  children,
  id,
  ref,
}: {
  id?: string;
  label: string;
  children: React.ReactNode;
} & JSX.IntrinsicElements["div"]) => {
  return (
    <div ref={ref} className="relative flex flex-col">
      <label
        className="pb-1.5 text-xs font-medium text-text-primary dark:text-dark-text-primary"
        htmlFor={id}
      >
        {label}
      </label>
      {children}
    </div>
  );
};
