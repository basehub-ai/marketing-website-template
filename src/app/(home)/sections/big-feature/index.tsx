import Image from "next/image";

import {Heading} from "@/common/heading";
import {Section} from "@/common/layout";
import {Button, ButtonLink} from "@/common/button";

const bigFeature = {
  image: {
    url: "/images/feature-image.png",
    alt: "Feature Image",
    width: 1216,
    height: 600,
  },
  title: "Transformative AI Solutions",
  subtitle: "Experience the future of technology with our AI-powered innovations.",
  tag: "Feature",
  features: [
    {
      _title: "Personalized Recommendations",
      description:
        "Enhance user experiences with tailored recommendations based on behavioral patterns.",
      icon: {
        url: "/icons/double-up-arrow.svg",
        alt: "Icon",
      },
    },
    {
      _title: "Automated Decision Making",
      description:
        "Streamline decision-making processes with AI-driven insights and recommendations.",
      icon: {
        url: "/icons/sand-clock.svg",
        alt: "Icon",
      },
    },
    {
      _title: "Intelligent Automation",
      description: "Automate repetitive tasks and free up valuable time for strategic initiatives.",
      icon: {
        url: "/icons/asterisk.svg",
        alt: "Icon",
      },
    },
  ],
};

export function BigFeature() {
  return (
    <Section container="default">
      <Image
        alt={bigFeature.image.alt}
        className="block rounded-xl border border-border dark:border-dark-border md:order-3 md:w-full"
        height={bigFeature.image.height}
        src={bigFeature.image.url}
        width={bigFeature.image.width}
      />
      <Heading subtitle={bigFeature.subtitle} tag={bigFeature.tag}>
        <h4>{bigFeature.title}</h4>
      </Heading>
      <div className="flex flex-col items-start gap-4 md:order-2 md:grid md:grid-cols-3 md:gap-16">
        {bigFeature.features.map(({_title, description, icon}) => (
          <article key={_title} className="flex flex-col gap-4">
            <figure className="flex size-9 items-center justify-center rounded-full border border-border bg-surface-secondary p-2 dark:border-dark-border dark:bg-dark-surface-secondary">
              <Image alt={icon.alt} className="dark:invert" height={18} src={icon.url} width={18} />
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
