import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RichText } from "basehub/react-rich-text";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { type ResolvingMetadata, type Metadata } from "next";

import { Pump } from ".basehub/react-pump";
import { Heading } from "@/common/heading";
import { authorFragment, optimizedImageFragment } from "@/lib/basehub/fragments";
import { CodeSnippet } from "@/app/_components/code-snippet";
import { richTextBaseComponents, richTextClasses } from "@/app/_components/rich-text";
import { ButtonLink } from "@/common/button";
import { AvatarsGroup } from "@/common/avatars-group";
import { Avatar } from "@/common/avatar";
import { basehub } from ".basehub/index";
import { formatDate } from "@/utils/dates";

import { ChangelogLayout } from "../_components/changelog-header";

interface ChangelogPageParams {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () => {
  const data = await basehub({ cache: "no-store" }).query({
    changelog: {
      posts: {
        items: {
          _slug: true,
        },
      },
    },
  });

  return data.changelog.posts.items.map((post) => {
    return {
      params: {
        slug: post._slug,
      },
    };
  });
};

export const generateMetadata = async (
  { params }: ChangelogPageParams,
  parent: ResolvingMetadata,
): Promise<Metadata | ResolvingMetadata> => {
  const prevData = await parent;
  const data = await basehub().query({
    settings: {
      metadata: {
        titleTemplate: true,
      },
    },
    changelog: {
      posts: {
        __args: {
          filter: {
            _sys_slug: { eq: params.slug },
          },
          first: 1,
        },
        items: {
          _title: true,
          excerpt: true,
          _id: true,
        },
      },
    },
  });

  if (!data.changelog.posts.items.length) return await parent;
  const images = [
    {
      url: `/dynamic-og?type=changelog&id=${data.changelog.posts.items[0]._id}`,
      alt: data.changelog.posts.items[0]._title,
    },
    ...(prevData.openGraph?.images ?? []),
  ];

  return {
    title: `${data.changelog.posts.items[0]._title} ${data.settings.metadata.titleTemplate ?? ""}`,
    description: data.changelog.posts.items[0].excerpt,
    openGraph: {
      images,
    },
  };
};

export default async function ChangelogPage({ params }: ChangelogPageParams) {
  return (
    <Pump
      queries={[
        {
          changelog: {
            posts: {
              __args: {
                filter: {
                  _sys_slug: { eq: params.slug },
                },
                first: 1,
              },
              items: {
                _title: true,
                excerpt: true,
                publishedAt: true,
                _slug: true,
                image: optimizedImageFragment,
                authors: authorFragment,
                body: {
                  json: {
                    content: true,
                    blocks: {
                      _id: true,
                      __typename: true,
                      code: {
                        code: true,
                        language: true,
                        allowedLanguages: true,
                      },
                      _title: true,
                    },
                    __typename: true,
                  },
                },
              },
            },
          },
        },
        {
          changelog: {
            posts: {
              items: {
                _slug: true,
                _title: true,
              },
              __args: {
                orderBy: "publishedAt__DESC",
              },
            },
          },
        },
      ]}
    >
      {async ([{ changelog }, allPosts]) => {
        "use server";
        const post = changelog.posts.items.at(0);

        if (!post) return notFound();

        const postIndex = allPosts.changelog.posts.items.findIndex((p) => p._slug === post._slug);
        const nextPost =
          allPosts.changelog.posts.items[postIndex + 1] ?? allPosts.changelog.posts.items[0];

        return (
          <>
            <ChangelogLayout>
              <div className="flex flex-col gap-1">
                <Link
                  className="text-xs text-text-tertiary hover:underline dark:text-dark-text-tertiary md:text-sm"
                  href={`/changelog#${post._slug}`}
                >
                  Back to changelog
                </Link>
                <Heading align="left">
                  <h1>{post._title}</h1>
                </Heading>
                <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary md:text-base">
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </ChangelogLayout>
            <div className="mx-auto flex max-w-screen-md flex-col gap-8 px-8 pb-20 pt-16">
              <Image
                alt={post.image.alt ?? post._title}
                className="h-auto w-full rounded-xl"
                height={post.image.height}
                src={post.image.url}
                style={{ aspectRatio: post.image.aspectRatio }}
                width={post.image.width}
              />
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary md:text-base">
                {post.excerpt}
              </p>
              <div className={richTextClasses}>
                <RichText
                  blocks={post.body.json.blocks}
                  components={{ ...richTextBaseComponents, CodeSnippetComponent: CodeSnippet }}
                >
                  {post.body.json.content}
                </RichText>
              </div>
              <div className="flex items-center justify-between">
                {post.authors.length > 1 ? (
                  <AvatarsGroup>
                    {post.authors.map((author) => (
                      <Avatar {...author.image} key={author._id} />
                    ))}
                  </AvatarsGroup>
                ) : (
                  <div className="flex items-center gap-2">
                    <Avatar {...post.authors[0].image} />
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary md:text-base">
                      {post.authors[0]._title}
                    </p>
                  </div>
                )}

                <ButtonLink
                  className="text-xs text-text-tertiary hover:underline dark:text-dark-text-tertiary"
                  href={`/changelog/${nextPost._slug}`}
                  icon={<ArrowRightIcon />}
                  intent="secondary"
                >
                  Read ({nextPost._slug.slice(0, 20)}
                  {nextPost._slug.length > 20 ? "..." : ""})
                </ButtonLink>
              </div>
            </div>
          </>
        );
      }}
    </Pump>
  );
}
