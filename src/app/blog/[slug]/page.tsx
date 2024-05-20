import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import { RichText, type RichTextProps } from "basehub/react-rich-text";
import { cva, cx } from "class-variance-authority";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { Pump } from ".basehub/react-pump";
import { Section } from "@/common/layout";
import { authorFragment } from "@/lib/basehub/fragments";
import { Heading } from "@/common/heading";
import { Avatar } from "@/common/basehub-avatar";
import { isDev } from "@/utils/constants";
import { CodeSnippet } from "@/app/_components/code-snippet";
import { fragmentOn } from ".basehub/schema";

const richTextClasses = cx(
  "prose prose-zinc max-w-prose text-start dark:prose-invert",
  "prose-p:text-text-secondary dark:prose-p:text-dark-text-secondary",
  "prose-h1:text-4xl prose-h1:font-medium prose-h1:text-text-primary dark:prose-h1:text-dark-text-primary",
  "prose-h2:text-3xl prose-h2:font-medium prose-h2:text-text-primary dark:prose-h2:text-dark-text-primary",
  "prose-h3:text-2xl prose-h3:font-medium prose-h3:text-text-primary dark:prose-h3:text-dark-text-primary",
  "prose-blockquote:border-border prose-blockquote:pl-5 prose-blockquote:text-2xl prose-blockquote:text-text-primary dark:prose-blockquote:border-dark-border dark:prose-blockquote:text-dark-text-primary",
);

export default async function BlogPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <main>
      <Pump
        draft={draftMode().isEnabled || isDev}
        queries={[
          {
            blogposts: {
              __args: {
                filter: {
                  _sys_slug: {
                    eq: slug,
                  },
                },
                first: 1,
              },
              items: {
                _title: true,
                description: true,
                authors: authorFragment,
                publishedAt: true,
                image: {
                  alt: true,
                  width: true,
                  height: true,
                  aspectRatio: true,
                  url: {
                    __args: {
                      width: 1440,
                      height: 720,
                      quality: 90,
                      format: "webp",
                    },
                  },
                },
                introduction: true,
                body: {
                  json: {
                    __typename: true,
                    blocks: {
                      __typename: true,
                      on_FaqItemComponent: FaqItemComponentFragment,
                      on_RichTextCalloutComponent: richTextCalloutComponentFragment,
                    },
                    content: 1,
                    toc: 1,
                  },
                },
              },
            },
          },
        ]}
      >
        {async ([{ blogposts }]) => {
          "use server";
          const blogpost = blogposts.items.at(0);

          if (!blogpost) return notFound();

          return (
            <>
              <Section>
                <Heading subtitle={blogpost.description}>
                  <h1>{blogpost._title}</h1>
                </Heading>
                <div className="flex items-center gap-16">
                  {blogpost.authors.map((author) => (
                    <figure key={author._id} className="flex items-center gap-2">
                      <Avatar key={author._id} {...author.image} />
                      {author._title}
                    </figure>
                  ))}
                </div>
              </Section>
              <Image
                alt={blogpost.image.alt ?? blogpost._title}
                className="h-full max-h-[720px] w-full object-cover"
                height={720}
                src={blogpost.image.url}
                style={{ aspectRatio: blogpost.image.aspectRatio }}
                width={1440}
              />
              <Section>
                <div className={richTextClasses}>
                  <p className="text-2xl font-light">{blogpost.introduction}</p>
                  <RichText
                    blocks={blogpost.body.json.blocks}
                    components={{
                      ...richTextBaseComponents,
                      FaqItemComponent: FaqRichtextComponent,
                      RichTextCalloutComponent: richTextCalloutComponent,
                    }}
                  >
                    {blogpost.body.json.content}
                  </RichText>
                </div>
              </Section>
            </>
          );
        }}
      </Pump>
    </main>
  );
}

export const richTextBaseComponents: RichTextProps["components"] = {
  code: Code,
  pre: ({ children }) => <>{children}</>,
};

function Code({
  children,
  isInline,
  language,
  code,
}: {
  children: React.ReactNode;
  isInline: boolean;
  language: string;
  code: string;
}) {
  if (isInline) {
    return (
      <code className="rounded border border-border px-2 py-0.5 text-neutral-500 before:[content:none] after:[content:none] dark:border-dark-border dark:bg-dark-surface-secondary">
        {children}
      </code>
    );
  } else return <CodeSnippet code={code} language={language} />;
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
    <details className="group flex flex-col gap-4 overflow-hidden rounded-lg border border-border bg-surface-secondary p-3 open:border-transparent dark:border-dark-border dark:bg-dark-surface-secondary">
      <summary className="flex items-center pl-2.5">
        <span className="flex w-8">
          <ChevronDownIcon className="transform group-open:rotate-180" />
        </span>
        {_title}
      </summary>
      <p className="pl-10 ">{answer}</p>
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
  "gap-2 border border-neutral-500/40 bg-neutral-500/5 p-4 pl-3 rounded-xl",
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

export const richTextCalloutComponent = ({
  _title,
  size,
  content,
}: RichTextCalloutComponentFragment) => {
  switch (size) {
    case "large":
      return (
        <article className={$richTextCallout({ size })} id={_title}>
          <div className={richTextClasses}>
            <RichText>{content?.json.content}</RichText>
          </div>
        </article>
      );
    default:
      return (
        <article className={$richTextCallout()} id={_title}>
          <div className="mt-0.5 pr-2 text-neutral-500">
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
          <div className={cx(richTextClasses, "inline")}>
            <RichText>{content?.json.content}</RichText>
          </div>
        </article>
      );
  }
};
