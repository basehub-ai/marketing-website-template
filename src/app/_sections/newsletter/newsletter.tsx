import * as React from "react";

import { Input } from "@/common/input";
import { Section } from "@/common/layout";
import { Pump } from ".basehub/react-pump";
import { sendEvent } from ".basehub/events";

export function Newsletter() {
  return (
    <Pump
      queries={[
        {
          site: {
            footer: {
              newsletter: {
                title: true,
                description: true,
                form: {
                  ingestKey: true,
                },
              },
            },
          },
        },
      ]}
    >
      {async ([{ site }]) => {
        "use server";

        return (
          <Section
            className="bg-surface-secondary !py-10 dark:bg-dark-surface-secondary"
            container="full"
          >
            <div className="container mx-auto flex flex-col gap-4 px-6 lg:flex-row lg:justify-between">
              <div className="flex flex-1 flex-col items-start gap-1">
                <h5 className="text-xl font-medium lg:text-2xl">{site.footer.newsletter.title}</h5>
                <p className="text text-text-tertiary dark:text-dark-text-tertiary lg:text-lg">
                  {site.footer.newsletter.description}
                </p>
              </div>

              <form
                className="w-full max-w-[400px] flex-shrink-0"
                action={async (formData) => {
                  "use server";

                  const email = formData.get("email");
                  if (typeof email !== "string") {
                    throw new Error("Invalid email");
                  }

                  const res = await sendEvent(site.footer.newsletter.form.ingestKey, {
                    email,
                  });

                  console.log(res);

                  return res;
                }}
              >
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
      }}
    </Pump>
  );
}
