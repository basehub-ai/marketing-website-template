import { notFound } from "next/navigation";
import Link from "next/link";
import { BaseHubImage } from "basehub/next-image";
import { RichText } from "basehub/react-rich-text";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";

import { Pump } from "basehub/react-pump";
import { Heading } from "@/common/heading";
import { authorFragment, optimizedImageFragment } from "@/lib/basehub/fragments";
import { CodeSnippet } from "@/app/_components/code-snippet";
import { richTextBaseComponents, richTextClasses } from "@/app/_components/rich-text";
import { ButtonLink } from "@/common/button";
import { AvatarsGroup } from "@/common/avatars-group";
import { Author } from "@/common/avatar";
import { basehub } from "basehub/index";
import { formatDate } from "@/utils/dates";

import { ChangelogLayout } from "../_components/changelog-header";
import { PageView } from "@/app/_components/page-view";
import { draftMode } from "next/headers";
import { BASEHUB_REVALIDATE_TIME } from "@/lib/basehub/constants";

export const dynamic = "force-static";

export const revalidate = BASEHUB_REVALIDATE_TIME;

interface ChangelogPageParams {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () => {
  const data = await basehub({ cache: "no-store" }).query({
    site: {
      changelog: {
        posts: {
          items: {
            _slug: true,
          },
        },
      },
    },
  });

  return data.site.changelog.posts.items.map((post) => {
    return {
      slug: post._slug,
    };
  });
};

export const generateMetadata = async ({
  params,
}: ChangelogPageParams): Promise<Metadata | undefined> => {
  const data = await basehub({ next: { revalidate: BASEHUB_REVALIDATE_TIME } }).query({
    site: {
      settings: {
        metadata: {
          titleTemplate: true,
          sitename: true,
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
            ogImage: { url: true },
            _id: true,
          },
        },
      },
    },
  });

  const post = data.site.changelog.posts.items[0];

  if (!post) return undefined;

  const images = [{ url: post.ogImage.url }];

  return {
    title: post._title,
    description: post.excerpt,
    openGraph: {
      images,
    },
    twitter: {
      images,
      card: "summary_large_image",
      site: data.site.settings.metadata.sitename,
    },
  };
};

export default async function ChangelogPage({ params }: ChangelogPageParams) {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: BASEHUB_REVALIDATE_TIME }}
      queries={[
        {
          site: {
            changelog: {
              goBackText: true,
              posts: {
                __args: {
                  filter: {
                    _sys_slug: { eq: params.slug },
                  },
                  first: 1,
                },
                items: {
                  _analyticsKey: true,
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
                        __typename: true,
                        on_CodeSnippetComponent: {
                          _id: true,
                          _title: true,
                          code: {
                            code: true,
                            language: true,
                            allowedLanguages: true,
                          },
                        },
                      },
                      __typename: true,
                    },
                  },
                },
              },
            },
          },
        },
        {
          site: {
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
        },
      ]}
    >
      {async ([
        {
          site: { changelog },
        },
        allPosts,
      ]) => {
        "use server";
        const post = changelog.posts.items.at(0);

        if (!post) return notFound();

        const postIndex = allPosts.site.changelog.posts.items.findIndex(
          (p) => p._slug === post._slug,
        );
        const nextPost =
          allPosts.site.changelog.posts.items[postIndex + 1] ??
          allPosts.site.changelog.posts.items[0];

        return (
          <>
            <PageView _analyticsKey={post._analyticsKey} />
            <ChangelogLayout>
              <div className="flex flex-col gap-1">
                <Link
                  className="flex w-max items-center gap-1 text-sm text-text-tertiary hover:underline dark:text-dark-text-tertiary md:text-sm"
                  href={`/changelog#${post._slug}`}
                >
                  <ArrowLeftIcon /> {changelog.goBackText}
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
              <BaseHubImage
                priority
                alt={post.image.alt ?? post._title}
                blurDataURL={post.image.blurDataURL}
                className="h-auto w-full rounded-xl"
                height={post.image.height}
                placeholder="blur"
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
                  <AvatarsGroup animate>
                    {post.authors.map((author) => (
                      <Author {...author} key={author._id} />
                    ))}
                  </AvatarsGroup>
                ) : post.authors[0] ? (
                  <div className="flex items-center gap-2">
                    <Author {...post.authors[0]} />
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary md:text-base">
                      {post.authors[0]._title}
                    </p>
                  </div>
                ) : null}

                {nextPost ? (
                  <ButtonLink
                    className="text-sm text-text-tertiary hover:underline dark:text-dark-text-tertiary"
                    href={`/changelog/${nextPost._slug}`}
                    icon={<ArrowRightIcon />}
                    iconSide="right"
                    intent="secondary"
                  >
                    {nextPost._title.slice(0, 35)}
                    {nextPost._title.length > 35 ? "..." : ""}
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </>
        );
      }}
    </Pump>
  );
}
