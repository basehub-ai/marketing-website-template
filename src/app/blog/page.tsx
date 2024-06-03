import { draftMode } from "next/headers";

import { Pump } from "basehub/react-pump";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { SearchContent as Search } from "@/common/search";
import { SearchHitsProvider } from "@/context/search-hits-context";
import { type AvatarFragment, avatarFragment } from "@/lib/basehub/fragments";

import { BlogpostCard, blogpostCardFragment } from "./_components/blogpost-card";

export const dynamic = "force-static";

export const revalidate = 30;

export default async function BlogPage() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }}
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
              mainTitle: true,
              featuredPosts: blogpostCardFragment,
              listTitle: true,
              posts: {
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

        return (
          <Section className="gap-16">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
              {blog.featuredPosts.slice(0, 3).map((post) => (
                <BlogpostCard key={post._id} type="card" {...post} />
              ))}
            </div>
            <div className="w-full space-y-3">
              <Heading align="left">
                <h3 className="!text-xl lg:!text-2xl">{blog.listTitle}</h3>
              </Heading>
              <div className="flex flex-col divide-y divide-border self-stretch dark:divide-dark-border">
                {posts.items.map((post) => (
                  <BlogpostCard key={post._id} {...post} className="-mx-4" />
                ))}
              </div>
            </div>
          </Section>
        );
      }}
    </Pump>
  );
}
