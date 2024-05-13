import {Heading} from "@/common/heading";
import {Section} from "@/common/layout";

import {faqMockup} from "../faq";

import {Accordion} from "./accordion";

export function AccordionFaq() {
  return (
    <Section>
      <Heading subtitle={faqMockup.subtitle} tag={faqMockup.tag}>
        <h4>{faqMockup.title}</h4>
      </Heading>
      <div className="flex w-full max-w-screen-md">
        <Accordion
          items={faqMockup.questions.map((i) => ({answer: i.answer, question: i._title}))}
        />
      </div>
    </Section>
  );
}
