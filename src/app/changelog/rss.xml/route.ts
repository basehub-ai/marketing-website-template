import { basehub } from "basehub";
import { siteUrl } from "@/../next-sitemap.config";
import { BASEHUB_REVALIDATE_TIME } from "@/lib/basehub/constants";

export async function GET() {
  const data = await basehub({ next: { revalidate: BASEHUB_REVALIDATE_TIME } }).query({
    site: {
      changelog: {
        title: true,
        subtitle: true,
        posts: {
          __args: {
            orderBy: "publishedAt__DESC",
          },
          items: {
            _title: true,
            _slug: true,
            excerpt: true,
            publishedAt: true,
          },
        },
      },
    },
  });

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
          <channel>
              <title>${data.site.changelog.title}</title>
              <description>${data.site.changelog.subtitle}</description>
              <link>${siteUrl}/changelog</link>
              <language>en-us</language>${data.site.changelog.posts.items
                .map((post) => {
                  return `
              <item>
                  <title>${post._title}</title>
                  <link>${siteUrl}/changelog/${post._slug}</link>
                  <description>${post.excerpt}</description>
                  <pubDate>${post.publishedAt}</pubDate>
              </item>`;
                })
                .join("")}
          </channel>
      </rss>`;

  return new Response(feed, {
    status: 200,
    headers: { "Content-Type": "application/rss+xml" },
  });
}
