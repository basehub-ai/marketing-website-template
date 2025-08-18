import clsx from "clsx";

import { Section } from "@/common/layout";
import { fragmentOn } from "basehub";

import s from "./callout-1.module.scss";
import { TrackedButtonLink } from "@/app/_components/tracked_button";
import { buttonFragment } from "@/lib/basehub/fragments";
import { GeneralEvents } from "@/../basehub-types";

export const calloutFragment = fragmentOn("CalloutComponent", {
  _analyticsKey: true,
  title: true,
  subtitle: true,
  actions: buttonFragment,
});
type Callout = fragmentOn.infer<typeof calloutFragment>;

export function Callout(callout: Callout & { eventsKey: GeneralEvents["ingestKey"] }) {
  return (
    <Section>
      <article className="border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary relative flex flex-col items-center justify-center gap-9 self-stretch overflow-hidden rounded-xl border p-6">
        {/* Lines and bg  */}
        <div
          className={clsx(
            "absolute top-10 left-0 h-px w-full bg-linear-to-l from-black/40 to-transparent dark:from-white/40 dark:to-transparent",
            s.line,
          )}
        />
        <div
          className={clsx(
            "absolute bottom-[72px] left-0 h-px w-full bg-linear-to-l from-black/40 to-transparent dark:from-white/40 dark:to-transparent",
            s.line,
          )}
        />
        <div
          className={clsx(
            "absolute bottom-7 left-0 h-px w-full bg-linear-to-l from-black/40 to-transparent dark:from-white/40 dark:to-transparent",
            s.line,
          )}
        />
        <div className="bg-surface-secondary dark:bg-dark-surface-secondary absolute top-0 left-0 z-10 h-full w-full blur-3xl filter" />
        {/* -------- */}
        <div className="relative z-20 flex flex-col items-center gap-2 text-center">
          <h4 className="text-text-primary dark:text-dark-text-primary text-center text-3xl font-medium tracking-tighter sm:max-w-full sm:px-0 md:text-4xl">
            {callout.title}
          </h4>
          <p className="text-text-secondary dark:text-dark-text-secondary text-lg md:text-xl">
            {callout.subtitle}
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-2">
          {callout.actions?.map((action) => (
            <TrackedButtonLink
              key={action._id}
              analyticsKey={callout.eventsKey}
              href={action.href}
              intent={action.type}
              name="secondary_cta_click"
            >
              {action.label}
            </TrackedButtonLink>
          ))}
        </div>
      </article>
    </Section>
  );
}
