import Image from "next/image";
import { draftMode } from "next/headers";

import { ButtonLink } from "@/common/button";
import { Pump } from "basehub/react-pump";
import { buttonFragment, optimizedImageFragment } from "@/lib/basehub/fragments";
import { fragmentOn } from "basehub";

import { DesktopMenu, MobileMenu } from "./navigation-menu";

const headerLinksFragment = fragmentOn("NavbarItem", {
  _title: true,
  href: true,
  _id: true,
  sublinks: {
    items: {
      _id: true,
      _title: true,
      link: {
        __typename: true,
        on_CustomTextComponent: {
          text: true,
        },
        on_PageReferenceComponent: {
          page: {
            pathname: true,
            _title: true,
          },
        },
      },
    },
  },
});

export type HeaderLiksFragment = fragmentOn.infer<typeof headerLinksFragment>;

export const headerFragment = fragmentOn("Header", {
  logo: optimizedImageFragment,
  navbar: {
    items: headerLinksFragment,
  },
  ctaS: {
    primary: buttonFragment,
    secondary: buttonFragment,
  },
});

export type HeaderFragment = fragmentOn.infer<typeof headerFragment>;

export async function Header() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }}
      queries={[
        {
          site: {
            header: headerFragment,
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
          <header className="sticky left-0 top-0 z-[100] flex w-full flex-col border-b border-border bg-surface-primary dark:border-dark-border dark:bg-dark-surface-primary">
            <div className="flex h-[--header-height] bg-surface-primary dark:bg-dark-surface-primary">
              <div className="container mx-auto grid w-full grid-cols-header place-items-center content-center items-center px-4 first:*:justify-self-start">
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
                <DesktopMenu {...header} />
                <MobileMenu {...header} />
              </div>
            </div>
          </header>
        );
      }}
    </Pump>
  );
}
