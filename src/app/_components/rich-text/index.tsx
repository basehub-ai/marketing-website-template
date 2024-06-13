import { RichText, type RichTextProps } from "basehub/react-rich-text";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";

import { fragmentOn } from "basehub";
import s from "./rich-text.module.scss";
import Image from "next/image";
import clsx from "clsx";

export const richTextClasses = clsx(
  "prose prose-zinc max-w-prose text-start dark:prose-invert font-normal text-md w-full leading-relaxed",
  "prose-p:text-text-secondary dark:prose-p:text-dark-text-secondary",
  "prose-h1:text-4xl prose-h1:font-medium prose-h1:text-text-primary dark:prose-h1:text-dark-text-primary",
  "prose-h2:text-3xl prose-h2:font-medium prose-h2:text-text-primary dark:prose-h2:text-dark-text-primary",
  "prose-h3:text-2xl prose-h3:font-medium prose-h3:text-text-primary dark:prose-h3:text-dark-text-primary",
  "prose-blockquote:border-border prose-blockquote:pl-5 prose-blockquote:text-2xl prose-blockquote:text-text-primary dark:prose-blockquote:border-dark-border dark:prose-blockquote:text-dark-text-primary",
  '[&_blockquote>p]:before:[content:""] prose-blockquote:[&_blockquote>p]:after:[content:""]',
  "prose-h4:text-2xl prose-h4:font-medium",
  "prose-strong:font-medium",
  "prose-a:outline-accent-500 dark:prose-a:text-accent-400 prose-a:text-accent-600 prose-a:no-underline hover:prose-a:underline prose-a:decoration-accent-500/50",
  "prose-pre:pl-0",
  s["rich-text"],
);

export const richTextBaseComponents: RichTextProps["components"] = {
  code: Code,
  pre: ({ children }) => <>{children}</>,
  b: ({ children }) => <strong>{children}</strong>,
  img: (props) => <RichTextImage {...props} />,
  video: (props) => <RichTextVideo {...props} />,
};

function Code({
  children,
  isInline,

  code,
}: {
  children: React.ReactNode;
  isInline: boolean;
  code: string;
}) {
  if (isInline) {
    return (
      <code className="rounded border border-border px-2 py-0.5 text-accent-500 before:[content:none] after:[content:none] dark:border-dark-border dark:bg-dark-surface-secondary">
        {children}
      </code>
    );
  } else
    return <pre className="rounded-lg border border-border dark:border-dark-border">{code}</pre>;
}

export const FaqItemComponentFragment = fragmentOn("FaqItemComponent", {
  _id: true,
  _idPath: true,
  _title: true,
  answer: true,
});

type FaqItemComponentRichText = fragmentOn.infer<typeof FaqItemComponentFragment>;

export function FaqRichtextComponent({ answer, _title }: FaqItemComponentRichText) {
  return (
    <details className="group mb-2 flex flex-col gap-4 overflow-hidden rounded-lg border border-border bg-surface-secondary pb-1 dark:border-dark-border dark:bg-dark-surface-secondary">
      <summary className="flex cursor-pointer items-start text-pretty rounded-md p-3 pb-2 pl-6 font-medium text-text-primary outline-none ring-inset ring-accent-500 focus-visible:ring dark:text-dark-text-primary">
        <span className="mt-1 flex w-8 pr-2">
          <ChevronDownIcon className="transform group-open:rotate-180" />
        </span>
        {_title}
      </summary>
      <p className="not-prose pb-3 pl-14 pr-3">{answer}</p>
    </details>
  );
}

export const richTextCalloutComponentFragment = fragmentOn("RichTextCalloutComponent", {
  _title: true,
  type: true,
  _id: true,
  size: true,
  content: {
    json: {
      content: true,
    },
  },
  __typename: true,
  _idPath: true,
});

type RichTextCalloutComponentFragment = fragmentOn.infer<typeof richTextCalloutComponentFragment>;

