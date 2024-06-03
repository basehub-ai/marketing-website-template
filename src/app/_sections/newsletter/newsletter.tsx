"use client";
import React from "react";

import { Input } from "@/common/input";
import { Section } from "@/common/layout";
interface NewsletterFormState {
  isSubscribed: boolean;
  isSubmitting: boolean;
  error: null | string;
}

export function Newsletter() {
  const [formState, setFormState] = React.useState<NewsletterFormState>({
    isSubscribed: false,
    isSubmitting: false,
    error: null,
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setFormState({ ...formState, isSubmitting: true, error: null });
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    if (!email) {
      return setFormState({ isSubscribed: false, isSubmitting: false, error: "Email is required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setFormState({ isSubscribed: false, isSubmitting: false, error: "Invalid email" });
    }
    // Integrate with your email marketing platform here
    // e.g resend

    new Promise((resolve) =>
      setTimeout(() => {
        setFormState({ isSubscribed: true, isSubmitting: false, error: null });
        resolve(true);
      }, 200),
    );
  };

  return (
    <Section
      className="bg-surface-secondary p-6 pt-4 dark:bg-dark-surface-secondary"
      container="full"
    >
      <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between lg:px-6">
        <div className="flex flex-col items-start gap-2">
          <h5 className="text-xl font-medium lg:text-2xl">Stay Ahead of the AI Curve</h5>
          <p className="text-grayscale-500 dark:text-grayscale-500">
            Join our newsletter for exclusive insights and updates on the latest AI trends.
          </p>
        </div>

        <form className="w-full max-w-[400px] flex-1" onSubmit={handleSubmit}>
          <Input
            required
            buttonContent={formState.isSubscribed ? "Submitted" : "Subscribe"}
            disabled={formState.isSubscribed}
            error={formState.error}
            name="email"
            placeholder="Enter your email"
            type="email"
          />
        </form>
      </div>
    </Section>
  );
}
