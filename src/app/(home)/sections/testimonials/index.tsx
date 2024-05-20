import {Section} from "@/common/layout";
import {Heading} from "@/common/heading";
import {fragmentOn} from ".basehub/schema";
import {headingFragment} from "@/lib/basehub/fragments";

import {Slider} from "./slider";

export const testimonialsSliderFragment = fragmentOn("TestimonialSliderComponent", {
  heading: headingFragment,
  testimonialsSliderList: {
    items: {
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

export function Testimonials({heading, testimonialsSliderList}: TestimonialsSlider) {
  return (
    <div className="relative">
      <span className="absolute left-0 top-0 z-30 h-full bg-gradient-to-r from-surface-primary via-surface-primary to-transparent dark:from-dark-surface-primary dark:via-dark-surface-primary dark:to-transparent md:w-[10covw] lg:w-[140px]" />
      <Section>
        <Slider testimonialsSliderList={testimonialsSliderList}>
          <Heading
            align="left"
            className="self-stretch"
            subtitle={heading.subtitle}
            tag={heading.tag}
          >
            <h4>{heading.title}</h4>
          </Heading>
        </Slider>
      </Section>
    </div>
  );
}
