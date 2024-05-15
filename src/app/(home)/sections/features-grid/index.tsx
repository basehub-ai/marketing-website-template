import Image from "next/image";

import {ButtonLink} from "@/common/button";
import {Heading} from "@/common/heading";
import {Section} from "@/common/layout";
import {fragmentOn} from ".basehub/schema";

export const featuresGridFragment = fragmentOn("FeaturesGridComponent", {
  featuresGridList: {
    items: {
      _title: true,
      description: true,
      icon: {
        alt: true,
        url: true,
      },
    },
  },
  heading: {
    tag: true,
    subtitle: true,
    title: true,
  },
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
});

type FeaturesGrid = fragmentOn.infer<typeof featuresGridFragment>;

export function FeaturesGrid({heading, featuresGridList, primary, secondary}: FeaturesGrid) {
  return (
    <Section>
      <Heading subtitle={heading.subtitle} tag={heading.tag}>
        <h4>{heading.title}</h4>
      </Heading>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {featuresGridList.items.map(({_title, description, icon}) => (
          <article
            key={_title}
            className="flex flex-col gap-4 rounded-lg border border-border p-4 dark:border-dark-border"
          >
            <figure className="flex size-9 items-center justify-center rounded-full border border-border bg-surface-secondary p-2 dark:border-dark-border dark:bg-dark-surface-secondary">
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
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 md:order-3">
        <ButtonLink href={primary.href!} intent={primary.type} size="lg">
          {primary.label}
        </ButtonLink>
        <ButtonLink href={secondary.href!} intent={secondary.type} size="lg">
          {secondary.label}
        </ButtonLink>
      </div>
    </Section>
  );
}
