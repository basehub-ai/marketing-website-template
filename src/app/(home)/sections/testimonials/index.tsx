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
  );
}
