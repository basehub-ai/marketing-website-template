import { CheckIcon } from "@radix-ui/react-icons";
import { type SVGProps } from "react";
import clsx from "clsx";

import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { fragmentOn } from "basehub";
import { headingFragment } from "@/lib/basehub/fragments";

import s from "./pricing.module.scss";

export const pricingPlanItemFragment = fragmentOn("PlanComponent", {
  plan: {
    _id: true,
    _title: true,
    price: true,
    billed: true,
    isMostPopular: true,
    list: {
      items: {
        _title: true,
        _id: true,
      },
    },
  },
});

export const pricingFragment = fragmentOn("PricingComponent", {
  heading: headingFragment,
  plans: {
    items: pricingPlanItemFragment,
  },
});

type Pricing = fragmentOn.infer<typeof pricingFragment>;

export function Pricing(pricing: Pricing) {
  return (
    <Section className="xl:max-w-screen-xl" id="pricing">
      <Heading {...pricing.heading}>
        <h4>{pricing.heading.title}</h4>
      </Heading>
      <div className="flex flex-col gap-5 self-stretch lg:flex-row">
        {pricing.plans.items.map(({ plan }) => (
          <PricingCard key={plan._title} {...plan} />
        ))}
      </div>
    </Section>
  );
}

type PricingPlanItem = fragmentOn.infer<typeof pricingPlanItemFragment>;

function PricingCard(item: PricingPlanItem["plan"]) {
  return (
    <article
      key={item._title}
      className={clsx(
        "relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-border dark:border-dark-border",
        s.pricingCard,
      )}
    >
      <header className="flex flex-col gap-4 px-8 pb-0 pt-10">
        {item.isMostPopular ? (
          <span className="bg-primary absolute left-1/2 top-4 -translate-x-1/2 text-center text-xs font-medium text-accent-500 lg:text-sm">
            Most popular
          </span>
        ) : null}
        <span className="text-center text-3xl font-medium lg:text-4xl">{item.price}</span>
        <div className="flex flex-col">
          <h5 className="text-center text-lg font-medium lg:text-xl">{item._title}</h5>
          <p className="text-center text-sm text-text-tertiary dark:text-dark-text-tertiary lg:text-base">
            {item.billed}
          </p>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-6 !pb-12 lg:p-8">
        <ul className="flex flex-col gap-4">
          {item.list.items.map((feature) => (
            <li
              key={feature._title}
              className="flex items-start gap-3 text-sm text-text-secondary dark:text-dark-text-secondary lg:text-base"
            >
              <CheckIcon className="mt-0.5 size-4 shrink-0 lg:size-5" />
              <span>{feature._title}</span>
            </li>
          ))}
        </ul>
      </div>
      <footer className="relative flex w-full items-center self-stretch p-8 pt-0">
        {item.isMostPopular ? (
          <Shadow className="pointer-events-none absolute left-0 top-0 h-full w-full origin-bottom scale-[2.0] text-accent-500" />
        ) : null}
        <ButtonLink
          className="z-10 w-full"
          href="/sign-up"
          intent={item.isMostPopular ? "primary" : "secondary"}
          size="lg"
        >
          Get started
        </ButtonLink>
      </footer>
    </article>
  );
}

function Shadow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 312 175" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g filter="url(#filter0_f_6956_27669)">
        <path
          d="M-41 398C-41 371.998 -35.9174 346.251 -26.0424 322.229C-16.1673 298.206 -1.69321 276.379 16.5535 257.993C34.8002 239.607 56.4622 225.022 80.3027 215.072C104.143 205.121 129.695 200 155.5 200C181.305 200 206.857 205.121 230.697 215.072C254.538 225.022 276.2 239.607 294.446 257.993C312.693 276.379 327.167 298.206 337.042 322.229C346.917 346.251 352 371.998 352 398L-41 398Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="598"
          id="filter0_f_6956_27669"
          width="793"
          x="-241"
          y="0"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur_6956_27669" stdDeviation="100" />
        </filter>
      </defs>
    </svg>
  );
}
