import { BaseHubImage } from "basehub/next-image";

import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { fragmentOn } from "basehub";
import { darkLightImageFragment, headingFragment } from "@/lib/basehub/fragments";
import { DarkLightImage } from "@/common/dark-light-image";

export const bigFeatureFragment = fragmentOn("FeaturesBigImageComponent", {
  _analyticsKey: true,
  featuresBigImageList: {
    items: {
      _title: true,
      description: true,
      icon: {
        alt: true,
        url: true,
      },
    },
  },
  heading: headingFragment,
  image: darkLightImageFragment,
});

type BigFeature = fragmentOn.infer<typeof bigFeatureFragment>;

export function BigFeature({ featuresBigImageList, heading, image }: BigFeature) {
  return (
    <Section container="default">
      <DarkLightImage
        height={600}
        width={1216}
        {...image}
        className="block rounded-xl border border-border dark:border-dark-border md:order-3 md:w-full"
      />
      <Heading {...heading}>
        <h4>{heading.title}</h4>
      </Heading>
      <div className="flex w-full flex-col items-start gap-4 md:order-2 md:grid md:grid-cols-3 md:gap-16">
        {featuresBigImageList.items.map(({ _title, description, icon }) => (
          <article key={_title} className="flex flex-col gap-4">
            <figure className="flex size-9 items-center justify-center rounded-full border border-border bg-surface-secondary p-2 dark:border-dark-border dark:bg-dark-surface-secondary">
              <BaseHubImage
                alt={icon.alt ?? _title}
                className="dark:invert"
                height={18}
                src={icon.url}
                width={18}
              />
            </figure>
            <div className="flex flex-col items-start gap-1">
              <h5 className="text-lg font-medium">{_title}</h5>
              <p className="text-text-tertiary dark:text-dark-text-tertiary">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
