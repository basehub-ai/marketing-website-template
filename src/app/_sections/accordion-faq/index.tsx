import type { Faq } from "../faq";

import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";

import { Accordion } from "./accordion";

export function AccordionFaq(faq: Faq) {
  return (
    <Section>
      <Heading {...faq.heading}>
        <h4>{faq.heading.title}</h4>
      </Heading>
      <div className="mx-auto flex w-full gap-8 md:max-w-screen-sm lg:max-w-screen-md lg:gap-14 lg:px-24 xl:max-w-screen-xl">
        <Accordion items={faq.questions.items} />
      </div>
    </Section>
  );
}
