import NextForm from "next/form";
import { Section } from "@/common/layout";
import { fragmentOn } from "basehub";
import { buttonFragment } from "@/lib/basehub/fragments";
import { FormLayout, RichTextFormWrapper } from "@/app/_components/form-layout";
import { Button } from "@/common/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { LabeledInput, LabeledTextarea, LabeledWrapper } from "@/app/_components/labeled-input";
import { sendEvent, parseFormData } from "basehub/events";
import { Select } from "@/app/_components/select";

export const formFragment = fragmentOn("FormComponent", {
  title: true,
  subtitle: {
    json: {
      content: true,
    },
  },
  cta: buttonFragment,
  submissions: {
    ingestKey: true,
    schema: true,
  },
});
type Form = fragmentOn.infer<typeof formFragment>;

export function Form(props: Form) {
  return (
    <Section>
      <FormLayout
        subtitle={
          props.subtitle ? (
            <RichTextFormWrapper>{props.subtitle.json.content}</RichTextFormWrapper>
          ) : null
        }
        title={props.title}
      >
        <NextForm
          className="flex flex-col gap-3"
          action={async (data) => {
            "use server";
            const parsedData = parseFormData(
              props.submissions.ingestKey,
              props.submissions.schema,
              data,
            );
            if (!parsedData.success) {
              throw new Error(JSON.stringify(parsedData.errors));
            }
            await sendEvent(
              props.submissions.ingestKey,
              // @ts-expect-error -- basehub events are typed based on the schema, but this Form component should be generic
              parsedData.data,
            );
          }}
        >
          {props.submissions.schema.map((field) => {
            if (field.type === "textarea") {
              return (
                <LabeledTextarea key={field.id} rows={8} className="max-h-64 min-h-16" {...field} />
              );
            } else if (field.type === "select" || field.type === "radio") {
              return (
                <LabeledWrapper key={field.id} label={field.label} id={field.id}>
                  <Select id={field.id} name={field.name} required={field.required}>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </LabeledWrapper>
              );
            } else {
              return <LabeledInput key={field.id} {...field} />;
            }
          })}
          <div className="mt-3 flex items-center justify-between">
            <Button
              icon={props.cta.icon ?? <ArrowRightIcon className="size-5" />}
              iconSide="right"
              intent={props.cta.type}
              type="submit"
            >
              {props.cta.label}
            </Button>
          </div>
        </NextForm>
      </FormLayout>
    </Section>
  );
}
