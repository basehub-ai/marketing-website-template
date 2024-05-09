import {cx} from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

import {Pump} from ".basehub/react-pump";

export async function Footer() {
  return (
    <Pump
      queries={[
        {
          footer: {
            copyright: true,
            navbar: {
              items: {
                _title: true,
                url: true,
              },
            },
            socialLinks: {
              items: {
                _title: true,
                icon: {
                  url: true,
                },
                url: true,
              },
            },
            poweredByBaseHub: true,
          },
        },
      ]}
    >
      {async ([data]) => {
        "use server";

        return (
          <footer className="border-t border-border px-6 py-16 dark:border-dark-border">
            <div className="container mx-auto grid grid-cols-[auto_auto] grid-rows-[auto_auto_auto] place-items-start items-center gap-y-7 sm:grid-cols-[1fr_auto_1fr] sm:grid-rows-2 sm:gap-y-16">
              <Image alt="logo" height={100} src="/acme.svg" width={100} />
              <nav className="col-start-1 row-start-2 flex flex-col gap-3 self-center sm:col-span-2 sm:col-start-2 sm:row-start-1 sm:flex-row sm:items-center sm:gap-8 sm:place-self-end">
                {data.footer.navbar.items.map(({_title, url}) => (
                  <Link
                    key={_title}
                    className="font-light tracking-tight text-text-secondary hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
                    href={url}
                  >
                    {_title}
                  </Link>
                ))}
              </nav>
              {data.footer.poweredByBaseHub ? (
                <PoweredByBasehub className="col-start-2 col-end-3 row-start-1 place-self-end self-center sm:col-start-2 sm:row-start-2 sm:translate-y-1.5 sm:transform sm:place-self-center sm:self-end" />
              ) : null}
              <div className="col-span-2 flex flex-col items-start gap-3 sm:col-span-1">
                <span className="inline-flex items-center gap-1 text-[#14C9A2]">
                  <span className="size-1.5 rounded-full bg-[#14C9A2]" />
                  <span className="text-xs">All systems operational</span>
                </span>
                <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary ">
                  @ 2024 Acme Corp. All rights reserved.
                </p>
              </div>
              <ul className="col-start-2 row-start-2 flex items-center gap-8 place-self-end self-end sm:col-start-3 sm:row-start-2 sm:self-end">
                {data.footer.socialLinks.items.map((link) => {
                  return (
                    <li key={link._title}>
                      <Link className="aspect-square hover:brightness-75" href={link.url}>
                        <Image alt={link._title} height={20} src={link.icon.url} width={20} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </footer>
        );
      }}
    </Pump>
  );
}

function PoweredByBasehub({className}: {className?: string}) {
  return (
    <span
      className={cx(
        "inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs text-text-secondary dark:border-dark-border dark:text-dark-text-secondary",
        className,
      )}
    >
      <Image alt="basehub" height={16} src="/basehub.svg" width={12} />
      <span>
        Powered by{" "}
        <Link className="text-text-primary dark:text-dark-text-primary" href="https://basehub.com">
          BaseHub
        </Link>
      </span>
    </span>
  );
}
