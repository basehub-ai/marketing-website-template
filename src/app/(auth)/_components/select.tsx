"use client";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";

import React from "react";

export function Selector({
  options,
  ...props
}: {
  options: { label: string; value: string }[];
} & Select.SelectProps) {
  return (
    <Select.Root {...props}>
      <Select.Trigger className="group flex items-center justify-between rounded-md border border-border bg-surface-tertiary py-2 pl-3 pr-3.5 text-sm placeholder:text-sm placeholder:text-text-tertiary radix-placeholder:text-text-tertiary dark:border-dark-border dark:bg-dark-surface-tertiary dark:placeholder:text-dark-text-tertiary dark:radix-placeholder:text-dark-text-tertiary">
        <Select.Value className="" placeholder="How did you hear about us?" />
        <Select.SelectIcon asChild>
          <ChevronDownIcon />
        </Select.SelectIcon>
      </Select.Trigger>

      <Select.Content
        className="max-h-[--radix-select-content-available-height] w-[--radix-select-trigger-width] overflow-hidden rounded-lg bg-surface-tertiary dark:bg-dark-surface-tertiary"
        position="popper"
        sideOffset={5}
      >
        {options.map((option) => (
          <Select.Item
            key={option.value}
            className="flex items-center px-2.5 py-2 text-text-tertiary !outline-none hover:bg-surface-secondary/50 radix-state-checked:text-text-primary dark:text-dark-text-tertiary dark:hover:bg-dark-surface-secondary/50 dark:radix-state-checked:text-dark-text-primary"
            value={option.value}
          >
            <div className="mr-1.5 size-4 rounded-full">
              <Select.ItemIndicator>
                <CheckIcon />
              </Select.ItemIndicator>
            </div>
            <Select.ItemText className="">{option.label}</Select.ItemText>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
