import { draftMode } from "next/headers";

import { ButtonLink } from "@/common/button";
import { Pump } from "basehub/react-pump";
import { buttonFragment } from "@/lib/basehub/fragments";
import { fragmentOn } from "basehub";

import { DesktopMenu, MobileMenu } from "./navigation-menu";
import { DarkLightImage } from "@/common/dark-light-image";
import { BASEHUB_REVALIDATE_TIME } from "@/lib/basehub/constants";
import clsx from "clsx";

const headerLinksFragment = fragmentOn("HeaderNavbarLinkComponent", {
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
      next={{ revalidate: BASEHUB_REVALIDATE_TIME }}
      queries={[
        {
          site: {
            header: headerFragment,
            settings: {
              logo: {
                dark: {
                  url: true,
                  alt: true,
                  width: true,
                  height: true,
                  aspectRatio: true,
                  blurDataURL: true,
                },
                light: {
                  url: true,
                  alt: true,
                  width: true,
                  height: true,
                  aspectRatio: true,
                  blurDataURL: true,
                },
              },
            },
          },
        },
      ]}
    >
      {async ([
        {
          site: { header, settings },
        },
      ]) => {
        "use server";
        const [aspectRatioWidth, aspectRatioHeight] = settings.logo.light.aspectRatio
          .split("/")
          .map(Number);
        const aspectRatio = (aspectRatioWidth ?? 0) / (aspectRatioHeight ?? 0);
        let logoStyle;

        switch (true) {
          case aspectRatio <= 1.2:
            logoStyle = "square";
            break;
          case aspectRatio < 1.4:
            logoStyle = "4/3";
            break;
          case aspectRatio < 4:
            logoStyle = "portrait";
            break;
          default:
            logoStyle = "landscape";
            break;
        }

        return (
          <header className="sticky left-0 top-0 z-[100] flex w-full flex-col border-b border-border bg-surface-primary dark:border-dark-border dark:bg-dark-surface-primary">
            <div className="flex h-[--header-height] bg-surface-primary dark:bg-dark-surface-primary">
              <div className="container mx-auto grid w-full grid-cols-header place-items-center content-center items-center px-6 first:*:justify-self-start">
                <ButtonLink unstyled className="flex items-center ring-offset-2" href="/">
                  <DarkLightImage
                    priority
                    alt="logo"
                    className={clsx("w-auto", {
                      "h-10": logoStyle === "square",
                      "h-9": logoStyle === "4/3",
                      "h-8": logoStyle === "portrait",
                      "h-6": logoStyle === "landscape",
                    })}
                    {...settings.logo}
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
