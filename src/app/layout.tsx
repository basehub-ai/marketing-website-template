import type { Metadata } from "next";

import "./globals.scss";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { basehub } from ".basehub/index";

import { BaseHubThemeProvider } from "../context/basehub-theme-provider";

import { Providers } from "./providers";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { Newsletter } from "./_sections/newsletter/newsletter";
import { ThemeSwitcher } from "./_components/theme-switcher";

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await basehub({ cache: "no-store" }).query({
    settings: {
      metadata: {
        sitename: true,
        titleTemplate: true,
        favicon: {
          url: true,
          mimeType: true,
        },
      },
    },
  });

  return {
    title: `Home ${data.settings.metadata.titleTemplate ?? ""}`,
    description: "Homepage",
    icons: [
      {
        url: data.settings.metadata.favicon.url,
        rel: "icon",
        type: data.settings.metadata.favicon.mimeType,
      },
    ],
  };
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`min-h-svh bg-surface-primary text-text-primary dark:bg-dark-surface-primary dark:text-dark-text-primary ${GeistMono.variable} ${GeistSans.variable} overflow-x-clip font-sans`}
      >
        <Providers>
          <BaseHubThemeProvider />
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
