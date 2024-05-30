"use client";

import { cx } from "class-variance-authority";
import React from "react";

import { Button } from "@/common/button";

import { type TestimonialsList } from ".";

const MAX_TO_SHOW = 9;

export function TestimonialsGridClient({
  testimonialsList,
}: {
  testimonialsList: TestimonialsList;
}) {
  const [showMore, setShowMore] = React.useState(false);

  const filteredItems = React.useMemo(() => {
    const itemsToDisplay = showMore
      ? testimonialsList.items
      : testimonialsList.items.slice(0, MAX_TO_SHOW);

    // chunk it into 3 columns
    const chunks = Array.from({ length: 3 }, () => []) as TestimonialsList["items"][number][][];

    const chunkSize = Math.floor(itemsToDisplay.length / 3);
    const itemsResting = itemsToDisplay.length % 3;

    // Distribute the items into chunks
    let currentChunkIndex = 0;

    itemsToDisplay.forEach((item, i) => {
      chunks[currentChunkIndex].push(item);
      if ((i + 1) % chunkSize === 0 && currentChunkIndex < 2) {
        currentChunkIndex++;
      }
    });

    // Distribute the remaining items
    if (itemsResting === 1) {
      chunks[1].push(itemsToDisplay[itemsToDisplay.length - 1]);
    } else if (itemsResting === 2) {
      chunks[0].push(itemsToDisplay[itemsToDisplay.length - 2]);
      chunks[2].push(itemsToDisplay[itemsToDisplay.length - 1]);
    }

    return chunks;
  }, [testimonialsList, showMore]);

  return (
    <>
      <div className="relative flex flex-col items-center gap-8 overflow-hidden md:flex-row">
        {filteredItems.map((chunk, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className={cx("h-auto flex-1")}>
            <div className={cx("flex flex-1 flex-col gap-8", { "md:mt-8": i === 1 })}>
              {chunk.map(({ quote, author, _id }, i) => (
                <article
                  key={_id}
                  className={cx(
                    "flex flex-1 shrink-0 flex-col rounded-xl border border-border dark:border-dark-border",
                    { "hidden md:flex": i !== 0 && !showMore },
                  )}
                >
                  <div className="flex flex-1 shrink-0 items-start border-b border-border p-5 dark:border-dark-border">
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
                          className="size-8 rounded-full"
                          src={author.image.url}
                        />
                      </figure>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      {testimonialsList.items.length > MAX_TO_SHOW && (
        <div className="flex justify-center">
          <Button intent="secondary" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show less" : "Show more"}
          </Button>
        </div>
      )}
    </>
  );
}
