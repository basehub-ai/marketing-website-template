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
      <div className="mx-auto flex w-full gap-8 md:max-w-screen-sm lg:max-w-screen-md lg:gap-14 lg:px-24 xl:max-w-screen-xl">
        <Accordion
          items={faqMockup.questions.map((i) => ({answer: i.answer, question: i._title}))}
        />
      </div>
    </Section>
  );
}
