"use client";
import React from "react";

import { Input } from "@/common/input";
import { Section } from "@/common/layout";

export function Newsletter() {
  return (
    <Section
      className="bg-surface-secondary !py-10 dark:bg-dark-surface-secondary"
      container="full"
    >
      <div className="container mx-auto flex flex-col gap-4 px-6 lg:flex-row lg:justify-between">
        <div className="flex flex-col items-start gap-1">
          <h5 className="text-xl font-medium lg:text-2xl">Stay Ahead of the AI Curve</h5>
          <p className="text text-text-tertiary dark:text-dark-text-tertiary lg:text-lg">
            Join our newsletter for exclusive insights and updates on the latest AI trends.
          </p>
        </div>

        <form className="w-full max-w-[400px] flex-1">
          <Input
            required
            buttonContent="Subscribe"
            name="email"
            placeholder="Enter your email"
            type="email"
          />
        </form>
      </div>
    </Section>
  );
}
