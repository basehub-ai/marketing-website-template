"use client";
import * as React from "react";
import { sendEvent } from "basehub/events";
import { LabeledInput } from "../_components/labeled-input";
import { Field } from "basehub/react-form";
import { LabeledTextarea } from "../_components/labeled-input";
import { Submissions } from ".basehub/schema";

export function DemoForm({
  children,
  ingestKey,
  schema,
}: {
  children: React.ReactNode;
  ingestKey: Submissions["ingestKey"];
  schema: Field[];
}) {
  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      await sendEvent(ingestKey, {
        eMail: String(formData.get("email")),
        firstName: String(formData.get("firstName")),
        lastName: String(formData.get("lastName")),
        message: String(formData.get("message")),
      });
    },
    [ingestKey],
  );

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      {schema.map((field) =>
        field.name === "message" ? (
          <LabeledTextarea
            key={field.id}
            minLength={16}
            rows={8}
            className="max-h-64 min-h-16"
            {...field}
          />
        ) : (
          <LabeledInput key={field.id} {...field} />
        ),
      )}
      {children}
    </form>
  );
}