const $richTextCallout = cva(
  "gap-2 border border-accent-500/40 bg-accent-500/5 p-4 pl-3 rounded-xl",
  {
    variants: {
      size: {
        large: "flex flex-col",
        default: "flex flex-row",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export function RichTextCalloutComponent({
  _title,
  size,
  content,
}: RichTextCalloutComponentFragment) {
  switch (size) {
    case "large":
      return (
        <article className={$richTextCallout({ size })} id={_title}>
          <div className={richTextClasses}>
            <RichText components={richTextBaseComponents}>{content?.json.content}</RichText>
          </div>
        </article>
      );
    default:
      return (
        <article className={$richTextCallout()} id={_title}>
          <div className="pr-2 text-accent-500">
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.95 13.0653L9.32694 11.4576C9.18849 11.3192 9.01703 11.2484 8.81254 11.2451C8.60806 11.2419 8.42826 11.3179 8.27314 11.473C8.12826 11.6179 8.05582 11.7935 8.05582 11.9999C8.05582 12.2063 8.12826 12.382 8.27314 12.5268L10.3174 14.5711C10.4981 14.7518 10.709 14.8422 10.95 14.8422C11.1911 14.8422 11.4019 14.7518 11.5827 14.5711L15.7269 10.4268C15.8757 10.2781 15.9491 10.1041 15.9471 9.90474C15.9452 9.70539 15.8718 9.52816 15.7269 9.37304C15.5718 9.21791 15.3936 9.13777 15.1923 9.13264C14.9911 9.12752 14.8129 9.20252 14.6577 9.35764L10.95 13.0653ZM8.40967 21.1826L7.02699 18.8576L4.41162 18.2961C4.18725 18.2525 4.00808 18.1345 3.87412 17.9422C3.74015 17.7499 3.68663 17.5416 3.71354 17.3172L3.96932 14.6268L2.19047 12.5922C2.03663 12.4281 1.95972 12.2307 1.95972 11.9999C1.95972 11.7692 2.03663 11.5717 2.19047 11.4076L3.96932 9.37304L3.71354 6.68266C3.68663 6.4583 3.74015 6.24996 3.87412 6.05766C4.00808 5.86535 4.18725 5.7474 4.41162 5.70382L7.02699 5.14229L8.40967 2.81729C8.53018 2.61986 8.69429 2.48524 8.90199 2.41344C9.10968 2.34166 9.32057 2.35256 9.53467 2.44614L12 3.48844L14.4654 2.44614C14.6795 2.35256 14.8904 2.34166 15.0981 2.41344C15.3058 2.48524 15.4699 2.61986 15.5904 2.81729L16.9731 5.14229L19.5885 5.70382C19.8128 5.7474 19.992 5.86535 20.126 6.05766C20.2599 6.24996 20.3135 6.4583 20.2865 6.68266L20.0308 9.37304L21.8096 11.4076C21.9635 11.5717 22.0404 11.7692 22.0404 11.9999C22.0404 12.2307 21.9635 12.4281 21.8096 12.5922L20.0308 14.6268L20.2865 17.3172C20.3135 17.5416 20.2599 17.7499 20.126 17.9422C19.992 18.1345 19.8128 18.2525 19.5885 18.2961L16.9731 18.8576L15.5904 21.1826C15.4699 21.38 15.3058 21.5146 15.0981 21.5864C14.8904 21.6582 14.6795 21.6473 14.4654 21.5537L12 20.5114L9.53467 21.5537C9.32057 21.6473 9.10968 21.6582 8.90199 21.5864C8.69429 21.5146 8.53018 21.38 8.40967 21.1826ZM9.45004 19.9499L12 18.8692L14.5808 19.9499L16 17.5499L18.75 16.9192L18.5 14.0999L20.35 11.9999L18.5 9.86916L18.75 7.04994L16 6.44994L14.55 4.04994L12 5.13072L9.41927 4.04994L8.00004 6.44994L5.25004 7.04994L5.50004 9.86916L3.65004 11.9999L5.50004 14.0999L5.25004 16.9499L8.00004 17.5499L9.45004 19.9499Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className={clsx(richTextClasses)}>
            <RichText components={richTextBaseComponents}>{content?.json.content}</RichText>
          </div>
        </article>
      );
  }
}

export function RichTextImage(props: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
}) {
  return (
    <figure className="relative flex flex-col gap-2">
      <Image alt={props.caption ?? ""} {...props} />
      {props.caption ? (
        <figcaption className="m-0 text-sm text-text-tertiary dark:text-dark-text-tertiary">
          {props.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function RichTextVideo(props: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
}) {
  return (
    <figure className="relative flex flex-col gap-2">
      <video controls>
        <source src={props.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {props.caption ? (
        <figcaption className="m-0 text-sm text-text-tertiary dark:text-dark-text-tertiary">
          {props.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
