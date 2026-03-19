import { BaseHubImage } from "basehub/next-image";

import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { fragmentOn } from "basehub";
import { buttonFragment, headingFragment } from "@/lib/basehub/fragments";
import { TrackedButtonLink } from "@/app/_components/tracked_button";
import { GeneralEvents } from "@/../basehub-types";

export const featuresGridFragment = fragmentOn("FeaturesGridComponent", {
  _analyticsKey: true,
  featuresGridList: {
    items: {
      _id: true,
      _title: true,
      description: true,
      icon: {
        alt: true,
        url: true,
      },
    },
  },
  heading: headingFragment,
  actions: buttonFragment,
});

type FeaturesGrid = fragmentOn.infer<typeof featuresGridFragment>;

export function FeaturesGrid({
  heading,
  featuresGridList,
  actions,
  eventsKey,
}: FeaturesGrid & { eventsKey: GeneralEvents["ingestKey"] }) {
  const features =
    featuresGridList.items.length > 0
      ? featuresGridList.items
      : [
          {
            _id: "prod-ops",
            _title: "Integrated Product Ops",
            description:
              "Connect planning, engineering, and growth with AI-powered project orchestration and reliable delivery dashboards.",
            icon: { alt: "Product ops", url: "https://assets.basehub.com/fa068a12/P4yggRHkqB8uRH587STUr/frameicon.svg" },
          },
          {
            _id: "risk-shadow",
            _title: "Reduce engineering risk",
            description:
              "Model dependencies and compliance guardrails so your team can ship quickly without technical or security surprises.",
            icon: { alt: "Risk management", url: "https://assets.basehub.com/fa068a12/SCkaU2WEu53qSBWsNVQO4/frameicon-1.svg" },
          },
          {
            _id: "go-to-market",
            _title: "Accelerated GTM execution",
            description:
              "Keep product launches aligned with growth goals by synchronizing user signals, roadmap outcomes, and execution rhythm.",
            icon: { alt: "GTM", url: "https://assets.basehub.com/fa068a12/WIADTrhMDDCGZUakwbctI/frameicon-2.svg" },
          },
        ];

  return (
    <Section>
      <Heading {...heading}>
        <h4>{heading.title || "Why high-growth teams choose SuprBuild"}</h4>
      </Heading>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {features.map(({ _id, _title, description, icon }) => (
          <article
            key={_id}
            className="border-border dark:border-dark-border flex flex-col gap-4 rounded-lg border p-4 [box-shadow:_70px_-20px_130px_0px_rgba(255,255,255,0.05)_inset] dark:[box-shadow:_70px_-20px_130px_0px_rgba(255,255,255,0.05)_inset]"
          >
            <figure className="border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary flex size-9 items-center justify-center rounded-full border p-2">
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
              <p className="text-text-secondary dark:text-dark-text-secondary text-pretty">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 md:order-3">
        {actions?.map((action) => (
          <TrackedButtonLink
            key={action._id}
            analyticsKey={eventsKey}
            href={action.href}
            intent={action.type}
            name="cta_click"
            size="lg"
          >
            {action.label}
          </TrackedButtonLink>
        ))}
      </div>
    </Section>
  );
}
