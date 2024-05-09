import {cx} from "class-variance-authority";

import {Heading} from "@/common/heading";
import {Section} from "@/common/layout";

const testimonials = [
  {
    quote:
      "Implementing this product transformed our workflow overnight. It's now an indispensable tool for our team",
    author: {
      name: "Emily Rodriguez",
      title: "Operations Coordinator",
      company: {
        name: "Nexus Innovations",
        logo: {
          url: "/logos/innovatex.svg",
          alt: "Nexus Innovations",
        },
      },
    },
  },
  {
    quote:
      "Impressive features and seamless integration. It's a must-have for any growing business.",
    author: {
      name: "Ryan Taylor",
      title: "Sales Director",
      company: {
        name: "Fusion Technologies",
        logo: {
          url: "/logos/innovatex.svg",
          alt: "Fusion Technologies",
        },
      },
    },
  },
  {
    quote: "This SaaS platform has simplified our workflow and boosted efficiency tenfold.",
    author: {
      name: "Michelle Chen",
      title: "Finance Analyst",
      company: {
        name: "Nova Enterprises",
        logo: {
          url: "/logos/innovatex.svg",
          alt: "Nova Enterprises",
        },
      },
    },
  },
  {
    quote: "Incredible tool! It's simplified our project management like never before",
    author: {
      name: "Daniel Wong",
      title: "Marketing Manager",
      company: {
        name: "Horizon Enterprises",
        logo: {
          url: "/logos/innovatex.svg",
          alt: "Horizon Enterprises",
        },
      },
    },
  },
  {
    quote: "Our team loves how easy it is to customize and adapt to our evolving needs",
    author: {
      name: "Rachel Kim",
      title: "HR Manager",
      company: {
        name: "Optimal Solutions Inc.",
        logo: {
          url: "/logos/innovatex.svg",
          alt: "Optimal Solutions Inc.",
        },
      },
    },
  },
  {
    quote: "Highly impressed with the seamless integration and user-friendly interface.",
    author: {
      name: "Andrew White",
      title: "Product Developer",
      avatar: {
        url: "/avatars/alexandra-nguyen.jpg",
        alt: "Andrew White",
      },
      company: {
        name: "Spectrum Solutions",
        logo: {
          url: "/logos/innovatex.svg",
          alt: "Spectrum Solutions",
        },
      },
    },
  },
  {
    quote: "This SaaS platform has revolutionized our team's collaboration and productivity.",
    author: {
      name: "Jessica Patel",
      title: "Project Lead",
      avatar: {
        url: "/avatars/alexandra-nguyen.jpg",
        alt: "Alexandra Nguyen",
      },
      company: {
        name: "Quantum Solutions",
        logo: {
          url: "/logos/innovatex.svg",
          alt: "Quantum Solutions",
        },
      },
    },
  },
  {
    quote:
      "Top-notch security and intuitive interface. It's been a game-changer for our financial operations",
    author: {
      name: "Kevin Johnson",
      title: "IT Administrator",
      avatar: {
        url: "/avatars/alexandra-nguyen.jpg",
        alt: "Alexandra Nguyen",
      },
      company: {
        name: "Alpha Innovations",
        logo: {
          url: "/logos/innovatex.svg",
          alt: "Alpha Innovations",
        },
      },
    },
  },
  {
    quote: "Game-changer for project management. It's a must-have for any team.",
    author: {
      name: "Hannah Martinez",
      title: "Customer Success Manager",
      avatar: {
        url: "/avatars/alexandra-nguyen.jpg",
        alt: "Hannah Martinez",
      },
      company: {
        name: "Vertex Technologies",
        logo: {
          url: "/logos/innovatex.svg",
          alt: "Vertex Technologies",
        },
      },
    },
  },
];

export function TestimonialsGrid() {
  return (
    <Section>
      <Heading tag="Testimonials">
        <h4>What our customers say</h4>
      </Heading>
      <div className="relative grid grid-cols-1 place-items-center gap-8 self-stretch md:grid-cols-3">
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-surface-primary/90 via-transparent to-surface-primary/90 dark:from-dark-surface-primary/90 dark:to-dark-surface-primary/90" />
        {testimonials.map(({author, quote}, i) => (
          <article
            key={author.name}
            className={cx(
              "flex flex-1 shrink-0 snap-mandatory snap-center flex-col rounded-xl border border-border dark:border-dark-border",
              {
                "hidden md:block": i > 3,
              },
            )}
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
