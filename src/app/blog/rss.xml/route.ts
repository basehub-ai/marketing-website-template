import { basehub } from "basehub";
import { siteUrl } from "@/../next-sitemap.config";

export const dynamic = "force-static";

export async function GET() {
  const data = await basehub().query({
    site: {
      blog: {
        mainTitle: true,
        posts: {
          __args: {
            orderBy: "publishedAt__DESC",
          },
          items: {
            _title: true,
            _slug: true,
            description: true,
            publishedAt: true,
          },
        },
      },
    },
  });

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
          <channel>
              <title>${data.site.blog.mainTitle}</title>
              <link>${siteUrl}/blog</link>
              <language>en-us</language>${data.site.blog.posts.items
                .map((post) => {
                  return `
              <item>
                  <title>${post._title}</title>
                  <link>${siteUrl}/blog/${post._slug}</link>
                  <description>${post.description}</description>
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
