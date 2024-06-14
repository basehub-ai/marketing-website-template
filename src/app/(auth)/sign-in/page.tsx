import { Button } from "@/common/button";
import Link from "next/link";
import { AuthLayout } from "../_components/auth-layout";
import { LabeledInput } from "../_components/labeled-input";
import { BackToHomeButton } from "../_components/back-to-home-button";

export default function SignIn() {
  return (
    <AuthLayout
      subtitle={
        <>
          {" "}
          You don&apos;t have an account?{" "}
          <Link
            className="text-accent-500 hover:text-accent-600 dark:hover:text-accent-400"
            href="/sign-up"
          >
            Sign Up
          </Link>
        </>
      }
      title="Sign In"
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
        <div className="mt-2 flex items-center justify-between">
          <Button type="submit">Sign In</Button>
          <BackToHomeButton />
        </div>
      </form>
    </AuthLayout>
  );
}
