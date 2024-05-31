import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";

import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { fragmentOn, isBooleanComponent, isCustomTextComponent } from ".basehub/schema";
import { headingFragment } from "@/lib/basehub/fragments";

export const pricingTableFragment = fragmentOn("PricingTableComponent", {
  heading: headingFragment,
  categories: {
    items: {
      _id: true,
      _title: true,
      tooltip: true,
      features: {
        items: {
          _id: true,
          _title: true,
          values: {
            items: {
              _id: true,
              plan: {
                _id: true,
                _title: true,
                price: true,
                isMostPopular: true,
              },
              value: {
                __typename: true,
                on_BooleanComponent: {
                  _id: true,
                  boolean: true,
                },
                on_CustomTextComponent: {
                  _id: true,
                  text: true,
                },
              },
            },
          },
        },
      },
    },
  },
});

type PricingTable = fragmentOn.infer<typeof pricingTableFragment>;

export function PricingTable(pricing: PricingTable) {
  const { heading, categories } = pricing;
  const plans = new Map<
    string,
    PricingTable["categories"]["items"][0]["features"]["items"][0]["values"]["items"][0]["plan"]
  >();

  categories.items.forEach((category) => {
    category.features.items.forEach((feature) => {
      feature.values.items.forEach((value) => {
        plans.set(value.plan._title, value.plan);
      });
    });
  });

  return (
    <Section className="xl:max-w-screen-xl" id="pricing">
      <Heading {...heading}>
        <h4>{heading.title}</h4>
      </Heading>
      <div className="flex flex-col gap-5 self-stretch lg:flex-row" />
      <table className="w-full table-auto">
        <tr>
          <th />
          {Array.from(plans.values()).map((plan) => (
            <th key={plan._id} className="flex flex-1 flex-col items-center">
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary md:text-base">
                {plan._title}
              </p>
              <p>{plan.price}</p>
              <ButtonLink href="#" intent={plan.isMostPopular ? "primary" : "secondary"}>
                Get started
              </ButtonLink>
            </th>
          ))}
        </tr>
        {categories.items.map((category) => (
          <React.Fragment key={category._id}>
            <tr>
              <th colSpan={plans.size}>
                <p>{category._title}</p>
              </th>
            </tr>
            <tr key={category._id}>
              <td>{category._title}</td>
              {Array.from(plans.values()).map((plan) => {
                const value = category.features.items
                  .flatMap((feature) => feature.values.items)
                  .find((value) => value.plan._id === plan._id);

                return (
                  <td key={plan._id}>
                    {value ? (
                      <div>
                        {isBooleanComponent(value.value) ? (
                          value.value.boolean ? (
                            <CheckIcon />
                          ) : (
                            <span>&mdash;</span>
                          )
                        ) : isCustomTextComponent(value.value) ? (
                          <p>{value.value.text}</p>
                        ) : null}
                      </div>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          </React.Fragment>
        ))}
      </table>
      {categories.items.map((category) => (
        <div key={category._id} className="flex flex-col items-start self-stretch">
          <p>{category._title}</p>
          <div className="flex flex-col items-start gap-2">
            {category.features.items.map((feature) => (
              <div key={feature._id} className="flex gap-4">
                <p>{feature._title}</p>
                <div className="flex gap-2">
                  {feature.values.items.map((value) => (
                    <div key={value._id}>
                      {isBooleanComponent(value.value) ? (
                        value.value.boolean ? (
                          <CheckIcon />
                        ) : (
                          <span>&mdash;</span>
                        )
                      ) : isCustomTextComponent(value.value) ? (
                        <p>{value.value.text}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
}
