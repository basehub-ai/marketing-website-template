import Image from "next/image";
import { draftMode } from "next/headers";

import { ButtonLink } from "@/common/button";
import { Pump } from ".basehub/react-pump";
import { optimizedImageFragment } from "@/lib/basehub/fragments";
import { fragmentOn } from ".basehub/schema";

import { DesktopMenu, MobileMenu } from "./navigation-menu";
import { DraftModeButton } from "./draft-mode";

const headerLinksFragment = fragmentOn("NavbarItem", {
  _title: true,
  href: true,
  _id: true,
  sublinks: {
    items: {
      _id: true,
      href: true,
      _title: true,
    },
  },
});

export type HeaderLiksFragment = fragmentOn.infer<typeof headerLinksFragment>;

export async function Header() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }}
      queries={[
        {
          site: {
            header: {
              logo: optimizedImageFragment,
              navbar: {
                items: headerLinksFragment,
              },
            },
          },
        },
      ]}
    >
      {async ([
        {
          site: { header },
        },
      ]) => {
        "use server";

        return (
          <header className="z-50 relative left-0 top-0 flex flex-col border-b border-border dark:border-dark-border">
            <div className="flex h-[--header-height] bg-surface-primary dark:bg-dark-surface-primary">
              <div className="container mx-auto grid w-full grid-cols-header place-items-center content-center items-center px-4 first:*:justify-self-start last:*:justify-self-end">
                <ButtonLink unstyled href="/">
                  <Image
                    alt={header.logo.alt ?? "Logo"}
                    className="h-16 dark:invert"
                    height={header.logo.height}
                    layout="fixed"
                    src={header.logo.url}
                    width={header.logo.width}
                  />
                </ButtonLink>
                <DesktopMenu links={header.navbar.items} />
                <MobileMenu links={header.navbar.items} />
              </div>
            </div>
            {draftMode().isEnabled ? (
              <div className="flex items-center justify-center bg-surface-secondary dark:bg-dark-surface-secondary">
                <p className="text-pretty text-sm text-text-tertiary dark:text-dark-text-tertiary">
                  Draft mode is enabled
                </p>
                <DraftModeButton />
              </div>
            ) : null}
          </header>
        );
      }}
    </Pump>
  );
}
