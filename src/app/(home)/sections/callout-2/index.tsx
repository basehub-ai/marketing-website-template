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

export function Callout2() {
  return (
    <Section>
      <article className="flex flex-col justify-center gap-9 self-stretch rounded-xl bg-neutral-100 p-6 lg:flex-row lg:justify-between lg:p-10">
        <div className="flex flex-col gap-2">
          <h4 className="text-3xl font-medium text-text-primary dark:text-text-secondary lg:text-4xl">
            {callout.title}
          </h4>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary lg:text-xl">
            {callout.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 lg:flex-col-reverse">
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
