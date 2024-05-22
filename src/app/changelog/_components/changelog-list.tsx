"use client";
import React from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { cx } from "class-variance-authority";

import { ButtonLink } from "@/common/button";
import { AvatarsGroup } from "@/common/avatars-group";

import { type ChangelogListFragment } from "./changelog.fragment";

export function ChangelogList({ changelogPosts }: { changelogPosts: ChangelogListFragment[] }) {
  const [activePostId, setActivePostId] = React.useState(changelogPosts[0]._id);
  const [prevPostId, setPrevPostId] = React.useState(changelogPosts[0]._id);
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
              className={cx(
                "relative bottom-1.5 text-sm text-text-tertiary dark:text-dark-text-tertiary",
                post._id === activePostId && "!text-neutral-500",
                prevPostIdx === activeIdx - 1 && "delay-500",
              )}
            >
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
            <div
              className={cx(
                "relative hidden h-full border-r border-border group-last:border-transparent dark:border-dark-border md:block",
              )}
            >
              <div
                className={cx(
                  "absolute -left-[3.5px] top-0 size-2 transform rounded-full bg-text-tertiary shadow-neon shadow-text-tertiary/10 transition-all dark:bg-dark-text-tertiary dark:shadow-dark-text-tertiary/20",
                  {
                    "!bg-neutral-500 !shadow-neutral-500/10": post._id === activePostId,
                    "delay-500": prevPostIdx === activeIdx - 1,
                  },
                )}
              />
              <div
                className={cx(
                  "absolute -left-0 top-0 z-10 h-full w-px origin-top scale-y-0 transform-gpu rounded-full !bg-neutral-500 !shadow-neutral-500/10 transition-transform duration-500 group-last:hidden",
                  activeIdx - 1 === idx && "scale-y-100",
                  activeIdx > idx && "scale-y-100 delay-150",
                )}
              />
            </div>
          </div>
          <article className="mb-16 flex flex-col gap-6">
            <Image
              alt={post._title}
              className="rounded-lg border border-border dark:border-dark-border"
              height={480}
              src={post.image.url}
              width={647}
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-medium">{post._title}</h2>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary md:text-base">
                {post.excerpt}
              </p>
            </div>
            <footer className="flex items-center justify-between">
              {post.authors.length > 1 ? (
                <AvatarsGroup>
                  {post.authors.map((author) => (
                    <Image
                      key={author._id}
                      alt={author._title}
                      height={24}
                      src={author.image.url}
                      width={24}
                    />
                  ))}
                </AvatarsGroup>
              ) : (
                <div className="flex items-center  gap-2">
                  <Image
                    alt={post.authors[0]._title}
                    height={24}
                    src={post.authors[0].image.url}
                    width={24}
                  />
                  <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                    {post.authors[0]._title}
                  </p>
                </div>
              )}
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
