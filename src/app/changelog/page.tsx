import { draftMode } from "next/headers";

import { Pump } from ".basehub/react-pump";
import { Heading } from "@/common/heading";

import { ChangelogList } from "./_components/changelog-list";
import { ChangelogLayout } from "./_components/changelog-header";
import { changelogListFragment } from "./_components/changelog.fragment";

export const dynamic = "force-static";

export const revalidate = 30;

export default async function ChangelogPage() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }}
      queries={[
        {
          site: {
            changelog: {
              title: true,
              subtitle: true,
              posts: {
                items: changelogListFragment,
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
      ]) => {
        "use server";

        return (
          <>
            <ChangelogLayout>
              <Heading
                align="left"
                className="flex-1 !flex-col-reverse"
                subtitle={changelog.subtitle}
              >
                <h1>{changelog.title}</h1>
              </Heading>
            </ChangelogLayout>
            <div className="mx-auto max-w-screen-md px-8 pt-16">
              <ChangelogList changelogPosts={changelog.posts.items} />
            </div>
          </>
        );
      }}
    </Pump>
  );
}
