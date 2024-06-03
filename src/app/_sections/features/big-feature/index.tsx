import Image from "next/image";

import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { fragmentOn } from "basehub";
import { headingFragment } from "@/lib/basehub/fragments";

export const bigFeatureFragment = fragmentOn("FeaturesBigImageComponent", {
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
  image: {
    alt: true,
    width: true,
    height: true,
    url: true,
  },
});
type BigFeature = fragmentOn.infer<typeof bigFeatureFragment>;

export function BigFeature({ featuresBigImageList, heading, image }: BigFeature) {
  return (
    <Section container="default">
      <Image
        alt={image.alt ?? heading.title}
        className="block rounded-xl border border-border dark:border-dark-border md:order-3 md:w-full"
        height={image.height}
        src={image.url}
        width={image.width}
      />
      <Heading {...heading}>
        <h4>{heading.title}</h4>
      </Heading>
      <div className="flex flex-col items-start gap-4 md:order-2 md:grid md:grid-cols-3 md:gap-16">
        {featuresBigImageList.items.map(({ _title, description, icon }) => (
          <article key={_title} className="flex flex-col gap-4">
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
              <p className="text-grayscale-500 dark:text-grayscale-500">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
