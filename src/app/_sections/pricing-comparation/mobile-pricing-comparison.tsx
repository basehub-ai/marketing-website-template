"use client";
import clsx from "clsx";
import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemIndicator,
  SelectPortal,
  SelectValue,
  SelectIcon,
  SelectItemText,
} from "@radix-ui/react-select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

import { isBooleanComponent, isCustomTextComponent } from ".basehub/schema";
import { SimpleTooltip } from "@/common/tooltip";

import { type PlanFragment, type PricingTableProps } from ".";

export function MobilePricingComparison({
  categories,
  plans,
}: Pick<PricingTableProps, "categories"> & {
  plans: PlanFragment[];
}) {
  const [activePlan, setActivePlan] = React.useState<string>(plans[0]?._id ?? "");

  const selectedPlan = React.useMemo(
    () => plans.find((plan) => plan._id === activePlan),
    [activePlan, plans],
  );

  return (
    <div className="relative flex flex-col self-stretch lg:hidden">
      <div className="relative">
        <Select autoComplete="false" value={activePlan} onValueChange={setActivePlan}>
          <SelectTrigger
            aria-label="Plan Data selector"
            className={clsx(
              "relative flex w-full items-center justify-between rounded px-4 py-2 pr-10 text-text-secondary dark:text-dark-text-secondary",
              "border border-border bg-surface-secondary",
              "dark:border-dark-border dark:bg-dark-surface-secondary",
            )}
          >
            <SelectValue placeholder={selectedPlan?._title ?? "Select a plan"} />
            <span className="text-text-primary dark:text-dark-text-primary">
              {selectedPlan?.price}
            </span>
            <SelectIcon className="absolute right-2 top-1/2 size-5 -translate-y-1/2">
              <CaretSortIcon />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectContent
              className={clsx(
                "z-[100] w-full flex-col overflow-hidden rounded border border-border bg-surface-secondary p-0.5",
                "dark:border-dark-border dark:bg-dark-surface-secondary",
              )}
              side="bottom"
            >
              <SelectViewport className="flex flex-col gap-0.5 p-1">
                {plans.map((plan) => (
                  <SelectItem
                    key={plan._id}
                    className={clsx(
                      "group relative flex w-full flex-1 items-center justify-between rounded px-4 py-2 text-text-secondary dark:text-dark-text-secondary",
                      "hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary",
                      {
                        "bg-surface-tertiary text-text-primary dark:bg-dark-surface-tertiary dark:text-dark-text-primary":
                          activePlan === plan._id,
                      },
                    )}
                    value={plan._id}
                  >
                    <SelectItemText className="flex-1">{plan._title}</SelectItemText>
                    <div className="flex items-center gap-2">
                      <span className="group-radix-state-active:text-text-primary group-radix-state-active:dark:text-dark-text-primary">
                        {plan.price}
                      </span>
                      <div className="flex size-6 items-center justify-center">
                        <SelectItemIndicator>
                          <CheckIcon />
                        </SelectItemIndicator>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </Select>
      </div>
      <Accordion
        className="group flex w-full flex-col bg-surface-primary dark:bg-dark-surface-primary"
        defaultValue={[categories.items[0]?._id ?? ""]}
        type="multiple"
      >
        {categories.items.map((category) => (
          <AccordionItem
            key={category._id}
            className="group w-full bg-surface-primary dark:bg-dark-surface-primary"
            value={category._id}
          >
            <AccordionTrigger className="flex w-full items-center justify-between px-3 pb-1 pt-6">
              <p className="flex-1 text-start font-medium">{category._title}</p>
              <span className="shrink-0">
                <ChevronDownIcon
                  className={clsx(
                    "transform transition-transform group-radix-state-open:rotate-180",
                  )}
                />
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <table className="w-full group-radix-state-closed:scale-y-0">
                <tbody className="grid grid-cols-[min-content_auto] gap-x-6">
                  {category.features.items.map((feature) => (
                    <tr
                      key={feature._id}
                      className="col-span-2 grid grid-cols-subgrid place-content-end justify-start border-b border-border px-3 py-3.5 dark:border-dark-border"
                    >
                      <th className="flex w-auto items-center gap-1 place-self-start text-nowrap text-sm font-normal">
                        <p>{feature._title}</p>
                        {feature.tooltip ? (
                          <SimpleTooltip content={feature.tooltip}>
                            <span className="ml-1 text-text-tertiary dark:text-dark-text-tertiary">
                              <QuestionMarkCircledIcon className="size-4" />
                            </span>
                          </SimpleTooltip>
                        ) : null}
                      </th>
                      <FeatureValue activePlan={activePlan} feature={feature} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function FeatureValue({
  feature,
  activePlan,
}: {
  feature: PricingTableProps["categories"]["items"][number]["features"]["items"][number];
  activePlan: string;
}) {
  const value = feature.values.items.find((value) => value.plan._id === activePlan);

  if (!value) return null;

  return (
    <td className="flex flex-1 items-center justify-end text-sm font-normal text-text-secondary dark:text-dark-text-secondary">
      {isBooleanComponent(value.value) ? (
        value.value.boolean ? (
          <span className="flex items-center justify-center rounded-full bg-success/10 p-1.5">
            <CheckIcon className="size-5 text-success" />
          </span>
        ) : (
          <span className="text-text-tertiary/50 dark:text-dark-text-tertiary/50">&mdash;</span>
        )
      ) : isCustomTextComponent(value.value) ? (
        <span className="text-right text-text-secondary dark:text-dark-text-secondary">
          {value.value.text}
        </span>
      ) : (
        <span className="text-text-secondary dark:text-dark-text-secondary">{value.value}</span>
      )}
    </td>
  );
}
