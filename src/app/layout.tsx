import type { Metadata, Viewport } from "next";

import "./globals.scss";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { basehub } from "basehub";

import { Providers } from "./providers";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { Newsletter } from "./_sections/newsletter/newsletter";
import { draftMode } from "next/headers";

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await basehub({ cache: "no-store", draft: draftMode().isEnabled }).query({
    site: {
      settings: {
        metadata: {
          sitename: true,
          titleTemplate: true,
          defaultTitle: true,
          defaultDescription: true,
          favicon: {
            url: true,
            mimeType: true,
          },
          ogImage: {
            url: true,
          },
          xAccount: {
            url: true,
          },
        },
      },
    },
  });

  const images = [{ url: data.site.settings.metadata.ogImage.url }];

  let xAccount: string | undefined = undefined;

  if (data.site.settings.metadata.xAccount) {
    try {
      const xUrl = new URL(data.site.settings.metadata.xAccount.url);
      const split = xUrl.pathname.split("/");

      xAccount = split[split.length - 1];
    } catch (error) {
      // invalid url noop
    }
  }

  return {
    title: {
      default: data.site.settings.metadata.defaultTitle,
      template: data.site.settings.metadata.titleTemplate,
    },
    applicationName: data.site.settings.metadata.sitename,
    description: data.site.settings.metadata.defaultDescription,
    icons: [
      {
        url: data.site.settings.metadata.favicon.url,
        rel: "icon",
        type: data.site.settings.metadata.favicon.mimeType,
      },
    ],
    openGraph: { type: "website", images, siteName: data.site.settings.metadata.sitename },
    twitter: {
      card: "summary_large_image",
      images,
      site: data.site.settings.metadata.sitename,
      creator: xAccount,
    },
  };
};

export const viewport: Viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`min-h-svh max-w-[100vw] bg-surface-primary text-text-primary dark:bg-dark-surface-primary dark:text-dark-text-primary ${GeistMono.variable} ${GeistSans.variable} font-sans`}
      >
        <Providers>
          <Header />
          <main className="min-h-[calc(100svh-var(--header-height))]">{children}</main>
          <Newsletter />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
