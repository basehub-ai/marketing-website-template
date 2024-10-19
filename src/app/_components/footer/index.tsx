import Image from "next/image";
import { BaseHubImage } from "basehub/next-image";

import { Pump } from "basehub/react-pump";

import { ThemeSwitcher } from "../theme-switcher";
import { ButtonLink } from "@/common/button";
import { DarkLightImageAutoscale } from "@/common/dark-light-image";
import Link from "next/link";

function isExternalLink(url: string | null | undefined) {
  return url && /^https?:\/\//.test(url);
}

export async function Footer() {
  return (
    <Pump
      queries={[
        {
          site: {
            settings: {
              logo: {
                dark: {
                  url: true,
                  height: true,
                  width: true,
                  alt: true,
                  aspectRatio: true,
                  blurDataURL: true,
                },
                light: {
                  url: true,
                  height: true,
                  width: true,
                  alt: true,
                  aspectRatio: true,
                  blurDataURL: true,
                },
              },
              showUseTemplate: true,
            },
            footer: {
              copyright: true,
              navbar: {
                items: {
                  _title: true,
                  url: true,
                },
              },
              socialLinks: {
                _title: true,
                icon: {
                  url: true,
                },
                url: true,
              },
            },
          },
        },
      ]}
    >
      {async ([
        {
          site: { footer, settings },
        },
      ]) => {
        "use server";

        return (
          <footer className="border-t border-border py-16 dark:border-dark-border">
            <div className="container mx-auto grid grid-cols-2 grid-rows-[auto_auto_auto] place-items-start items-center gap-y-7 px-6 sm:grid-cols-[1fr_auto_1fr] sm:grid-rows-2 sm:gap-x-3 sm:gap-y-16">
              <Link aria-label="Homepage" href="/">
                <DarkLightImageAutoscale priority {...settings.logo} />
              </Link>
              <nav className="col-start-1 row-start-2 flex flex-col gap-x-2 gap-y-3 self-center sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:flex-row sm:items-center sm:place-self-center md:gap-x-4 lg:gap-x-8">
                {footer.navbar.items.map(({ _title, url }) => (
                  <ButtonLink
                    key={_title}
                    unstyled
                    className="px-2 font-light tracking-tight text-text-tertiary hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
                    href={url ?? "#"}
                    target={isExternalLink(url) ? "_blank" : "_self"}
                  >
                    {_title}
                  </ButtonLink>
                ))}
              </nav>
              <div className="col-start-2 row-start-1 flex items-center gap-3 self-center justify-self-end sm:col-span-1 sm:col-start-3 sm:row-start-1">
                <p className="hidden text-text-tertiary dark:text-dark-text-tertiary sm:block">
                  Appearance
                </p>
                <ThemeSwitcher />
              </div>

              <p className="col-span-2 text-pretty text-sm text-text-tertiary dark:text-dark-text-tertiary sm:col-span-1 ">
                {footer.copyright}
              </p>

              <ul className="col-span-2 col-start-1 row-start-3 flex w-full items-center gap-x-3.5 gap-y-4 sm:col-span-1 sm:col-start-3 sm:row-start-2 sm:w-auto sm:flex-wrap sm:justify-self-end">
                {footer.socialLinks.map((link) => {
                  return (
                    <li key={link._title} className="shrink-0 first:sm:ml-auto">
                      <ButtonLink
                        unstyled
                        className="block aspect-square p-0.5 hover:brightness-75 dark:brightness-50 hover:dark:brightness-75"
                        href={link.url}
                        target="_blank"
                      >
                        <BaseHubImage
                          alt={link._title}
                          height={24}
                          src={link.icon?.url ?? ""}
                          width={24}
                        />
                      </ButtonLink>
                    </li>
                  );
                })}

                {settings.showUseTemplate ? (
                  <li>
                    <PoweredByBasehub className="ml-auto shrink-0" />
                  </li>
                ) : null}
              </ul>
            </div>
          </footer>
        );
      }}
    </Pump>
  );
}

function PoweredByBasehub({ className }: { className?: string }) {
  return (
    <ButtonLink
      unstyled
      className={className}
      href="https://basehub.com/basehub/marketing-website"
      target="_blank"
    >
      <Image
        alt="Use BaseHub Template"
        className="h-7 w-auto"
        height={28}
        src="https://basehub.com/template-button.svg"
        width={150}
      />
    </ButtonLink>
  );
}
