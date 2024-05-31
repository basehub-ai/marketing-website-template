export const runtime = "edge";

export const revalidate = 60;

import { notFound } from "next/navigation";

import { basehub } from ".basehub";

import { ContentOGWrapperResponse } from "./content";

const isTheme = (theme: unknown): theme is "light" | "dark" =>
  theme === "light" || theme === "dark";

export const GET = async (request: Request) => {
  const searchParams = new URL(request.url).searchParams;
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const forcedTheme = searchParams.get("theme");

  if (forcedTheme && !isTheme(forcedTheme)) throw new Error("Invalid theme");

  if (!id) return notFound();

  let ogData;

  switch (type) {
    case "changelog":
      ogData = await getChangelogOgData(id);
      break;
    case "blogpost":
      ogData = await getBlogpostData(id);
      break;
    default:
      return notFound();
  }

  if (!ogData) return notFound();

  const { title, logo, accentColor, theme, subtitle } = ogData;

  return await ContentOGWrapperResponse({
    title,
    accentColor,
    logo,
    subtitle,
    theme: forcedTheme
      ? (forcedTheme as "light" | "dark")
      : theme !== "dark" && theme !== "light"
        ? "light"
        : theme,
  });
};

const getChangelogOgData = async (changelogPostId: string) => {
  const data = await basehub({
    next: { tags: ["basehub"] },
    cache: "no-store",
  }).query({
    site: {
      changelog: {
        posts: {
          __args: {
            filter: {
              _sys_id: { eq: changelogPostId },
            },
            first: 1,
          },
          items: {
            _title: true,
            excerpt: true,
          },
        },
      },
      settings: {
        logo: { url: true, alt: true },
        logoLite: { url: true, alt: true },
        metadata: {
          titleTemplate: true,
        },
        theme: {
          palette: true,
          preferedTheme: true,
        },
      },
    },
  });

  if (!data.site.changelog.posts.items.length) return null;

  return {
    title: `${data.site.changelog.posts.items[0]._title} ${data.site.settings.metadata.titleTemplate ?? ""}`,
    subtitle: data.site.changelog.posts.items[0].excerpt,
    theme: data.site.settings.theme.preferedTheme,
    logo: {
      url: data.site.settings.logoLite.url,
      alt: data.site.settings.logoLite.alt,
    },
    accentColor: data.site.settings.theme.palette,
  };
};

const getBlogpostData = async (blogpostId: string) => {
  const data = await basehub({
    next: { tags: ["basehub"] },
    cache: "no-store",
  }).query({
    site: {
      blog: {
        posts: {
          __args: {
            filter: {
              _sys_id: { eq: blogpostId },
            },
            first: 1,
          },
          items: {
            _title: true,
            introduction: true,
            authors: {
              _title: true,
            },
          },
        },
      },
      settings: {
        logo: { url: true, alt: true },
        logoLite: { url: true, alt: true },
        metadata: {
          titleTemplate: true,
        },
        theme: {
          palette: true,
          preferedTheme: true,
        },
      },
    },
  });

  if (!data.site.blog.posts.items.length) return null;

  return {
    title: `${data.site.blog.posts.items[0]._title} ${data.site.settings.metadata.titleTemplate ?? ""}`,
    subtitle: data.site.blog.posts.items[0].introduction,
    logo: {
      url: data.site.settings.logoLite.url,
      alt: data.site.settings.logoLite.alt,
    },
    accentColor: data.site.settings.theme.palette,
    theme: data.site.settings.theme.preferedTheme,
  };
};
