import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { fragmentOn } from "basehub";
import { headingFragment, quoteFragment } from "@/lib/basehub/fragments";

import { Slider } from "./slider";

export const testimonialsSliderFragment = fragmentOn("TestimonialSliderComponent", {
  heading: headingFragment,
  quotes: quoteFragment,
});

export type TestimonialsSlider = fragmentOn.infer<typeof testimonialsSliderFragment>;

export function Testimonials({ heading, quotes }: TestimonialsSlider) {
  return (
    <div className="relative overflow-clip">
      <Section>
        <Slider quotes={quotes}>
          {heading.align === "none" ? (
            <div />
          ) : (
            <Heading className="self-stretch" {...heading}>
              <h4>{heading.title}</h4>
            </Heading>
          )}
        </Slider>
      </Section>
    </div>
  );
}
