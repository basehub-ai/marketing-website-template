import { fragmentOn } from "basehub";
import { headingFragment } from "@/lib/basehub/fragments";

export const planFragment = fragmentOn("PricingPlanComponent", {
  _id: true,
  _title: true,
  price: true,
  isMostPopular: true,
});

export const valueFragment = fragmentOn("ValueComponent", {
  _id: true,
  plan: planFragment,
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
});

export const pricingTableFragment = fragmentOn("PricingTableComponent", {
  heading: headingFragment,
  categories: {
    items: {
      _id: true,
      _title: true,
      features: {
        items: {
          _id: true,
          _title: true,
          tooltip: true,
          values: {
            items: valueFragment,
          },
        },
      },
    },
  },
});
