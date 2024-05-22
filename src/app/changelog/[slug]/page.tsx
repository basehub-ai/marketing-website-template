import { Pump } from ".basehub/react-pump";
import { Heading } from "@/common/heading";

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
              },
            },
          },
        },
      ]}
    >
      {async ([{ changelog }]) => {
        "use server";
        const post = changelog.posts.items[0];

        return (
          <div>
            <Heading align="left" subtitle={new Date(post.publishedAt).toLocaleDateString()}>
              <h1>{post._title}</h1>
            </Heading>
          </div>
        );
      }}
    </Pump>
  );
}
