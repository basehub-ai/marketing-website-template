import { Button } from "@/common/button";
import { AuthLayout } from "../_components/auth-layout";
import { LabeledInput, LabeledTextarea } from "../_components/labeled-input";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { BackToHomeButton } from "../_components/back-to-home-button";

export default function RequestDemo() {
  return (
    <AuthLayout
      subtitle="Interested in a live demonstration? Complete the form below, and we’ll contact you to set up a session tailored to your needs."
      title="Request Demo"
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
        <LabeledTextarea
          required
          label="Message"
          minLength={200}
          name="message"
          placeholder="What are you looking to learn from the demo?"
          rows={8}
        />
        <div className="mt-2 flex items-center justify-between">
          <Button icon={<ArrowRightIcon className="size-5" />} iconSide="right" type="submit">
            Request Demo
          </Button>
          <BackToHomeButton />
        </div>
      </form>
    </AuthLayout>
  );
}
