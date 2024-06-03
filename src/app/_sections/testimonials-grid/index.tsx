import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { fragmentOn } from "basehub";
import { headingFragment, quoteFragment } from "@/lib/basehub/fragments";

import { TestimonialsGridClient } from "./testimonials-list";

export const testimonialsGridFragment = fragmentOn("TestimonialsGridComponent", {
  heading: headingFragment,
  quotes: quoteFragment,
});

type TestimonialsGrid = fragmentOn.infer<typeof testimonialsGridFragment>;

export function TestimonialsGrid({ heading, quotes }: TestimonialsGrid) {
  return (
    <Section>
      <Heading {...heading}>
        <h4>{heading.title}</h4>
      </Heading>
      <TestimonialsGridClient quotes={quotes} />
    </Section>
  );
}
