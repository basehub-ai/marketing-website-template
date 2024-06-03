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
    <div className="relative">
      <span className="absolute left-0 top-0 z-40 h-full bg-gradient-to-r from-surface-primary via-surface-primary to-transparent dark:from-dark-surface-primary dark:via-dark-surface-primary dark:to-transparent md:w-[8vw] lg:w-[5vw]" />
      <Section>
        <Slider testimonialsSliderList={quotes}>
          <Heading className="self-stretch" {...heading}>
            <h4>{heading.title}</h4>
          </Heading>
        </Slider>
      </Section>
    </div>
  );
}
