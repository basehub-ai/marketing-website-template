"use client";
import { type EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";
import { BaseHubImage } from "basehub/next-image";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import clsx from "clsx";

import { type TestimonialsSlider } from ".";
import { Button } from "@/common/button";

export function Slider({
  quotes,
  children,
}: {
  quotes: TestimonialsSlider["quotes"];
  children: React.ReactNode;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      breakpoints: {
        640: {
          align: "center",
        },
      },
    },
    [WheelGesturesPlugin()],
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const onPrevButtonClick = React.useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = React.useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="flex w-full flex-col gap-14">
      <div className="flex justify-between">
        {children}
        <div className="hidden gap-4 sm:flex">
          <Button
            aria-label="Previous testimonial"
            className="!h-auto rounded-full px-4 py-2"
            intent="secondary"
            onClick={onPrevButtonClick}
          >
            <ArrowLeftIcon className="size-6" />
          </Button>
          <Button
            aria-label="Next testimonial"
            className="!h-auto rounded-full !px-4 !py-2"
            intent="secondary"
            onClick={onNextButtonClick}
          >
            <ArrowRightIcon className="size-6" />
          </Button>
        </div>
      </div>
      <div ref={emblaRef} className="relative">
        <div className="relative flex h-full w-full gap-10 md:gap-0">
          {quotes.map((item) => (
            <TesimonialCard key={item._id} {...item} />
          ))}
        </div>
        <div className="mt-4 flex w-full justify-center gap-2 md:hidden">
          {scrollSnaps.map((snap, index) => (
            <button
              key={snap}
              aria-label={`Testimonial ${String(index + 1)}`}
              className={clsx(
                "group flex items-center justify-center rounded-full p-1",
                index === selectedIndex ? "bg-accent-500/50" : "",
              )}
              onClick={() => onDotButtonClick(index)}
            >
              <span
                className={clsx(
                  "size-2 rounded-full",
                  index === selectedIndex
                    ? "bg-accent-500"
                    : "bg-surface-tertiary dark:bg-dark-surface-secondary",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function VainillaCard({ quote, author }: TestimonialsSlider["quotes"][0]) {
  return (
    <div className="min-w-0 max-w-full shrink-0 grow-0 basis-[min(740px,100%)] self-stretch md:pr-10">
      <article className="embla__slide flex h-full w-full min-w-0 transform touch-pan-y touch-pinch-zoom select-none flex-col rounded-xl border border-border [backface-visibility:hidden] last:!visible dark:border-dark-border">
        <div className="flex flex-1 items-start border-b border-border px-5 py-[18px] dark:border-dark-border md:px-8 md:py-7">
          <blockquote className="text-pretty text-xl font-extralight leading-[135%] text-text-primary dark:text-dark-text-primary sm:text-2xl md:text-4xl">
            “{quote}”
          </blockquote>
        </div>
        <div className="flex items-center gap-4 pl-5">
          <div className="flex flex-1 items-center gap-5 border-r border-border py-4 dark:border-dark-border">
            <BaseHubImage
              alt={author._title}
              className="hidden size-16 rounded-full md:block"
              height={64}
              src={author.image.url}
              width={64}
            />
            <div className="flex flex-1 flex-col">
              <h5 className="text-base font-medium md:text-lg">{author._title}</h5>
              <p className="text-pretty text-sm text-text-tertiary dark:text-dark-text-tertiary md:text-base">
                {author._title}, {author.company._title}
              </p>
            </div>
          </div>
          <div className="pr-5">
            {author.company.image ? (
              <BaseHubImage
                alt={author.company.image.alt ?? author.company._title}
                className="w-12 md:w-16"
                height={48}
                src={author.company.image.url}
                width={48}
              />
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}

export const TesimonialCard = React.memo(
  VainillaCard,
  (prevProps, nextProps) =>
    prevProps.quote === nextProps.quote && prevProps.author === nextProps.author,
);
