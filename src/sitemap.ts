import { basehub } from "basehub";
import type { MetadataRoute } from "next";
const siteHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || "nextjs-marketing-website.basehub.com";
const siteUrl = `https://${siteHost}`;

export const revalidate = 30; // revalidate at most every 30 minutes

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await basehub().query({
    site: {
      pages: {
        items: {
          pathname: true,
        },
      },
      blog: {
        posts: {
          items: {
            _slug: true,
          },
        },
      },
      changelog: {
        posts: {
          items: {
            _slug: true,
          },
        },
      },
    },
  });

  let index = 1;
  const formattedPages = data.site.pages.items.map(
    (page) =>
      ({
        url: `${siteUrl}${page.pathname}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: index++,
      }) satisfies MetadataRoute.Sitemap[number],
  );

  const formattedBlogPosts = data.site.blog.posts.items.map(
    (post) =>
      ({
        url: `${siteUrl}/blog/${post._slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: index++,
      }) satisfies MetadataRoute.Sitemap[number],
  );

  const formattedChangelogPosts = data.site.changelog.posts.items.map(
    (post) =>
      ({
        url: `${siteUrl}/changelog/${post._slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: index++,
      }) satisfies MetadataRoute.Sitemap[number],
  );

  const routes = [...formattedPages, ...formattedBlogPosts, ...formattedChangelogPosts];
  console.log("REVALIDATING SITEMAP");
  console.log(routes);
  return routes;
}
