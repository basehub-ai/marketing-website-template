import { BaseHubImage } from "basehub/next-image";
import Link from "next/link";

import { Pump } from "basehub/react-pump";

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
              site: {
                changelog: {
                  socialLinksTitle: true,
                  socialLinks: { icon: { url: true }, url: true, _title: true, _id: true },
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
            const socialLinks = changelog.socialLinks;

            return (
              <div className={`flex items-center gap-2 md:flex-col ${socialLinksClassName}`}>
                <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                  {changelog.socialLinksTitle}
                </p>
                <div className="flex gap-2">
                  {socialLinks.map((link) => (
                    <Link
                      key={link._id}
                      className="aspect-square hover:brightness-90"
                      href={link.url}
                      target="_blank"
                    >
                      <BaseHubImage
                        priority
                        alt={link._title}
                        height={18}
                        src={link.icon?.url ?? ""}
                        width={18}
                      />
                    </Link>
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
