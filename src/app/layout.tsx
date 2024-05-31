import type { Metadata } from "next";

import "./globals.scss";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { basehub } from ".basehub/index";

import { Providers } from "./providers";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { Newsletter } from "./_sections/newsletter/newsletter";
import { ThemeSwitcher } from "./_components/theme-switcher";

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await basehub({ cache: "no-store" }).query({
    site: {
      settings: {
        metadata: {
          sitename: true,
          titleTemplate: true,
          favicon: {
            url: true,
            mimeType: true,
          },
          ogImage: {
            url: true,
          },
        },
      },
    },
  });

  return {
    title: {
      default: "Home",
      template: data.site.settings.metadata.titleTemplate,
    },
    applicationName: data.site.settings.metadata.sitename,
    description: "Homepage",
    icons: [
      {
        url: data.site.settings.metadata.favicon.url,
        rel: "icon",
        type: data.site.settings.metadata.favicon.mimeType,
      },
    ],
    openGraph: {
      type: "website",
      images: [
        {
          url: data.site.settings.metadata.ogImage.url,
        },
      ],
    },
  };
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`min-h-svh bg-surface-primary text-text-primary dark:bg-dark-surface-primary dark:text-dark-text-primary ${GeistMono.variable} ${GeistSans.variable} overflow-x-clip font-sans`}
      >
        <Providers>
          <Header />
          <main className="min-h-[calc(100svh-var(--header-height))]">{children}</main>
          <ThemeSwitcher />
          <Newsletter />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
