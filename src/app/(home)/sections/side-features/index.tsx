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
        url: "/icons/mail.svg",
        alt: "Icon",
      },
    },
    {
      _title: "Automated Decision Making",
      description:
        "Streamline decision-making processes with AI-driven insights and recommendations.",
      icon: {
        url: "/icons/zap.svg",
        alt: "Icon",
      },
    },
    {
      _title: "Intelligent Automation",
      description: "Automate repetitive tasks and free up valuable time for strategic initiatives.",
      icon: {
        url: "/icons/bar-chart-2.svg",
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

export function SideFeatures() {
  return (
    <Section className="gap-8 lg:!flex-row lg:gap-24 lg:p-28 xl:gap-32" container="full">
      <div className="flex flex-1 shrink flex-col gap-10 self-stretch px-6 lg:px-0">
        <Heading
          align="left"
          className="items-start"
          subtitle={featuresGrid.subtitle}
          tag={featuresGrid.tag}
        >
          <h4>{featuresGrid.title}</h4>
        </Heading>
        <div className="flex items-center gap-3 md:order-3">
          <ButtonLink href={featuresGrid.cta.url} intent="primary" size="lg">
            {featuresGrid.cta._title}
          </ButtonLink>
          <ButtonLink href={featuresGrid.secondaryCta.url} intent="secondary" size="lg">
            {featuresGrid.secondaryCta._title}
          </ButtonLink>
        </div>
      </div>
      <div className="w-full flex-1">
        <div className="no-scrollbar flex gap-10 overflow-auto px-6 lg:flex-col lg:px-0">
          {featuresGrid.features.map(({_title, description, icon}) => (
            <article
              key={_title}
              className="flex w-[280px] shrink-0 flex-col gap-4 rounded-lg border border-border p-4 dark:border-dark-border lg:w-full lg:flex-row lg:p-5"
            >
              <figure className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-tertiary p-3 dark:bg-dark-surface-tertiary">
                <Image
                  alt={icon.alt}
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
      </div>
    </Section>
  );
}
