import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { fragmentOn } from "basehub";
import { AvatarsGroup } from "@/common/avatars-group";
import { Author } from "@/common/avatar";
import { authorFragment } from "@/lib/basehub/fragments";
import { formatDate } from "@/utils/dates";

export const blogpostCardFragment = fragmentOn("BlogPostComponent", {
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

export function BlogpostCard({ type = "list", className, ...post }: BlogPostCard) {
  switch (type) {
    case "list": {
      return (
        <Link
          key={post._id}
          className="lg:text-md grid w-full grid-cols-[auto_auto] place-content-start items-center justify-items-start border-b border-border p-8 text-text-secondary transition-colors hover:bg-surface-secondary dark:border-dark-border dark:text-dark-text-secondary dark:hover:bg-dark-surface-secondary max-md:justify-items-start md:grid-cols-[50%,repeat(3,1fr)] md:*:first:place-items-start md:*:last:place-items-end"
          href={`/blog/${post._slug}`}
        >
          {/* <article className={clsx("", className)}> */}
          <h3 className="relative col-span-2 max-w-full justify-self-start pr-4 font-medium text-text-primary dark:text-dark-text-primary max-lg:line-clamp-2 md:col-span-1 lg:truncate">
            {post._title}
          </h3>
          <p className="col-span-2 md:col-span-1">
            {post.categories.length > 0 ? post.categories.join(",") : "No categories"}
          </p>
          <p className="max-md:mt-3">{formatDate(post.publishedAt)}</p>
          <div className="flex items-center justify-self-end">
            <AvatarsGroup animate>
              {post.authors.map((author) => (
                <Author key={author._id} {...author} />
              ))}
            </AvatarsGroup>
          </div>
          {/* </article> */}
        </Link>
      );
    }
    case "card": {
      return (
        <Link
          key={post._id}
          className={clsx(
            "group flex flex-col self-stretch rounded-xl border transition-shadow [--heading-size:_1.1250rem]",
            "border-border bg-surface-secondary text-text-secondary hover:shadow-md dark:border-dark-border dark:bg-dark-surface-secondary dark:text-dark-text-secondary dark:hover:shadow dark:hover:shadow-grayscale-700",
            "md:last:col-span-2 md:last:flex-row md:last:[--heading-size:_1.25rem]",
            "xl:flex-row xl:last:col-span-1 xl:last:[--heading-size:_1.1250rem] xl:first-of-type:col-span-1 xl:first-of-type:row-span-2 xl:first-of-type:flex-col xl:first-of-type:[--heading-size:_1.25rem]",
            "outline-none focus-visible:ring focus-visible:ring-accent-500",
            className,
          )}
          href={`/blog/${post._slug}`}
        >
          <figure className="p-2">
            <Image
              alt={post.image.url}
              blurDataURL={post.image.url}
              className="h-full max-h-[200px] flex-1 rounded object-cover md:!max-h-full"
              height={post.image.height}
              src={post.image.url}
              style={{ aspectRatio: post.image.aspectRatio }}
              width={post.image.width}
            />
          </figure>
          <div
            className={clsx(
              "flex flex-col justify-between gap-2 p-4",
              "md:min-w-[min(400px,100%)]",
              "lg:group-first:!max-w-full lg:group-first:flex-1",
              "xl:min-w-[min(400px,100%)]",
            )}
          >
            <header className="flex items-center justify-between gap-2">
              <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary lg:text-base">
                {formatDate(post.publishedAt)}
              </p>
              <AvatarsGroup animate>
                {post.authors.map((author) => (
                  <Author key={author._id} {...author} />
                ))}
              </AvatarsGroup>
            </header>
            <main className="flex flex-col gap-2 lg:flex-1">
              <h3 className="text-[length:var(--heading-size)] font-medium text-text-primary dark:text-dark-text-primary">
                {post._title}
              </h3>
              <p className="line-clamp-4 text-sm text-text-secondary dark:text-dark-text-secondary lg:flex-1 lg:text-base">
                {post.description}
              </p>
            </main>
          </div>
        </Link>
      );
    }
  }
}
