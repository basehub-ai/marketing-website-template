import { Button } from "@/common/button";
import { AuthLayout, RichTextFormWrapper, formWrapperFragment } from "../_components/auth-layout";
import { LabeledInput, LabeledTextarea } from "../_components/labeled-input";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { BackToHomeButton } from "../_components/back-to-home-button";
import { Pump } from "basehub/react-pump";

export default function RequestDemo() {
  return (
    <Pump
      queries={[
        {
          site: {
            requestDemo: {
              wrapper: formWrapperFragment,
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
            <form className="flex flex-col gap-3">
              <LabeledInput
                required
                label="First Name"
                name="name"
                placeholder="John"
                type="text"
              />
              <LabeledInput
                required
                label="Last Name"
                name="last-name"
                placeholder="Doe"
                type="text"
              />
              <LabeledInput
                required
                label="Email Address"
                name="email"
                placeholder="jdoe@gmail.com"
                type="email"
              />
              <LabeledTextarea
                required
                label="Message"
                minLength={16}
                name="message"
                placeholder="Hey! I’d love to get a demo..."
                rows={8}
                className="max-h-64 min-h-16"
              />
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
            </form>
          </AuthLayout>
        );
      }}
    </Pump>
  );
}
