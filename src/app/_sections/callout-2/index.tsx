import { fragmentOn } from "basehub";
import { ButtonLink } from "@/common/button";
import { Section } from "@/common/layout";

export const calloutv2Fragment = fragmentOn("CalloutV2Component", {
  title: true,
  subtitle: true,
  calloutV2CtAs: {
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
type Callout2 = fragmentOn.infer<typeof calloutv2Fragment>;

export function Callout2(callout: Callout2) {
  return (
    <Section>
      <article className="bg-neutral- flex flex-col justify-center gap-9 self-stretch rounded-xl p-6 dark:bg-neutral-500/10 lg:flex-row lg:justify-between lg:p-10">
        <div className="flex flex-col gap-2">
          <h4 className="text-3xl font-medium text-text-primary dark:text-dark-text-primary lg:text-4xl">
            {callout.title}
          </h4>
          <p className="text-lg text-grayscale-600 dark:text-grayscale-400 lg:text-xl">
            {callout.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 lg:flex-col-reverse">
          <ButtonLink
            href={callout.calloutV2CtAs.secondaryCta.href ?? ""}
            intent={callout.calloutV2CtAs.secondaryCta.type}
          >
            {callout.calloutV2CtAs.secondaryCta.label}
          </ButtonLink>
          <ButtonLink
            href={callout.calloutV2CtAs.cta.href ?? ""}
            intent={callout.calloutV2CtAs.cta.type}
          >
            {callout.calloutV2CtAs.cta.label}
          </ButtonLink>
        </div>
      </article>
    </Section>
  );
}
