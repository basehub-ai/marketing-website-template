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
  const items =
    featuresBigImageList.items.length > 0
      ? featuresBigImageList.items
      : [
          {
            _title: "Strategic dependency modeling",
            description:
              "Surface hidden engineering dependencies and avoid costly rework before code is written.",
            icon: { alt: "Dependencies", url: "https://assets.basehub.com/fa068a12/P4yggRHkqB8uRH587STUr/frameicon.svg" },
          },
          {
            _title: "Security-first release checks",
            description:
              "Embed compliance scanning into release workflows and keep your SOC team in sync.",
            icon: { alt: "Security", url: "https://assets.basehub.com/fa068a12/SCkaU2WEu53qSBWsNVQO4/frameicon-1.svg" },
          },
          {
            _title: "Growth-driven execution rhythm",
            description:
              "Plan around outcomes and ship roadmap milestones with predictable throughput.",
            icon: { alt: "Growth", url: "https://assets.basehub.com/fa068a12/WIADTrhMDDCGZUakwbctI/frameicon-2.svg" },
          },
        ];

  return (
    <Section container="default">
      <DarkLightImage
        height={600}
        width={1216}
        {...image}
        className="block rounded-xl border border-border dark:border-dark-border md:order-3 md:w-full"
      />
      <Heading {...heading}>
        <h4>{heading.title || "Operational clarity for teams shipping at scale"}</h4>
      </Heading>
      <div className="flex w-full flex-col items-start gap-4 md:order-2 md:grid md:grid-cols-3 md:gap-16">
        {items.map(({ _title, description, icon }) => (
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
