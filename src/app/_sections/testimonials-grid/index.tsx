import { cx } from "class-variance-authority";

import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { fragmentOn } from ".basehub/schema";
import { headingFragment } from "@/lib/basehub/fragments";
import { Button } from "@/common/button";

export const testimonialsGridFragment = fragmentOn("TestimonialsGridComponent", {
  heading: headingFragment,
  testimonialsGridList: {
    items: {
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
  },
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
      <div className="relative columns-1 gap-8 overflow-hidden md:columns-3">
        {testimonialsGridList.items.map(({ author, quote }, i) => (
          <article
            key={author._id}
            className={cx(
              "mb-8 flex flex-1  shrink-0 snap-mandatory snap-center flex-col rounded-xl border border-border dark:border-dark-border",
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
            <div className="flex items-center bg-surface-secondary px-4 py-3 dark:bg-dark-surface-secondary">
              <div className="flex flex-1 flex-col gap-0.5">
                <h5 className="text-xs font-medium text-text-tertiary dark:text-dark-text-tertiary md:text-sm">
                  {author._title}
                </h5>
                <p className="text-pretty text-xs text-text-tertiary dark:text-dark-text-tertiary md:text-sm">
                  {author.role}, {author.company._title}
                </p>
              </div>
              <div className="px-4">
                <figure className="aspect-square rounded-full bg-neutral-200 p-0.5">
                  <img
                    alt={author.image.alt ?? author._title}
                    className="rounded-full"
                    src={author.image.url}
                  />
                </figure>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="flex justify-center">
        <Button intent="secondary">View more</Button>
      </div>
    </Section>
  );
}
