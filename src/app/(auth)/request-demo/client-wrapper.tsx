"use client";
import { LabeledInput } from "../_components/labeled-input";
import { unstable_Form as Form } from "basehub/react-form";
import { Field } from "basehub/react-form";
import { LabeledTextarea } from "../_components/labeled-input";

export function DemoForm({
  children,
  ingestKey,
  schema,
}: {
  children: React.ReactNode;
  ingestKey: string;
  schema: Field[];
}) {
  return (
    <Form
      className="flex flex-col gap-3"
      schema={schema}
      action={{
        type: "send",
        ingestKey,
      }}
      components={{
        text: (props) =>
          props.name === "message" ? (
            <LabeledTextarea {...props} minLength={16} rows={8} className="max-h-64 min-h-16" />
          ) : (
            <LabeledInput {...props} />
          ),
        email: (props) => <LabeledInput {...props} />,
      }}
    >
      {children}
    </Form>
  );
}
