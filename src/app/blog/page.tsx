import { draftMode } from "next/headers";

import { Pump } from ".basehub/react-pump";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";

import { BlogpostCard, blogpostCardFragment } from "./_components/blogpost-card";

export default async function BlogPage() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }}
      queries={[
        {
          blog: {
            mainTitle: true,
            featuredPosts: blogpostCardFragment,
            blogposts: {
              items: blogpostCardFragment,
            },
          },
        },
      ]}
    >
      {async ([{ blog }]) => {
        "use server";
        const { blogposts } = blog;

        return (
          <Section>
            <Heading align="left">
              <h2>{blog.mainTitle}</h2>
            </Heading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2">
              {blog.featuredPosts.slice(0, 3).map((post) => (
                <BlogpostCard key={post._id} type="card" {...post} />
              ))}
            </div>
            <Heading align="left">
              <h3 className="!text-xl lg:!text-2xl">More posts</h3>
            </Heading>
            <div className="flex flex-col self-stretch">
              {blogposts.items.map((post) => (
                <BlogpostCard key={post._id} {...post} />
              ))}
            </div>
          </Section>
        );
      }}
    </Pump>
  );
}