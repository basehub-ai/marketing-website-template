import Image from "next/image";

import { fragmentOn } from "basehub";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { headingFragment, optimizedImageFragment } from "@/lib/basehub/fragments";
import { ButtonLink } from "@/common/button";
import { Pump } from "basehub/react-pump";
import clsx from "clsx";

import s from "./hero.module.scss";

export const featureHeroFragment = fragmentOn("FeatureHeroComponent", {
  heroLayout: true,
  heading: headingFragment,
  image: optimizedImageFragment,
  actions: {
    on_ButtonComponent: {
      _id: true,
      href: true,
      label: true,
      type: true,
    },
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
                <ButtonLink key={action._id} href={action.href} intent={action.type} size="lg">
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
                  <ButtonLink key={action._id} href={action.href} intent={action.type} size="lg">
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
                    <ButtonLink key={action._id} href={action.href} intent={action.type} size="lg">
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
    case "gradient": {
      return (
        <Section>
          <div className="z-10 flex flex-col items-center gap-8">
            <Pump
              queries={[
                {
                  site: {
                    settings: {
                      logoLite: {
                        url: true,
                        width: true,
                        height: true,
                        alt: true,
                      },
                    },
                  },
                },
              ]}
            >
              {async ([{ site }]) => {
                "use server";

                return (
                  <Image
                    alt={site.settings.logoLite.alt ?? "Logo"}
                    className="size-20"
                    height={site.settings.logoLite.height}
                    src={site.settings.logoLite.url}
                    width={site.settings.logoLite.width}
                  />
                );
              }}
            </Pump>
            <Heading {...heading}>
              <h4>{heading.title}</h4>
            </Heading>
            <div className="flex gap-3">
              {actions
                ? actions.map((action) => (
                    <ButtonLink key={action._id} href={action.href} intent={action.type} size="lg">
                      {action.label}
                    </ButtonLink>
                  ))
                : null}
            </div>
          </div>
          {/* Gradient */}
          <div
            className={clsx(
              "absolute -top-1/2 left-1/2 z-[0] h-[400px] w-[70vw] -translate-x-1/2 scale-150 rounded-[50%]",
              s.gradient,
            )}
          />
        </Section>
      );
    }
    default: {
      return null;
    }
  }
}
