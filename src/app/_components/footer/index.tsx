import Image from "next/image";
import Link from "next/link";
import { draftMode } from "next/headers";

import { Pump } from "basehub/react-pump";

import { ThemeSwitcher } from "../theme-switcher";

function isExternalLink(url: string | null | undefined) {
  return url && /^https?:\/\//.test(url);
}

export async function Footer() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }}
      queries={[
        {
          site: {
            header: {
              logo: {
                alt: true,
                url: true,
                width: true,
                height: true,
              },
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
              poweredByBaseHub: true,
            },
          },
        },
      ]}
    >
      {async ([
        {
          site: { footer, header },
        },
      ]) => {
        "use server";

        return (
          <footer className="border-t border-border px-6 py-16 dark:border-dark-border">
            <div className="container mx-auto grid grid-cols-2 grid-rows-[auto_auto_auto] place-items-start items-center gap-y-7 sm:grid-cols-3 sm:grid-rows-2 sm:gap-y-16">
              <Image
                {...header.logo}
                alt={header.logo.alt ?? ""}
                className="max-h-[100px] max-w-[100px] dark:invert"
                src={header.logo.url}
              />
              <nav className="col-start-1 row-start-2 flex flex-col gap-x-8 gap-y-3 self-center sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:flex-row sm:items-center sm:place-self-center">
                {footer.navbar.items.map(({ _title, url }) => (
                  <Link
                    key={_title}
                    className="font-light tracking-tight text-text-secondary hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
                    href={url ?? "#"}
                    target={isExternalLink(url) ? "_blank" : "_self"}
                  >
                    {_title}
                  </Link>
                ))}
              </nav>
              <div className="col-start-2 row-start-1 flex items-center gap-3 self-center justify-self-end sm:col-span-1 sm:col-start-3 sm:row-start-1">
                <p className="hidden text-sm text-text-tertiary dark:text-dark-text-tertiary sm:block">
                  Preferences
                </p>
                <ThemeSwitcher />
              </div>

              <div className="col-span-2 flex flex-col items-start gap-3 sm:col-span-1">
                <span className="inline-flex items-center gap-1 text-success">
                  <span className="size-1.5 rounded-full bg-success" />
                  <span className="text-[13px]">All systems operational</span>
                </span>
                <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary ">
                  @ 2024 Acme Corp. All rights reserved.
                </p>
              </div>
              <ul className="col-span-2 col-start-1 row-start-3 flex w-full items-center gap-x-3.5 gap-y-4 sm:col-span-1 sm:col-start-3 sm:row-start-2 sm:w-auto sm:flex-wrap sm:justify-self-end">
                {footer.socialLinks.map((link) => {
                  return (
                    <li key={link._title} className="shrink-0 first:sm:ml-auto">
                      <Link
                        className="aspect-square hover:brightness-75"
                        href={link.url}
                        target="_blank"
                      >
                        <Image
                          alt={link._title}
                          height={24}
                          src={link.icon?.url ?? ""}
                          width={24}
                        />
                      </Link>
                    </li>
                  );
                })}

                {footer.poweredByBaseHub ? <PoweredByBasehub className="ml-auto shrink-0" /> : null}
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
    <Link
      className={className}
      href="https://basehub.com/basehub/marketing-website"
      target="_blank"
    >
      <Image
        alt="Edit in BaseHub"
        height={28}
        src="https://basehub.com/edit-in-basehub.svg"
        width={150}
      />
    </Link>
  );
}
