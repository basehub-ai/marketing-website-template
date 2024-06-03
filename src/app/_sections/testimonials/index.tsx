import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { fragmentOn } from ".basehub/schema";
import { headingFragment } from "@/lib/basehub/fragments";

import { Slider } from "./slider";

export const testimonialsSliderFragment = fragmentOn("TestimonialSliderComponent", {
  heading: headingFragment,
  testimonialsSliderList: {
    items: {
      _id: true,
      quote: true,
      author: {
        _title: true,
        image: {
          alt: true,
          url: true,
        },
        role: true,
        x: true,
        company: {
          _title: true,
          image: {
            url: true,
            alt: true,
          },
        },
      },
    },
  },
});

export type TestimonialsSlider = fragmentOn.infer<typeof testimonialsSliderFragment>;

export function Testimonials({ heading, testimonialsSliderList }: TestimonialsSlider) {
  return (
    <div className="relative">
      <span className="z-40 absolute left-0 top-0 h-full bg-gradient-to-r from-surface-primary via-surface-primary to-transparent dark:from-dark-surface-primary dark:via-dark-surface-primary dark:to-transparent md:w-[8vw] lg:w-[5vw]" />
      <Section>
        <Slider testimonialsSliderList={testimonialsSliderList}>
          <Heading className="self-stretch" {...heading}>
            <h4>{heading.title}</h4>
          </Heading>
        </Slider>
      </Section>
    </div>
  );
}
