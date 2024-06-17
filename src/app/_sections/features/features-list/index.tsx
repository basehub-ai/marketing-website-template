import { CheckIcon } from "@radix-ui/react-icons";

import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { fragmentOn } from "basehub";
import { darkLightImageFragment } from "@/lib/basehub/fragments";
import { DarkLightImage } from "@/common/dark-light-image";

export const featureCardFragment = fragmentOn("FeaturesCardsListItem", {
  _title: true,
  description: true,
  image: darkLightImageFragment,
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
    items: featureCardFragment,
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
              <DarkLightImage
                {...image}
                className="block aspect-video h-[200px] w-full rounded-lg border border-border object-cover dark:border-dark-border md:h-full"
                height={374}
                width={560}
              />
            </figure>
            <div className="flex flex-col gap-8 p-5 pt-6 md:flex-1 md:p-10">
              <div className="flex flex-col items-start gap-2">
                <h5 className="text-2xl font-medium text-text-primary dark:text-dark-text-primary md:text-3xl">
                  {item._title}
                </h5>
                <p className="font-normal text-text-secondary dark:text-dark-text-secondary md:text-lg">
                  {item.description}
                </p>
              </div>
              <ul className="flex flex-col items-start gap-3 pl-2 md:text-lg">
                {item.characteristics.items.map(({ _title }) => (
                  <li
                    key={_title}
                    className="flex items-center gap-4 font-normal text-text-secondary dark:text-dark-text-secondary"
                  >
                    <span className="flex size-6 items-center justify-center rounded-full bg-surface-tertiary dark:bg-dark-surface-tertiary">
                      <CheckIcon className="text-text-tertiary dark:text-dark-text-tertiary" />
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
