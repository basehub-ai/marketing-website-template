import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { fragmentOn } from "basehub";
import { headingFragment } from "@/lib/basehub/fragments";

import { TestimonialsGridClient } from "./testimonials-list";

const testimonialList = fragmentOn("TestimonialsGridList", {
  items: {
    _id: true,
    author: {
      _id: true,
      _title: true,
      image: {
        url: true,
        alt: true,
      },
      company: {
        _title: true,
      },
      role: true,
    },
    quote: true,
  },
});

export type TestimonialsList = fragmentOn.infer<typeof testimonialList>;

export const testimonialsGridFragment = fragmentOn("TestimonialsGridComponent", {
  heading: headingFragment,
  testimonialsGridList: testimonialList,
});

type TestimonialsGrid = fragmentOn.infer<typeof testimonialsGridFragment>;

export function TestimonialsGrid({
  testimonialsGridList,
  heading: { title, ...heading },
}: TestimonialsGrid) {
  return (
    <Section>
      <Heading {...heading}>
        <h4>{title}</h4>
      </Heading>
      <TestimonialsGridClient testimonialsList={testimonialsGridList} />
    </Section>
  );
}
