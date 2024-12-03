"use client";

import { Input } from "@/common/input";
import { unstable_Form as Form, type Field } from "basehub/react-form";
import * as React from "react";

export function ClientForm({ ingestKey, schema }: { ingestKey: string; schema: Field[] }) {
  return (
    <Form
      className="w-full max-w-[400px] flex-shrink-0"
      action={{
        type: "send",
        ingestKey,
      }}
      schema={schema}
      disableDefaultComponents
      components={{
        email: (props) => <Input {...props} buttonContent="Subscribe" />,
      }}
    >
      <React.Fragment />
    </Form>
  );
}
