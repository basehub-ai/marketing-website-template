import NextForm from "next/form";
import * as React from "react";
import { Section } from "@/common/layout";
import { Pump } from "basehub/react-pump";
import { Input } from "@/common/input";
import { parseFormData, sendEvent } from "basehub/events";

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

        const emailInput = site.footer.newsletter.submissions.schema.find(
          (field) => field.type === "email",
        );

        return (
          <Section
            className="bg-surface-secondary dark:bg-dark-surface-secondary py-10!"
            container="full"
          >
            <div className="container mx-auto flex flex-col gap-4 px-6 lg:flex-row lg:justify-between">
              <div className="flex flex-1 flex-col items-start gap-1">
                <h5 className="text-xl font-medium lg:text-2xl">{site.footer.newsletter.title}</h5>
                <p className="text text-text-tertiary dark:text-dark-text-tertiary lg:text-lg">
                  {site.footer.newsletter.description}
                </p>
              </div>

              <NextForm
                action={async (data) => {
                  "use server";
                  const parsedData = parseFormData(
                    site.footer.newsletter.submissions.ingestKey,
                    site.footer.newsletter.submissions.schema,
                    data,
                  );
                  if (!parsedData.success) {
                    throw new Error(JSON.stringify(parsedData.errors));
                  }
                  await sendEvent(site.footer.newsletter.submissions.ingestKey, parsedData.data);
                }}
              >
                <Input {...emailInput} />
              </NextForm>
            </div>
          </Section>
        );
      }}
    </Pump>
  );
}
