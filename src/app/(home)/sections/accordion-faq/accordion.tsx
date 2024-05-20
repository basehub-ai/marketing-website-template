"use client";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import React from "react";

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [activeItems, setActiveItems] = React.useState<string[]>([]);

  return (
    <AccordionPrimitive.Root
      className="flex w-full flex-col items-stretch gap-4 lg:gap-8"
      type="multiple"
      value={activeItems}
      onValueChange={(activeItems) => setActiveItems(activeItems)}
    >
      {items.map(({ question, answer }) => (
        <AccordionItem
          key={question}
          answer={answer}
          isActive={activeItems.includes(question)}
          question={question}
        />
      ))}
    </AccordionPrimitive.Root>
  );
}

function AccordionItem({
  question,
  answer,
  isActive,
}: {
  question: string;
  answer: string;
  isActive: boolean;
}) {
  return (
    <AccordionPrimitive.Item key={question} className="flex flex-col" value={question}>
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger className="flex cursor-default items-start gap-3">
          {isActive ? (
            <MinusCircledIcon className="my-1 size-4 shrink-0" />
          ) : (
            <PlusCircledIcon className="my-1 size-4 shrink-0" />
          )}

          <span className="text-start">{question}</span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="transform overflow-hidden pl-7 text-text-tertiary data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown dark:text-dark-text-tertiary">
        <p className="pt-4">{answer}</p>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}
