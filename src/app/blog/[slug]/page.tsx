import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import { RichText } from "basehub/react-rich-text";
import { type Metadata, type ResolvingMetadata } from "next";

import { Pump } from ".basehub/react-pump";
import { Section } from "@/common/layout";
import { authorFragment } from "@/lib/basehub/fragments";
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
import { basehub } from ".basehub/index";

export const dynamic = "force-static";

export const revalidate = 30;

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

export const generateMetadata = async (
  { params: { slug } }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata | ResolvingMetadata> => {
  const prevData = await parent;
  const data = await basehub().query({
    site: {
      settings: {
        metadata: {
          titleTemplate: true,
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
            _id: true,
            _title: true,
            description: true,
          },
        },
      },
    },
  });

  if (!data.site.blog.posts.items.length) return notFound();
  const images = [
    {
      url: `/dynamic-og?type=blogpost&id=${data.site.blog.posts.items[0]._id}`,
      alt: data.site.blog.posts.items[0]._title,
    },
    ...(prevData.openGraph?.images ?? []),
  ];

  return {
    title: data.site.blog.posts.items[0]._title,
    description: data.site.blog.posts.items[0].description,
    openGraph: {
      images,
      type: "article",
    },
  };
};

export default async function BlogPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <main>
      <Pump
        draft={draftMode().isEnabled}
        next={{ revalidate: 30 }}
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
              <Section>
                <Heading subtitle={blogpost.description}>
                  <h1>{blogpost._title}</h1>
                </Heading>
                <div className="flex max-w-screen-lg items-center gap-16">
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
