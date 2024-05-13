import {Heading} from "@/common/heading";
import {Section} from "@/common/layout";

export const faqMockup = {
  tag: "FAQs",
  title: "Frequently asked questions",
  subtitle: "Advice and answers from the our team",
  questions: [
    {
      _title: "What industries can benefit from your AI solutions?",
      answer:
        "Our AI solutions are applicable across various industries, including healthcare, finance, retail, and manufacturing.",
    },
    {
      _title: "How do you ensure data privacy and security?",
      answer:
        "We adhere to strict data privacy regulations and implement robust security measures to protect sensitive information.",
    },
    {
      _title: "Can your AI solutions be customized to fit specific business needs?",
      answer: "Automate repetitive tasks and free up valuable time for strategic initiatives.",
    },
    {
      _title: "Do you provide ongoing support and maintenance for your AI solutions?",
      answer:
        "Absolutely, we offer comprehensive support and maintenance services to ensure the smooth operation of our AI solutions.",
    },
    {
      _title: "How can I get started with your AI solutions?",
      answer:
        "Simply reach out to our team to schedule a consultation and explore how our AI solutions can benefit your business.",
    },
    {
      _title: "What industries can benefit from your AI solutions?",
      answer:
        "Our AI solutions are applicable across various industries, including healthcare, finance, retail, and manufacturing.",
    },
  ],
};

export function Faq() {
  return (
    <Section>
      <Heading subtitle={faqMockup.subtitle} tag={faqMockup.tag}>
        <h4>{faqMockup.title}</h4>
      </Heading>
      <ul className="mx-auto flex grid-cols-3 flex-col place-content-start items-start gap-8 self-stretch lg:grid lg:gap-14 lg:px-24">
        {faqMockup.questions.map((question) => (
          <li key={question._title} className="flex flex-col gap-1.5">
            <p className="font-medium">{question._title}</p>
            <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
              {question.answer}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
