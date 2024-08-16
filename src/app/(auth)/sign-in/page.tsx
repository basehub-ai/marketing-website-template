import { Button } from "@/common/button";
import { AuthLayout, RichTextFormWrapper, formWrapperFragment } from "../_components/auth-layout";
import { LabeledInput } from "../_components/labeled-input";
import { BackToHomeButton } from "../_components/back-to-home-button";
import { Pump } from "basehub/react-pump";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { draftMode } from "next/headers";
import { BASEHUB_REVALIDATE_TIME } from "@/lib/basehub/constants";

export default function SignIn() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: BASEHUB_REVALIDATE_TIME }}
      queries={[
        {
          site: {
            signIn: {
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
              site.signIn.wrapper.subtitle ? (
                <RichTextFormWrapper>
                  {site.signIn.wrapper.subtitle.json.content}
                </RichTextFormWrapper>
              ) : null
            }
            title={site.signIn.wrapper.title}
          >
            <form className="flex flex-col gap-3">
              <LabeledInput
                required
                label="Email Address"
                name="email"
                placeholder="jdoe@gmail.com"
                type="email"
              />
              <LabeledInput
                required
                label="Password"
                name="password"
                placeholder="Type a secure password"
                type="password"
              />
              <div className="mt-3 flex items-center justify-between">
                <Button
                  icon={<ArrowRightIcon className="size-5" />}
                  iconSide="right"
                  intent={site.signIn.wrapper.cta.type}
                  type="submit"
                >
                  {site.signIn.wrapper.cta.label}
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
