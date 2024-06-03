import Image from "next/image";

import { ButtonLink } from "@/common/button";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { fragmentOn } from "basehub";
import { headingFragment } from "@/lib/basehub/fragments";

export const featuresSideBySideFragment = fragmentOn("FeaturesSideBySideComponent", {
  featuresSideBySideList: {
    items: {
      _title: true,
      subtitle: true,
      icon: {
        alt: true,
        url: true,
      },
    },
  },
  heading: headingFragment,
  cta: {
    primary: {
      label: true,
      href: true,
      type: true,
    },
    secondary: {
      label: true,
      href: true,
      type: true,
    },
  },
});

type FeaturesGrid = fragmentOn.infer<typeof featuresSideBySideFragment>;

export function SideFeatures({ featuresSideBySideList, heading, cta }: FeaturesGrid) {
  return (
    <Section className="relative gap-8 lg:!flex-row lg:gap-24 lg:p-28 xl:gap-32" container="full">
      <div className="container relative top-0 mx-auto flex-1 shrink self-stretch px-6 lg:px-0">
        <div className="sticky bottom-0 top-[calc(var(--header-height)+40px)] flex flex-col gap-10">
          <Heading className="items-start" {...heading}>
            <h4>{heading.title}</h4>
          </Heading>
          <div className="flex items-center gap-3 md:order-3">
            <ButtonLink href={cta.primary.href} intent={cta.primary.type} size="lg">
              {cta.primary.label}
            </ButtonLink>
            <ButtonLink href={cta.secondary.href} intent={cta.secondary.type} size="lg">
              {cta.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="w-full flex-1">
        <div className="no-scrollbar flex gap-10 overflow-auto px-6 lg:flex-col lg:px-0">
          {featuresSideBySideList.items.map(({ _title, icon, subtitle }) => (
            <article
              key={_title}
              className="flex w-[280px] shrink-0 flex-col gap-4 rounded-lg border border-border p-4 dark:border-dark-border lg:w-full lg:flex-row lg:p-5"
            >
              <figure className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-tertiary p-3 dark:bg-dark-surface-tertiary">
                <Image
                  alt={icon.alt ?? _title}
                  className="dark:invert"
                  height={18}
                  src={icon.url}
                  width={18}
                />
              </figure>
              <div className="flex flex-col items-start gap-1">
                <h5 className="text-lg font-medium">{_title}</h5>
                <p className="text-pretty text-text-tertiary dark:text-dark-text-tertiary">
                  {subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
