import Link from "next/link";
import clsx from "clsx";

import { fragmentOn } from "basehub";
import { AvatarsGroup } from "@/common/avatars-group";
import { Author } from "@/common/avatar";
import { authorFragment, darkLightImageFragment } from "@/lib/basehub/fragments";
import { formatDate } from "@/utils/dates";
import { DarkLightImage } from "@/common/dark-light-image";
import { ButtonLink } from "@/common/button";

export const blogpostCardFragment = fragmentOn("BlogPostComponent", {
  _id: true,
  _title: true,
  _slug: true,
  description: true,
  publishedAt: true,
  authors: authorFragment,
  image: darkLightImageFragment,
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
        <article className="border-b border-border py-2 text-base dark:border-dark-border">
          <ButtonLink
            key={post._id}
            unstyled
            className="lg:text-md grid w-full grid-cols-[auto_auto] place-content-start items-center justify-items-start rounded-lg p-4 text-text-secondary outline-none transition-colors hover:bg-surface-secondary dark:text-dark-text-secondary dark:hover:bg-dark-surface-secondary max-md:justify-items-start md:grid-cols-[50%,repeat(3,1fr)] md:*:first:place-items-start md:*:last:place-items-end"
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
          </ButtonLink>
        </article>
      );
    }
    case "card": {
      return (
        <Link
          key={post._id}
          className={clsx(
            "group flex flex-col self-stretch rounded-xl border transition-shadow [--heading-size:_1.1250rem]",
            "border-border bg-surface-secondary text-text-secondary hover:shadow-md dark:border-dark-border dark:bg-dark-surface-secondary dark:text-dark-text-secondary dark:hover:shadow dark:hover:shadow-grayscale-700",
            "outline-0 focus-visible:ring focus-visible:ring-accent-500",
            className,
          )}
          href={`/blog/${post._slug}`}
        >
          <figure
            className="overflow-hidden p-2"
            style={{ aspectRatio: post.image.light.aspectRatio }}
          >
            <DarkLightImage
              {...post.image}
              priority
              withPlaceholder
              className="h-full w-full rounded bg-surface-tertiary/20 object-cover dark:bg-dark-surface-tertiary/20"
              height={324}
              width={576}
            />
          </figure>
          <div className={clsx("flex flex-col justify-between gap-3 p-4")}>
            <header className="flex items-center justify-between gap-2">
              <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary lg:text-base">
                {formatDate(post.publishedAt)}
              </p>
              <AvatarsGroup animate>
                {post.authors.map((author) => (
                  <Author key={author._id} priority {...author} />
                ))}
              </AvatarsGroup>
            </header>
            <main className="flex flex-col gap-2 lg:flex-1">
              <h3 className="text-[length:var(--heading-size)] font-medium text-text-primary dark:text-dark-text-primary">
                {post._title}
              </h3>
              <p className="line-clamp-2 text-sm text-text-secondary dark:text-dark-text-secondary lg:text-base">
                {post.description}
              </p>
            </main>
          </div>
        </Link>
      );
    }
  }
}
