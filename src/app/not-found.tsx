import { ButtonLink } from "@/common/button";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";

export default function NotFound() {
  return (
    <Section className="flex h-[calc(100vh-var(--header-height))] flex-col justify-center">
      <Heading
        subtitle={
          "We can't seem to find the page you are looking for. It may be temporarily unavailable or it may have been moved."
        }
        tag="Page not found"
      >
        <h2>Something is missing</h2>
      </Heading>
      <ButtonLink href="/" intent="primary">
        Go back to Homepage
      </ButtonLink>
    </Section>
  );
}
