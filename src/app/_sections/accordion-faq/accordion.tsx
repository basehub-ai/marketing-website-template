"use client";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { type Faq } from "../faq";
import { sendEvent } from "basehub/analytics";

export function Accordion({ items }: { items: Faq["questions"]["items"] }) {
  const [activeItems, setActiveItems] = React.useState<string[]>([]);

  return (
    <AccordionPrimitive.Root
      className="flex w-full flex-col items-stretch gap-2 lg:gap-8"
      type="multiple"
      value={activeItems}
      onValueChange={(activeItems) => setActiveItems(activeItems)}
    >
      {items.map((item) => (
        <AccordionItem key={item._title} {...item} isActive={activeItems.includes(item._title)} />
      ))}
    </AccordionPrimitive.Root>
  );
}

function AccordionItem({
  _title,
  answer,
  isActive,
  _analyticsKey,
}: Faq["questions"]["items"][0] & { isActive: boolean }) {
  return (
    <AccordionPrimitive.Item key={_title} className="flex flex-col" value={_title}>
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger
          className="flex w-full items-start gap-3 rounded-md py-2 text-lg font-medium leading-relaxed tracking-tighter outline-none ring-accent-500 focus-visible:ring"
          onClick={() => {
            sendEvent({
              name: "faq_expanded",
              _analyticsKey,
            });
          }}
        >
          {isActive ? (
            <MinusCircledIcon className="my-1.5 size-4 shrink-0" />
          ) : (
            <PlusCircledIcon className="my-1.5 size-4 shrink-0" />
          )}

          <span className="text-start">{_title}</span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="transform overflow-hidden pl-7 leading-relaxed tracking-tight text-text-tertiary data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown dark:text-dark-text-tertiary">
        <div>{answer}</div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}
