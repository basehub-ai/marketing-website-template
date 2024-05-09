import {Heading} from "@/common/heading";
import {Section} from "@/common/layout";

const testimonials = [
  {
    quote:
      "Top-notch security and intuitive interface. It's been a game-changer for our financial operations",
    author: {
      name: "Alexandra Nguyen",
      title: "Chief Operations Officer",
      company: {
        name: "InnovateX Solutions",
        logo: {
          url: "/logos/innovatex.svg",
          alt: "InnovateX Solutions",
        },
      },
    },
  },
  {
    quote:
      "Top-notch security and intuitive interface. It's been a game-changer for our financial operations",
    author: {
      name: "Alexandra Nguyen",
      title: "HR Manager",
      avatar: {
        url: "/avatars/alexandra-nguyen.jpg",
        alt: "Alexandra Nguyen",
      },
      company: {
        name: "Optimal Solutions Inc.",
        logo: {
          url: "/logos/innovatex.svg",
          alt: "InnovateX Solutions",
        },
      },
    },
  },
];

export function TestimonialsGrid() {
  return (
    <Section>
      <Heading align="left" tag="Testimonials">
        <h4>What our customers say</h4>
      </Heading>
      <div className="relative grid grid-cols-1 gap-8">
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-surface-primary via-transparent to-surface-primary dark:from-dark-surface-primary dark:to-dark-surface-primary" />
        {testimonials.map(({author, quote}) => (
          <article
            key={author.name}
            className="flex max-w-[312px] flex-1 shrink-0 snap-mandatory snap-center flex-col rounded-xl border border-border dark:border-dark-border md:max-w-[764px]"
          >
            <div className="flex items-start border-b border-border p-5 dark:border-dark-border">
              <blockquote className="text-pretty text-base font-light text-text-secondary dark:text-dark-text-secondary md:text-lg">
                {quote}
              </blockquote>
            </div>
            <div className="flex items-center px-4 py-3">
              <div className="flex flex-1 flex-col gap-0.5">
                <h5 className="text-xs font-medium text-text-tertiary dark:text-dark-text-tertiary md:text-sm">
                  {author.name}
                </h5>
                <p className="text-pretty text-xs text-text-tertiary dark:text-dark-text-tertiary md:text-sm">
                  {author.title}, {author.company.name}
                </p>
              </div>
              <div className="px-4">
                <figure className="aspect-square rounded-full bg-neutral-200 p-0.5">
                  <img
                    alt="Alexandra Nguyen"
                    className="size-6 rounded-full"
                    src="https://api.dicebear.com/8.x/adventurer/svg"
                  />
                </figure>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
