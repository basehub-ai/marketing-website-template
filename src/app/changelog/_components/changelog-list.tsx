"use client";
import * as React from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { BaseHubImage } from "basehub/next-image";
import clsx from "clsx";

import { ButtonLink } from "@/common/button";
import { AvatarsGroup } from "@/common/avatars-group";
import { formatDate } from "@/utils/dates";

import { type ChangelogListFragment } from "./changelog.fragment";
import { Author } from "@/common/avatar";

export function ChangelogList({ changelogPosts }: { changelogPosts: ChangelogListFragment[] }) {
  const [activePostId, setActivePostId] = React.useState(changelogPosts[0]?._id ?? "");
  const [prevPostId, setPrevPostId] = React.useState(changelogPosts[0]?._id ?? "");
  const prevPostIdRef = React.useRef(activePostId);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const postId = entry.target.getAttribute("data-post-id");

            if (postId) {
              setActivePostId(postId);
            }
          }
        });
      },
      {
        threshold: 1,
      },
    );

    document.querySelectorAll("[data-post-id]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changelogPosts]);

  React.useEffect(() => {
    setPrevPostId(prevPostIdRef.current);
    prevPostIdRef.current = activePostId;
  }, [activePostId]);

  const activeIdx = changelogPosts.findIndex((post) => post._id === activePostId);
  const prevPostIdx = changelogPosts.findIndex((post) => post._id === prevPostId);

  return (
    <div className="flex w-full flex-col">
      {changelogPosts.map((post, idx) => (
        <div
          key={post._id}
          className="group flex w-full flex-col gap-4 md:flex-row"
          data-post-id={post._id}
        >
          <div className="relative flex w-[110px] shrink-0 items-start justify-between">
            <p
              className={clsx(
                "relative bottom-1.5 text-sm text-text-tertiary dark:text-dark-text-tertiary",
                post._id === activePostId && "!text-accent-500",
                prevPostIdx === activeIdx - 1 && "delay-500",
              )}
            >
              {formatDate(post.publishedAt)}
            </p>
            <div
              className={clsx(
                "relative hidden h-full border-r border-border group-last:border-transparent dark:border-dark-border md:block",
              )}
            >
              <div
                className={clsx(
                  "absolute -left-[3.5px] top-0 size-2 transform rounded-full bg-grayscale-400 shadow-neon shadow-grayscale-400/10 transition-all dark:bg-grayscale-600 dark:shadow-grayscale-600/20",
                  {
                    "!bg-accent-500 !shadow-accent-500/10": activeIdx >= idx,
                    "delay-500": prevPostIdx === activeIdx - 1,
                  },
                )}
              />
              <div
                className={clsx(
                  "absolute -left-0 top-0 z-10 h-full w-px origin-top scale-y-0 transform-gpu rounded-full !bg-accent-500 !shadow-accent-500/10 transition-transform duration-500 group-last:hidden",
                  activeIdx - 1 === idx && "scale-y-100",
                  activeIdx > idx && "scale-y-100 delay-150",
                )}
              />
            </div>
          </div>
          <article className="mb-16 flex flex-col gap-6">
            <BaseHubImage
              alt={post._title}
              blurDataURL={post.image.blurDataURL}
              className="rounded-lg border border-border dark:border-dark-border"
              height={480}
              placeholder="blur"
              priority={idx === 0}
              src={post.image.url}
              width={647}
            />
            <div className="flex flex-col gap-1">
              <ButtonLink unstyled href={`/changelog/${post._slug}`}>
                <h2 className="text-xl font-medium">{post._title}</h2>
              </ButtonLink>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary md:text-base">
                {post.excerpt}
              </p>
            </div>
            <footer className="flex items-center justify-between">
              {post.authors.length > 1 ? (
                <AvatarsGroup animate>
                  {post.authors.map((author) => (
                    <Author key={author._id} {...author} />
                  ))}
                </AvatarsGroup>
              ) : post.authors[0] ? (
                <div className="flex items-center gap-2 rounded-full">
                  <BaseHubImage
                    alt={post.authors[0]._title}
                    height={24}
                    src={post.authors[0].image.url}
                    width={24}
                  />
                  <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                    {post.authors[0]._title}
                  </p>
                </div>
              ) : null}
              <ButtonLink
                href={`/changelog/${post._slug}`}
                icon={<ArrowRightIcon />}
                iconSide="right"
                intent="secondary"
                size="md"
                type="button"
              >
                Read more
              </ButtonLink>
            </footer>
          </article>
        </div>
      ))}
    </div>
  );
}
