import { draftMode } from "next/headers";

import { Pump } from "basehub/react-pump";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { SearchContent as Search } from "@/common/search";
import { SearchHitsProvider } from "@/context/search-hits-context";
import { type AvatarFragment, avatarFragment } from "@/lib/basehub/fragments";

import { BlogpostCard, blogpostCardFragment } from "./_components/blogpost-card";
import { PageView } from "../../_components/page-view";
import type { Metadata } from "next";
import { basehub } from "basehub";
import { BASEHUB_REVALIDATE_TIME } from "@/lib/basehub/constants";
import { notFound } from "next/navigation";
import { type LanguagesEnum } from ".basehub/schema";
import { getAvailableLocales } from "@/lib/basehub/localization";

export const dynamic = "force-static";

export const revalidate = BASEHUB_REVALIDATE_TIME;

export const generateStaticParams = async (): Promise<{ locale: string }[]> => {
  return await getAvailableLocales();
};

export const generateMetadata = async (): Promise<Metadata | undefined> => {
  const data = await basehub({ cache: "no-store", draft: (await draftMode()).isEnabled }).query({
    site: {
      blog: {
        metadata: {
          title: true,
          description: true,
        },
      },
    },
  });

  return {
    title: data.site.blog.metadata.title ?? undefined,
    description: data.site.blog.metadata.description ?? undefined,
  };
};

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: LanguagesEnum };
}) {
  return (
    <Pump
      draft={(await draftMode()).isEnabled}
      next={{ revalidate: BASEHUB_REVALIDATE_TIME }}
      queries={[
        {
          _componentInstances: {
            blogPost: {
              _searchKey: true,
            },
          },
          collections: {
            authors: {
              items: {
                _id: true,
                image: avatarFragment,
              },
            },
          },
          site: {
            blog: {
              __args: {
                variants: { languages: locale },
              },
              _analyticsKey: true,
              mainTitle: true,
              featuredPosts: blogpostCardFragment,
              listTitle: true,
              posts: {
                __args: { orderBy: "publishedAt__DESC" },
                items: blogpostCardFragment,
              },
            },
          },
        },
      ]}
    >
      {async ([
        {
          _componentInstances: { blogPost },
          site: { blog },
          collections: { authors },
        },
      ]) => {
        "use server";
        const { posts } = blog;

        if (posts.items.length === 0) {
          notFound();
        }

        return (
          <Section className="gap-16">
            <PageView _analyticsKey={blog._analyticsKey} />
            <div className="grid grid-cols-1 gap-5 self-stretch md:grid-cols-2">
              <Heading align="left">
                <h2>{blog.mainTitle}</h2>
              </Heading>
              <SearchHitsProvider
                authorsAvatars={authors.items.reduce(
                  (acc: Record<string, AvatarFragment>, author) => {
                    acc[author._id] = author.image;

                    return acc;
                  },
                  {},
                )}
              >
                <Search _searchKey={blogPost._searchKey} />
              </SearchHitsProvider>
              {blog.featuredPosts
                ?.slice(0, 3)
                .map((post) => (
                  <BlogpostCard key={post._id} locale={locale} type="card" {...post} />
                ))}
            </div>
            <div className="w-full space-y-3">
              <Heading align="left">
                <h3 className="!text-xl lg:!text-2xl">{blog.listTitle}</h3>
              </Heading>
              <div className="-mx-4 flex flex-col self-stretch">
                {posts.items.map((post) => (
                  <BlogpostCard key={post._id} locale={locale} {...post} className="-mx-4" />
                ))}
              </div>
            </div>
          </Section>
        );
      }}
    </Pump>
  );
}
