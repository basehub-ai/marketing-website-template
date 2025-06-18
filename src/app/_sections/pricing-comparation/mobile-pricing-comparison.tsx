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
              "text-text-secondary dark:text-dark-text-secondary relative flex w-full items-center justify-between rounded-sm px-4 py-2 pr-10",
              "border-border bg-surface-secondary border",
              "dark:border-dark-border dark:bg-dark-surface-secondary",
            )}
          >
            <SelectValue placeholder={selectedPlan?._title ?? "Select a plan"} />
            <span className="text-text-primary dark:text-dark-text-primary">
              {selectedPlan?.price}
            </span>
            <SelectIcon className="absolute top-1/2 right-2 size-5 -translate-y-1/2">
              <CaretSortIcon />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectContent
              className={clsx(
                "border-border bg-surface-secondary z-100 w-full flex-col overflow-hidden rounded-sm border p-0.5",
                "dark:border-dark-border dark:bg-dark-surface-secondary",
              )}
              side="bottom"
            >
              <SelectViewport className="flex flex-col gap-0.5 p-1">
                {plans.map((plan) => (
                  <SelectItem
                    key={plan._id}
                    className={clsx(
                      "group text-text-secondary dark:text-dark-text-secondary relative flex w-full flex-1 items-center justify-between rounded-sm px-4 py-2",
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
                      <span className="group-radix-state-active:text-text-primary dark:group-radix-state-active:text-dark-text-primary">
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
        className="group bg-surface-primary dark:bg-dark-surface-primary flex w-full flex-col"
        defaultValue={[categories.items[0]?._id ?? ""]}
        type="multiple"
      >
        {categories.items.map((category) => (
          <AccordionItem
            key={category._id}
            className="group bg-surface-primary dark:bg-dark-surface-primary w-full"
            value={category._id}
          >
            <AccordionTrigger className="flex w-full items-center justify-between px-3 pt-6 pb-1">
              <p className="flex-1 text-start font-medium">{category._title}</p>
              <span className="shrink-0">
                <ChevronDownIcon
                  className={clsx(
                    "group-radix-state-open:rotate-180 transform transition-transform",
                  )}
                />
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <table className="group-radix-state-closed:scale-y-0 w-full">
                <tbody className="grid grid-cols-[min-content_auto] gap-x-6">
                  {category.features.items.map((feature) => (
                    <tr
                      key={feature._id}
                      className="border-border dark:border-dark-border col-span-2 grid grid-cols-subgrid place-content-end justify-start border-b px-3 py-3.5"
                    >
                      <th className="flex w-auto items-center gap-1 place-self-start text-sm font-normal text-nowrap">
                        <p>{feature._title}</p>
                        {feature.tooltip ? (
                          <SimpleTooltip content={feature.tooltip}>
                            <span className="text-text-tertiary dark:text-dark-text-tertiary ml-1">
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
    <td className="text-text-secondary dark:text-dark-text-secondary flex flex-1 items-center justify-end text-sm font-normal">
      {value.value?.__typename === "BooleanComponent" ? (
        value.value.boolean ? (
          <span className="bg-success/10 flex items-center justify-center rounded-full p-1.5">
            <CheckIcon className="text-success size-5" />
          </span>
        ) : (
          <span className="text-text-tertiary/50 dark:text-dark-text-tertiary/50">&mdash;</span>
        )
      ) : value.value?.__typename === "CustomTextComponent" ? (
        <span className="text-text-secondary dark:text-dark-text-secondary text-right">
          {value.value.text}
        </span>
      ) : (
        <span className="text-text-secondary dark:text-dark-text-secondary">{value.value}</span>
      )}
    </td>
  );
}
