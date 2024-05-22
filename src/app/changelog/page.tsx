import Image from "next/image";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { draftMode } from "next/headers";

import { Pump } from ".basehub/react-pump";
import { Heading } from "@/common/heading";
import { authorFragment, optimizedImageFragment } from "@/lib/basehub/fragments";
import { AvatarsGroup } from "@/common/avatars-group";
import { ButtonLink } from "@/common/button";
import { fragmentOn } from ".basehub/schema";

import { ChangelogList } from "./_components/changelog-list";

export const changelogListFragment = fragmentOn("PostsItem", {
  _id: true,
  _title: true,
  image: optimizedImageFragment,
  authors: authorFragment,
  excerpt: true,
  _slug: true,
  publishedAt: true,
});

export type ChangelogListFragment = fragmentOn.infer<typeof changelogListFragment>;

export default async function ChangelogPage() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }}
      queries={[
        {
          changelog: {
            title: true,
            subtitle: true,
            posts: {
              items: changelogListFragment,
            },
          },
        },
      ]}
    >
      {async ([{ changelog }]) => {
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

interface ChangelogLayoutProps {
  className?: string;
  contentClassName?: string;
  socialLinksClassName?: string;
  children?: React.ReactNode;
}

export function ChangelogLayout({
  className = "",
  contentClassName = "",
  socialLinksClassName = "",
  children,
}: ChangelogLayoutProps) {
  return (
    <div
      className={`flex items-center justify-between border-b border-border dark:border-dark-border ${className}`}
    >
      <div
        className={`mx-auto flex w-full max-w-screen-md flex-col items-start justify-between gap-4 border-r border-border px-8 py-24 dark:border-dark-border md:flex-row md:items-center ${contentClassName}`}
      >
        {children}

        <Pump
          queries={[
            {
              changelog: {
                socialLinksTitle: true,
                socialLinks: { icon: { url: true }, url: true, _title: true, _id: true },
              },
            },
          ]}
        >
          {async ([{ changelog }]) => {
            "use server";
            const socialLinks = changelog.socialLinks;

            return (
              <div className={`flex items-center gap-2 md:flex-col ${socialLinksClassName}`}>
                <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                  {changelog.socialLinksTitle}
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a key={link._id} href={link.url}>
                      <Image alt={link._title} height={24} src={link.icon?.url ?? ""} width={24} />
                    </a>
                  ))}
                </div>
              </div>
            );
          }}
        </Pump>
      </div>
    </div>
  );
}
