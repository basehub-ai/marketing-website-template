import Image from "next/image";

import {ButtonLink} from "@/common/button";
import {Heading} from "@/common/heading";
import {Section} from "@/common/layout";

const featuresGrid = {
  title: "Next-Level AI Features",
  subtitle: "Elevate your business with our advanced AI capabilities.",
  tag: "Features",

  cta: {
    _title: "Request Demo",
    url: "/",
    type: "primary",
  },
  secondaryCta: {
    _title: "See More",
    url: "/",
    type: "secondary",
  },
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
    {
      _title: "Real-time Insights",
      description:
        "Gain actionable insights instantly with real-time data analysis and visualization.",
      icon: {
        url: "/icons/star.svg",
        alt: "Icon",
      },
    },
    {
      _title: "Scalable Infrastructure",
      description:
        "Scale your AI solutions effortlessly to accommodate growing data volumes and user demands.",
      icon: {
        url: "/icons/squares-tile.svg",
        alt: "Icon",
      },
    },
    {
      _title: "Seamless Integration",
      description:
        "Integrate our AI solutions seamlessly into your existing systems and workflows.",
      icon: {
        url: "/icons/component.svg",
        alt: "Icon",
      },
    },
  ],
};

export function FeaturesGrid() {
  return (
    <Section>
      <Heading subtitle={featuresGrid.subtitle} tag={featuresGrid.tag}>
        <h4>{featuresGrid.title}</h4>
      </Heading>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {featuresGrid.features.map(({_title, description, icon}) => (
          <article
            key={_title}
            className="flex flex-col gap-4 rounded-lg border border-border p-4 dark:border-dark-border"
          >
            <figure className="flex size-9 items-center justify-center rounded-full border border-border bg-surface-secondary p-2 dark:border-dark-border dark:bg-dark-surface-secondary">
              <Image alt={icon.alt} className="dark:invert" height={18} src={icon.url} width={18} />
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
        <ButtonLink href={featuresGrid.cta.url} intent="primary" size="lg">
          {featuresGrid.cta._title}
        </ButtonLink>
        <ButtonLink href={featuresGrid.secondaryCta.url} intent="secondary" size="lg">
          {featuresGrid.secondaryCta._title}
        </ButtonLink>
      </div>
    </Section>
  );
}
