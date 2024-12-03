import { Button } from "@/common/button";
import { AuthLayout, RichTextFormWrapper, formWrapperFragment } from "../_components/auth-layout";
import { Pump } from "basehub/react-pump";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { BackToHomeButton } from "../_components/back-to-home-button";
import { DemoForm } from "./client-wrapper";

export default function RequestDemo() {
  return (
    <Pump
      queries={[
        {
          site: {
            requestDemo: {
              wrapper: formWrapperFragment,
              submissions: {
                ingestKey: true,
                schema: true,
              },
            },
          },
        },
      ]}
    >
      {async ([{ site }]) => {
        "use server";

        return (
          <AuthLayout
            subtitle={
              site.requestDemo.wrapper.subtitle ? (
                <RichTextFormWrapper>
                  {site.requestDemo.wrapper.subtitle.json.content}
                </RichTextFormWrapper>
              ) : null
            }
            title={site.requestDemo.wrapper.title}
          >
            <DemoForm
              ingestKey={site.requestDemo.submissions.ingestKey}
              schema={site.requestDemo.submissions.schema}
            >
              <div className="mt-3 flex items-center justify-between">
                <Button
                  icon={<ArrowRightIcon className="size-5" />}
                  iconSide="right"
                  intent={site.requestDemo.wrapper.cta.type}
                  type="submit"
                >
                  {site.requestDemo.wrapper.cta.label}
                </Button>
                <BackToHomeButton />
              </div>
            </DemoForm>
          </AuthLayout>
        );
      }}
    </Pump>
  );
}
