import * as React from "react";

import { Section } from "@/common/layout";
import { Pump } from ".basehub/react-pump";
import { ClientForm } from "./client-form";

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
                submissions: {
                  ingestKey: true,
                  schema: true,
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

              <ClientForm
                ingestKey={site.footer.newsletter.submissions.ingestKey}
                schema={site.footer.newsletter.submissions.schema}
              />
            </div>
          </Section>
        );
      }}
    </Pump>
  );
}
