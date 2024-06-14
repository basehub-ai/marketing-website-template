import { Button } from "@/common/button";
import Link from "next/link";
import { AuthLayout } from "../_components/auth-layout";
import { LabeledInput, LabeledWrapper } from "../_components/labeled-input";
import { Selector } from "../_components/select";
import { BackToHomeButton } from "../_components/back-to-home-button";

export default function SignUp() {
  return (
    <AuthLayout
      subtitle={
        <>
          {" "}
          Already have an account?{" "}
          <Link
            className="text-accent-500 hover:text-accent-600 dark:hover:text-accent-400"
            href="/sign-in"
          >
            Sign In
          </Link>
        </>
      }
      title="Sign In"
    >
      <form className="flex flex-col gap-3">
        <LabeledInput required label="First Name" name="name" placeholder="Jhon" type="text" />
        <LabeledInput required label="Last Name" name="last-name" placeholder="Doe" type="text" />
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
        <LabeledWrapper label="How did you hear about us?">
          <Selector
            options={[
              { label: "Google", value: "google" },
              { label: "Facebook", value: "facebook" },
              { label: "Twitter", value: "twitter" },
              { label: "Instagram", value: "instagram" },
            ]}
          />
        </LabeledWrapper>
        <div className="mt-2 flex items-center justify-between">
          <Button type="submit">Sign Up</Button>
          <BackToHomeButton />
        </div>
      </form>
    </AuthLayout>
  );
}
