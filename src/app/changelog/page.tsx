import { draftMode } from "next/headers";

import { Pump } from "basehub/react-pump";
import { Heading } from "@/common/heading";

import { ChangelogList } from "./_components/changelog-list";
import { ChangelogLayout } from "./_components/changelog-header";
import { changelogListFragment } from "./_components/changelog.fragment";
import { PageView } from "../_components/page-view";
import type { Metadata } from "next";
import { basehub } from "basehub";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export const generateMetadata = async (): Promise<Metadata | undefined> => {
  const data = await basehub({ draft: (await draftMode()).isEnabled }).query({
    site: {
      changelog: {
        metadata: {
          title: true,
          description: true,
        },
      },
    },
  });

  return {
    title: data.site.changelog.metadata.title ?? undefined,
    description: data.site.changelog.metadata.description ?? undefined,
  };
};

export default async function ChangelogPage() {
  return (
    <Pump
      queries={[
        {
          site: {
            changelog: {
              _analyticsKey: true,
              title: true,
              subtitle: true,
              posts: {
                __args: {
                  orderBy: "publishedAt__DESC",
                },
                items: changelogListFragment,
              },
            },
            generalEvents: {
              ingestKey: true,
            },
          },
        },
      ]}
    >
      {async ([
        {
          site: { changelog, generalEvents },
        },
      ]) => {
        "use server";

        if (changelog.posts.items.length === 0) {
          return notFound();
        }

        return (
          <>
            <PageView ingestKey={generalEvents.ingestKey} />
            <ChangelogLayout>
              <Heading
                align="left"
                className="flex-1 flex-col-reverse!"
                subtitle={changelog.subtitle}
              >
                <h1>{changelog.title}</h1>
              </Heading>
            </ChangelogLayout>
            <div className="mx-auto max-w-(--breakpoint-md) px-8 pt-16">
              <ChangelogList changelogPosts={changelog.posts.items} />
            </div>
          </>
        );
      }}
    </Pump>
  );
}
