import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { RichText } from "basehub/react-rich-text";
import type { Metadata } from "next";

import { Pump } from "basehub/react-pump";
import { Section } from "@/common/layout";
import { authorFragment, darkLightImageFragment } from "@/lib/basehub/fragments";
import { Heading } from "@/common/heading";
import { Avatar } from "@/common/avatar";
import {
  FaqItemComponentFragment,
  FaqRichtextComponent,
  richTextBaseComponents,
  RichTextCalloutComponent,
  richTextCalloutComponentFragment,
  richTextClasses,
} from "@/app/_components/rich-text";
import { CodeSnippet, codeSnippetFragment } from "@/app/_components/code-snippet";
import { basehub } from "basehub";
import { cx } from "class-variance-authority";
import { formatDate } from "@/utils/dates";
import { DarkLightImage } from "@/common/dark-light-image";
import { PageView } from "@/app/_components/page-view";
import { BASEHUB_REVALIDATE_TIME } from "@/lib/basehub/constants";

export const dynamic = "force-static";

export const revalidate = BASEHUB_REVALIDATE_TIME;

export const generateStaticParams = async () => {
  const data = await basehub({ cache: "no-store" }).query({
    site: {
      blog: {
        posts: {
          items: {
            _slug: true,
          },
        },
      },
    },
  });

  return data.site.blog.posts.items.map((post) => {
    return {
      slug: post._slug,
    };
  });
};

export const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> => {
  const data = await basehub({ next: { revalidate: BASEHUB_REVALIDATE_TIME } }).query({
    site: {
      settings: {
        metadata: {
          titleTemplate: true,
          sitename: true,
        },
      },
      blog: {
        posts: {
          __args: {
            filter: {
              _sys_slug: { eq: slug },
            },
            first: 1,
          },
          items: {
            ogImage: { url: true },
            _id: true,
            _title: true,
            description: true,
          },
        },
      },
    },
  });

  const post = data.site.blog.posts.items[0];

  if (!post) return undefined;
  const images = [{ url: post.ogImage.url }];

  return {
    title: post._title,
    description: post.description,
    openGraph: {
      images,
      type: "article",
    },
    twitter: {
      images,
      card: "summary_large_image",
      site: data.site.settings.metadata.sitename,
    },
  };
};

export default async function BlogPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <main>
      <Pump
        draft={draftMode().isEnabled}
        next={{ revalidate: BASEHUB_REVALIDATE_TIME }}
        queries={[
          {
            site: {
              blog: {
                posts: {
                  __args: {
                    filter: {
                      _sys_slug: {
                        eq: slug,
                      },
                    },
                    first: 1,
                  },
                  items: {
                    _analyticsKey: true,
                    _title: true,
                    description: true,
                    authors: authorFragment,
                    publishedAt: true,
                    image: darkLightImageFragment,
                    categories: true,
                    body: {
                      json: {
                        __typename: true,
                        blocks: {
                          __typename: true,
                          on_FaqItemComponent: FaqItemComponentFragment,
                          on_RichTextCalloutComponent: richTextCalloutComponentFragment,
                          on_CodeSnippetComponent: codeSnippetFragment,
                        },
                        content: 1,
                        toc: 1,
                      },
                    },
                  },
                },
              },
            },
          },
        ]}
      >
        {async ([
          {
            site: {
              blog: { posts },
            },
          },
        ]) => {
          "use server";
          const blogpost = posts.items.at(0);

          if (!blogpost) return notFound();

          return (
            <>
              <PageView _analyticsKey={blogpost._analyticsKey} />
              <Section>
                <Heading subtitle={blogpost.description}>
                  <h1>{blogpost._title}</h1>
                </Heading>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="flex max-w-screen-lg items-center justify-center gap-12 text-base">
                    {blogpost.authors.map((author) => (
                      <figure key={author._id} className="flex items-center gap-2">
                        <Avatar key={author._id} {...author.image} alt="" className="!size-11" />
                        {author._title}
                      </figure>
                    ))}
                  </div>
                  <div className="flex divide-x divide-border text-sm font-normal text-text-tertiary dark:divide-dark-border dark:text-dark-text-tertiary">
                    <p className="pr-2">{formatDate(blogpost.publishedAt)}</p>
                    <span className="pl-2">
                      {blogpost.categories.map((category) => (
                        <span key={category} className="mr-1 capitalize">
                          {category}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </Section>
              <DarkLightImage
                {...blogpost.image}
                priority
                withPlaceholder
                className="h-full max-h-[720px] w-full object-cover "
                style={{ aspectRatio: blogpost.image.light.aspectRatio }}
              />
              <Section>
                <div
                  className={cx(
                    richTextClasses,
                    "[&>p:first-child]:text-2xl [&>p:first-child]:font-light",
                  )}
                >
                  <RichText
                    blocks={blogpost.body.json.blocks}
                    components={{
                      ...richTextBaseComponents,
                      FaqItemComponent: FaqRichtextComponent,
                      RichTextCalloutComponent: RichTextCalloutComponent,
                      CodeSnippetComponent: CodeSnippet,
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
