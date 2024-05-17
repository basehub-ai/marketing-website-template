import {cx} from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

import {fragmentOn} from ".basehub/schema";
import {AvatarsGroup} from "@/common/avatars-group";
import {Author} from "@/common/basehub-avatar";
import {authorFragment} from "@/lib/basehub/fragments";

export const blogpostCardFragment = fragmentOn("BlogpostsItem", {
  _id: true,
  _title: true,
  _slug: true,
  description: true,
  publishedAt: true,
  authors: authorFragment,
  image: {
    alt: true,
    width: true,
    height: true,
    aspectRatio: true,
    url: {
      __args: {
        quality: 60,
        format: "webp",
      },
    },
  },
  categories: true,
});

type BlogpostCardFragment = fragmentOn.infer<typeof blogpostCardFragment>;
type BlogPostCard = {
  type?: "card" | "list";
  className?: string;
} & BlogpostCardFragment;

export function BlogpostCard({type = "list", className, ...post}: BlogPostCard) {
  switch (type) {
    case "list": {
      return (
        <Link
          key={post._id}
          className="outline-none ring-neutral-500 focus-visible:ring"
          href={`/blog/${post._slug}`}
        >
          <article
            className={cx(
              "lg:text-md grid grid-cols-[2fr,repeat(3,1fr)] place-items-center items-center border-b border-border px-4 py-6 text-text-secondary *:first:place-items-start *:last:place-items-end hover:bg-surface-secondary dark:border-dark-border dark:text-dark-text-secondary dark:hover:bg-dark-surface-secondary",
              className,
            )}
          >
            <h3 className="justify-self-start font-medium text-text-primary dark:text-dark-text-primary">
              {post._title}
            </h3>
            <p>{post.categories.length > 0 ? post.categories.join(",") : "No categories"}</p>
            <p>
              {new Date(post.publishedAt).toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <div className="flex items-center justify-self-end">
              <AvatarsGroup>
                {post.authors.map((author) => (
                  <Author key={author._id} {...author} />
                ))}
              </AvatarsGroup>
            </div>
          </article>
        </Link>
      );
    }
    case "card": {
      return (
        <Link
          key={post._id}
          className={cx(
            "group flex flex-col self-stretch rounded-xl border",
            "border-border hover:bg-surface-tertiary dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-secondary",
            "md:last:col-span-2 md:last:flex-row",
            "xl:flex-row xl:first:col-span-1 xl:first:row-span-2 xl:first:flex-col xl:last:col-span-1",
            "outline-none focus-visible:ring focus-visible:ring-neutral-500",
            className,
          )}
          href={`/blog/${post._slug}`}
        >
          <figure className="p-1">
            <Image
              alt={post.image.url}
              blurDataURL={post.image.url}
              className="h-full max-h-[200px] flex-1 rounded-xl md:!max-h-full"
              height={post.image.height}
              src={post.image.url}
              style={{aspectRatio: post.image.aspectRatio}}
              width={post.image.width}
            />
          </figure>
          <div
            className={cx(
              "flex flex-col justify-between gap-4 p-4",
              "md:max-w-[400px]",
              "lg:max-w-[500px] lg:group-first:!max-w-full lg:group-first:flex-1",
              "xl:max-w-[300px]",
            )}
          >
            <header className="flex items-center justify-between gap-2">
              <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary lg:text-base">
                {new Date(post.publishedAt).toLocaleString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <AvatarsGroup>
                {post.authors.map((author) => (
                  <Author key={author._id} {...author} />
                ))}
              </AvatarsGroup>
            </header>
            <main className="flex flex-col gap-2 lg:flex-1">
              <h3 className="text-xl font-medium lg:flex-1 lg:text-2xl">{post._title}</h3>
              <p className="line-clamp-4 text-sm text-text-secondary dark:text-dark-text-secondary lg:text-base">
                {post.description}
              </p>
            </main>
          </div>
        </Link>
      );
    }
  }
}
