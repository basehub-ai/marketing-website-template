import Image from "next/image";
import { CheckIcon } from "@radix-ui/react-icons";

import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { fragmentOn } from "basehub";

export const featureCardFragment = fragmentOn("FeaturesCardsListItem", {
  _title: true,
  description: true,
  image: {
    alt: true,
    width: true,
    height: true,
    url: true,
  },
  characteristics: {
    items: { _title: true },
  },
});

export const featureCardsComponent = fragmentOn("FeaturesCardsComponent", {
  heading: {
    subtitle: true,
    tag: true,
    title: true,
  },
  featuresCardsList: {
    items: {
      _title: true,
      description: true,
      image: {
        alt: true,
        width: true,
        height: true,
        url: true,
      },
      characteristics: {
        items: { _title: true },
      },
    },
  },
});

type FeatureCard = fragmentOn.infer<typeof featureCardsComponent>;

export async function FeaturesList({ featuresCardsList, heading }: FeatureCard) {
  return (
    <Section container="default">
      <Heading subtitle={heading.subtitle} tag={heading.tag}>
        <h4>{heading.title}</h4>
      </Heading>
      <div className="flex flex-col gap-6">
        {featuresCardsList.items.map(({ image, ...item }) => (
          <article
            key={item._title}
            className="flex min-h-96 w-full max-w-[380px] flex-col rounded-lg border border-border bg-surface-secondary p-px dark:border-dark-border dark:bg-dark-surface-secondary sm:max-w-full md:w-full md:flex-row md:odd:flex-row-reverse xl:gap-16"
          >
            <figure className="p-2 md:h-auto md:w-[360px] lg:w-[480px] xl:w-[560px]">
              <Image
                alt={image.alt ?? ""}
                className="block aspect-video h-[200px] w-full rounded-lg object-cover md:h-full"
                height={image.height}
                src={image.url}
                width={image.width}
              />
            </figure>
            <div className="flex flex-col gap-8 p-5 pt-6 md:flex-1 md:p-10">
              <div className="flex flex-col items-start gap-2">
                <h5 className="text-2xl font-medium text-text-primary dark:text-dark-text-primary md:text-3xl">
                  {item._title}
                </h5>
                <p className="text-grayscale-600 dark:text-grayscale-400 font-normal md:text-lg">
                  {item.description}
                </p>
              </div>
              <ul className="flex flex-col items-start gap-5 pl-2 md:text-lg">
                {item.characteristics.items.map(({ _title }) => (
                  <li
                    key={_title}
                    className="text-grayscale-600 dark:text-grayscale-400 flex items-center gap-4 font-normal"
                  >
                    <span className="flex size-6 items-center justify-center rounded-full bg-surface-tertiary dark:bg-dark-surface-tertiary">
                      <CheckIcon className="text-grayscale-500 dark:text-grayscale-500" />
                    </span>
                    {_title}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
