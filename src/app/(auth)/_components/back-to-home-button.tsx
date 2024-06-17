import { ButtonLink } from "@/common/button";

export function BackToHomeButton() {
  return (
    <ButtonLink
      unstyled
      className="text-sm text-text-tertiary underline decoration-text-tertiary hover:text-text-secondary dark:text-dark-text-tertiary dark:hover:text-dark-text-secondary"
      href="/"
    >
      Back to Home
    </ButtonLink>
  );
}
