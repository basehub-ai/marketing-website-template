import { forwardRef } from "react";

export function LabeledInput({
  label,
  id,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <LabeledWrapper id={id} label={label}>
      <input
        className="rounded-md border border-border bg-surface-secondary py-2 pl-3 pr-3.5 text-sm placeholder:text-sm placeholder:text-text-tertiary/50 dark:border-dark-border dark:bg-dark-surface-tertiary dark:placeholder:text-dark-text-tertiary/50"
        id={id}
        {...props}
      />
    </LabeledWrapper>
  );
}

export const LabeledTextarea = forwardRef<
  HTMLTextAreaElement,
  { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ label, id, ...props }, ref) => {
  return (
    <LabeledWrapper id={id} label={label}>
      <textarea
        ref={ref}
        className="rounded-md border border-border bg-surface-secondary py-2 pl-3 pr-3.5 text-sm [form-sizing:content] placeholder:text-sm placeholder:text-text-tertiary dark:border-dark-border dark:bg-dark-surface-tertiary dark:placeholder:text-dark-text-tertiary"
        id={id}
        {...props}
      />
    </LabeledWrapper>
  );
});

export const LabeledWrapper = forwardRef<
  HTMLDivElement,
  {
    id?: string;
    label: string;
    children: React.ReactNode;
  }
>(({ label, children, id }, ref) => {
  return (
    <div ref={ref} className="relative flex flex-col gap-1.5">
      <label
        className="text-xs font-medium text-text-primary dark:text-dark-text-primary"
        htmlFor={id}
      >
        {label}
      </label>
      {children}
    </div>
  );
});
