import clsx from "clsx";

import { ButtonLink } from "@/common/button";
import { Section } from "@/common/layout";
import { fragmentOn } from "basehub";

import s from "./callout-1.module.scss";

export const calloutFragment = fragmentOn("CalloutComponent", {
  title: true,
  subtitle: true,
  calloutCtAs: {
    cta: {
      label: true,
      href: true,
      type: true,
    },
    secondaryCta: {
      label: true,
      href: true,
      type: true,
    },
  },
});
type Callout = fragmentOn.infer<typeof calloutFragment>;

export function Callout(callout: Callout) {
  return (
    <Section>
      <article className="relative flex flex-col items-center justify-center gap-9 self-stretch overflow-hidden rounded-xl border border-border bg-surface-secondary p-6 dark:border-dark-border dark:bg-dark-surface-secondary">
        {/* Lines and bg  */}
        <div
          className={clsx(
            "absolute left-0 top-10 h-px w-full bg-gradient-to-l from-black/40 to-transparent dark:from-white/40 dark:to-transparent",
            s.line,
          )}
        />
        <div
          className={clsx(
            "absolute bottom-[72px] left-0 h-px w-full bg-gradient-to-l from-black/40 to-transparent dark:from-white/40 dark:to-transparent",
            s.line,
          )}
        />
        <div
          className={clsx(
            "absolute bottom-7 left-0 h-px w-full bg-gradient-to-l from-black/40 to-transparent dark:from-white/40 dark:to-transparent",
            s.line,
          )}
        />
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-surface-secondary blur-3xl filter dark:bg-dark-surface-secondary" />
        {/* -------- */}
        <div className="relative z-20 flex flex-col items-center gap-2 text-center">
          <h4 className="text-center text-3xl font-medium tracking-tighter text-text-primary dark:text-dark-text-primary sm:max-w-full sm:px-0 md:text-4xl">
            {callout.title}
          </h4>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary md:text-xl">
            {callout.subtitle}
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-2">
          <ButtonLink
            href={callout.calloutCtAs.secondaryCta.href}
            intent={callout.calloutCtAs.secondaryCta.type}
          >
            {callout.calloutCtAs.secondaryCta.label}
          </ButtonLink>
          <ButtonLink href={callout.calloutCtAs.cta.href} intent={callout.calloutCtAs.cta.type}>
            {callout.calloutCtAs.cta.label}
          </ButtonLink>
        </div>
      </article>
    </Section>
  );
}
