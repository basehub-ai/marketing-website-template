import Image from "next/image";

import { fragmentOn } from "basehub";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { headingFragment, optimizedImageFragment } from "@/lib/basehub/fragments";
import { ButtonLink } from "@/common/button";

export const featureHeroFragment = fragmentOn("FeatureHeroComponent", {
  heroLayout: true,
  heading: headingFragment,
  image: optimizedImageFragment,
  actions: {
    _id: true,
    href: true,
    label: true,
    type: true,
  },
});

type FeatureHero = fragmentOn.infer<typeof featureHeroFragment>;

export default function FeatureHero({ heading, heroLayout, image, actions }: FeatureHero) {
  switch (heroLayout) {
    case "v1": {
      return (
        <Section>
          <div className="flex flex-col gap-6">
            <Heading {...heading}>
              <h4>{heading.title}</h4>
            </Heading>
            <div className="flex justify-center gap-3">
              {actions?.map((action) => (
                <ButtonLink
                  key={action._id}
                  href={action.href ?? "#"}
                  intent={action.type}
                  size="lg"
                >
                  {action.label}
                </ButtonLink>
              ))}
            </div>
          </div>
          <Image
            alt={image.alt ?? heading.title}
            className="block rounded-lg border border-border dark:border-dark-border"
            height={image.height}
            src={image.url}
            width={image.width}
          />
        </Section>
      );
    }
    case "v2": {
      return (
        <Section>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col gap-6 lg:pr-16">
              <Heading {...heading} align="left">
                <h4>{heading.title}</h4>
              </Heading>
              <div className="flex justify-start gap-3">
                {actions?.map((action) => (
                  <ButtonLink
                    key={action._id}
                    href={action.href ?? "#"}
                    intent={action.type}
                    size="lg"
                  >
                    {action.label}
                  </ButtonLink>
                ))}
              </div>
            </div>
            <Image
              alt={image.alt ?? heading.title}
              className="block flex-1 rounded-lg border border-border dark:border-dark-border lg:w-1/2"
              height={image.height}
              src={image.url}
              width={image.width}
            />
          </div>
        </Section>
      );
    }
    case "full image": {
      return (
        <>
          <Image
            alt={image.alt ?? heading.title}
            className="block max-h-[560px] border-y border-t-0 border-border object-cover dark:border-dark-border"
            height={image.height}
            src={image.url}
            width={image.width}
          />
          <Section>
            <div className="flex items-center justify-between self-stretch ">
              <Heading {...heading} align="left">
                <h4>{heading.title}</h4>
              </Heading>
              {actions && actions.length > 0 ? (
                <div className="flex gap-3">
                  {actions.map((action) => (
                    <ButtonLink
                      key={action._id}
                      href={action.href ?? "#"}
                      intent={action.type}
                      size="lg"
                    >
                      {action.label}
                    </ButtonLink>
                  ))}
                </div>
              ) : null}
            </div>
          </Section>
        </>
      );
    }
    default: {
      return null;
    }
  }
}
