import {ButtonLink} from "@/common/button";
import {Section} from "@/common/layout";

const callout = {
  title: "AI for Every Business",
  subtitle: "Empower your organization with our AI-driven solutions.",
  cta: {
    _title: "Learn More",
    url: "/",
    type: "secondary",
  },
  secondaryCta: {
    _title: "Get Started",
    url: "/",
    type: "primary",
  },
};

export function Callout1() {
  return (
    <Section>
      <article className="relative flex flex-col items-center justify-center gap-9 self-stretch rounded-xl border border-border bg-surface-secondary p-6 dark:border-dark-border dark:bg-dark-surface-secondary">
        <div className="absolute left-0 top-10 h-px w-full bg-border dark:bg-dark-border" />
        <div className="absolute bottom-[72px] left-0 h-px w-full bg-border dark:bg-dark-border" />
        <div className="absolute left-0 top-0 h-full w-full bg-surface-secondary blur-3xl dark:bg-dark-surface-secondary" />
        <div className="relative z-10 flex flex-col items-center gap-2 text-center">
          <h4 className="text-center text-3xl font-medium tracking-tighter text-text-primary dark:text-text-secondary sm:max-w-full sm:px-0">
            {callout.title}
          </h4>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
            {callout.subtitle}
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-2">
          <ButtonLink href="/" intent="secondary">
            {callout.cta._title}
          </ButtonLink>
          <ButtonLink href="/" intent="primary">
            {callout.secondaryCta._title}
          </ButtonLink>
        </div>
      </article>
    </Section>
  );
}
