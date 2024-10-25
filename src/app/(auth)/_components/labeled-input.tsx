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

export const LabeledTextarea = ({
  label,
  id,
  ref,
  ...props
}: { label: string } & JSX.IntrinsicElements["textarea"]) => {
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
};
