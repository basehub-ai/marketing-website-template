import type { Metadata, Viewport } from "next";

import "./globals.scss";
import { Geist, Geist_Mono } from "next/font/google";
import { basehub } from "basehub";

import { Providers } from "./providers";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { Newsletter } from "./_sections/newsletter/newsletter";
import { draftMode } from "next/headers";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  fallback: [
    "Inter",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif",
  ],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  fallback: ["monaco", "monospace"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await basehub({ cache: "no-store", draft: (await draftMode()).isEnabled }).query({
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
        className={`min-h-svh max-w-[100vw] bg-surface-primary text-text-primary dark:bg-dark-surface-primary dark:text-dark-text-primary ${geistMono.variable} ${geist.variable} font-sans`}
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
