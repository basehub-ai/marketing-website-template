"use client";
import { type EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

import { type TestimonialsSlider } from ".";

export function Slider({
  testimonialsSliderList,
  children,
}: {
  testimonialsSliderList: TestimonialsSlider["testimonialsSliderList"];
  children: React.ReactNode;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

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
        <div className="sm hidden gap-4 sm:flex">
          <button
            className="rounded-full border border-border px-4 py-2 hover:bg-surface-tertiary dark:border-dark-border dark:hover:bg-dark-surface-tertiary"
            onClick={onPrevButtonClick}
          >
            <ArrowLeftIcon className="size-6" />
          </button>
          <button
            className="rounded-full border border-border px-4 py-2 hover:bg-surface-tertiary dark:border-dark-border dark:hover:bg-dark-surface-tertiary"
            onClick={onNextButtonClick}
          >
            <ArrowRightIcon className="size-6" />
          </button>
        </div>
      </div>
      <div ref={emblaRef} className="relative">
        <div className="relative flex h-full w-full">
          {testimonialsSliderList.items.map(({ _id, quote, author }) => (
            <article
              key={_id}
              className="embla__slide ml-20 flex w-full min-w-0 max-w-full shrink-0 grow-0 basis-[600px] transform touch-pan-y touch-pinch-zoom flex-col rounded-xl border border-border [backface-visibility:hidden] last:!visible dark:border-dark-border"
            >
              <div className="flex flex-1 items-start border-b border-border px-8 py-7 dark:border-dark-border">
                <blockquote className="text-pretty text-2xl font-extralight leading-snug text-text-primary dark:text-dark-text-primary md:text-4xl">
                  “{quote}”
                </blockquote>
              </div>
              <div className="flex items-center gap-4 pl-5">
                <div className="flex flex-1 items-center gap-5 border-r border-border py-4 dark:border-dark-border">
                  <Image
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
                    <Image
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
          ))}
        </div>
        <div className="mt-4 flex w-full justify-center gap-2 md:hidden">
          {scrollSnaps.map((snap, index) => (
            <button
              key={snap}
              className={clsx(
                "group flex items-center justify-center rounded-full p-1",
                index === selectedIndex ? "bg-neutral-500/50" : "",
              )}
              onClick={() => onDotButtonClick(index)}
            >
              <span
                className={clsx(
                  "size-2 rounded-full",
                  index === selectedIndex
                    ? "bg-neutral-500"
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
