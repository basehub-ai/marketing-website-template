import { buttonFragment } from "@/lib/basehub/fragments";
import { fragmentOn } from "basehub";
import { Pump } from "basehub/react-pump";
import { RichText, type RichTextProps } from "basehub/react-rich-text";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";

export const formWrapperFragment = fragmentOn("FormWrapperComponent", {
  title: true,
  subtitle: {
    json: {
      content: true,
    },
  },
  cta: buttonFragment,
});

export async function AuthLayout({
  children,
  title,
  subtitle,
}: {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col px-6 pb-20 pt-10">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-5 rounded-xl border border-border bg-surface-secondary p-5 dark:border-dark-border dark:bg-dark-surface-secondary">
        <header className="flex flex-col gap-3">
          <Pump
            queries={[
              {
                site: {
                  settings: {
                    logoLite: {
                      url: true,
                      width: true,
                      height: true,
                    },
                  },
                },
              },
            ]}
          >
            {async ([
              {
                site: {
                  settings: { logoLite },
                },
              },
            ]) => {
              "use server";

              return (
                <Image
                  priority
                  alt="Logo"
                  className="size-8 self-start"
                  height={logoLite.height}
                  src={logoLite.url}
                  width={logoLite.width}
                />
              );
            }}
          </Pump>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
              {subtitle}
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}

export function RichTextFormWrapper({ children }: RichTextProps) {
  return (
    <RichText
      components={{
        a: CustomAnchor,
      }}
    >
      {children}
    </RichText>
  );
}

function CustomAnchor({
  children,
  ...props
}: React.AllHTMLAttributes<HTMLAnchorElement> & LinkProps) {
  return (
    <Link className="text-accent-500 hover:underline" {...props}>
      {children}
    </Link>
  );
}
