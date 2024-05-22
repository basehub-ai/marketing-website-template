import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RichText } from "basehub/react-rich-text";

import { Pump } from ".basehub/react-pump";
import { Heading } from "@/common/heading";
import { authorFragment, optimizedImageFragment } from "@/lib/basehub/fragments";
import { CodeSnippet, codeSnippetFragment } from "@/app/_components/code-snippet";
import { richTextBaseComponents, richTextClasses } from "@/app/_components/rich-text";

import { ChangelogLayout } from "../_components/changelog-header";

export default async function ChangelogPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
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
      ]}
    >
      {async ([{ changelog }]) => {
        "use server";
        const post = changelog.posts.items.at(0);

        if (!post) return notFound();

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
                <Heading align="left" subtitle={new Date(post.publishedAt).toLocaleDateString()}>
                  <h1>{post._title}</h1>
                </Heading>
              </div>
            </ChangelogLayout>
            <div className="mx-auto flex max-w-screen-md flex-col gap-8 px-8">
              <Image
                alt={post.image.alt ?? post._title}
                className="h-auto w-full"
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
            </div>
          </>
        );
      }}
    </Pump>
  );
}
