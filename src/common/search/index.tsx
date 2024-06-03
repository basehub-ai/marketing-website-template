"use client";
import * as React from "react";
import { useSearch, SearchBox, type Hit } from "basehub/react-search";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import clsx from "clsx";
import * as Popover from "@radix-ui/react-popover";

import { useSearchHits } from "@/context/search-hits-context";
import { type AuthorFragment } from "@/lib/basehub/fragments";
import { getArticleSlugFromSlugPath } from "@/lib/basehub/utils";

import { Avatar } from "../avatar";
import { AvatarsGroup } from "../avatars-group";

export function SearchContent({ _searchKey }: { _searchKey: string }) {
  const search = useSearch({
    _searchKey,
    queryBy: ["_title", "body", "description", "categories", "authors"],
    limit: 20,
  });

  const [open, setOpen] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (search.query) setOpen(true);
    else setOpen(false);
  }, [search.query]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && event.metaKey) {
        event.preventDefault();
        searchInputRef.current?.blur();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <SearchBox.Root search={search}>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Anchor asChild>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            className={clsx(
              "focus-within:!border-accent-500 ml-auto  flex w-full items-center gap-x-1 rounded-full border border-border px-3.5 py-2.5 dark:border-dark-border md:max-w-[280px]",
              search.query || "text-text-tertiary dark:text-dark-text-tertiary opacity-70",
            )}
          >
            <MagnifyingGlassIcon
              className="pointer-events-none size-5 shrink-0 transition-colors duration-75"
              color="currentColor"
            />
            <SearchBox.Input
              asChild
              onFocus={() => {
                search.query && setOpen(true);
              }}
            >
              <input
                ref={searchInputRef}
                className="grow bg-transparent outline-none placeholder:text-[inherit]"
                placeholder="Search"
                type="text"
              />
            </SearchBox.Input>
          </label>
        </Popover.Anchor>

        <Popover.Portal>
          <Popover.Content
            asChild
            align="end"
            className="z-modal"
            sideOffset={16}
            onOpenAutoFocus={(e) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
              e.preventDefault();
            }}
          >
            <div className="relative mx-5 min-h-20 w-[calc(100vw_-_2.5rem)] scroll-py-3 overflow-y-auto overscroll-y-contain rounded-xl border border-surface-tertiary bg-surface-primary p-2 shadow-md dark:border-dark-surface-tertiary dark:bg-dark-surface-primary md:mx-0 md:max-h-[320px] md:w-[550px]">
              <SearchBox.Empty asChild>
                <div className="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2 items-center px-2 py-1 text-dark-text-tertiary">
                  No results for <span className="font-bold">&ldquo;{search.query}&rdquo;</span>
                </div>
              </SearchBox.Empty>

              <SearchBox.Placeholder className="space-y-2">
                <div className="box-content h-[88px] animate-pulse rounded-md bg-surface-tertiary px-4 py-3 dark:bg-dark-surface-secondary" />
                <div className="box-content h-[88px] animate-pulse rounded-md bg-surface-tertiary px-4 py-3 dark:bg-dark-surface-secondary" />
                <div className="box-content h-[88px] animate-pulse rounded-md bg-surface-tertiary px-4 py-3 dark:bg-dark-surface-secondary" />
              </SearchBox.Placeholder>

              <HitList hits={search.result?.hits ?? []} />
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </SearchBox.Root>
  );
}

function HitList({ hits }: { hits: Hit[] }) {
  return (
    <SearchBox.HitList className="space-y-2">
      {hits.map((hit) => {
        let pathname = getArticleSlugFromSlugPath(hit.document._slugPath ?? "");
        const bodyHighlight = hit._getFieldHighlight("body");

        if (
          bodyHighlight?.highlightedField?._type === "rich-text-section" &&
          bodyHighlight.highlightedField._id
        ) {
          pathname += `#${bodyHighlight.highlightedField._id}`;
        }

        const field = hit._getField("authors");
        let firstHighlightedAuthorId: string | undefined = undefined;

        for (const h of hit.highlights) {
          if (h.fieldPath.startsWith("authors")) {
            const index = h.fieldPath.split(".")[1];
            const id = hit._getField(`authors.${index}._id`);

            if (typeof id === "string") {
              firstHighlightedAuthorId = id;
            }
            break;
          }
        }

        return (
          <div key={hit._key} className="relative w-full last:mb-2">
            <SearchBox.HitItem asChild hit={hit} href={pathname}>
              <NextLink
                className={clsx(
                  "flex grid-rows-[auto_1fr_auto] flex-col gap-y-0.5 rounded-md px-4 py-3 transition-colors",
                  "data-[selected='true']:bg-surface-tertiary",
                  "data-[selected='true']:dark:bg-dark-surface-tertiary",
                  "[&_mark]:text-accent-500 [&_mark]:bg-transparent",
                )}
                href={pathname}
              >
                <SearchBox.HitSnippet
                  components={{
                    container: HitTitleContainer,
                  }}
                  fieldPath="_title"
                />
                <SearchBox.HitSnippet
                  components={{
                    container: HitBodyContainer,
                  }}
                  fallbackFieldPaths={["description"]}
                  fieldPath="body"
                />
                <div className="mt-3 flex justify-between gap-x-1">
                  <CustomAvatarHit
                    authors={field as AuthorFragment[]}
                    match={firstHighlightedAuthorId}
                  />
                  <SearchBox.HitSnippet
                    components={{
                      container: HitContainer,
                    }}
                    fieldPath="categories"
                  />
                </div>
              </NextLink>
            </SearchBox.HitItem>
          </div>
        );
      })}
    </SearchBox.HitList>
  );
}

function HitTitleContainer({ children }: React.PropsWithChildren) {
  return (
    <p className="truncate leading-normal text-text-primary dark:text-dark-text-primary">
      {children}
    </p>
  );
}

function HitBodyContainer({ children }: React.PropsWithChildren) {
  return <p className="text-text-tertiary dark:text-dark-text-tertiary truncate text-sm">{children}</p>;
}

function CustomAvatarHit({
  match,
  authors,
}: {
  match: string | undefined;
  authors: { _title: string; _id: string }[];
}) {
  const { authorsAvatars } = useSearchHits();

  if (match) {
    return (
      <div className="flex items-center gap-x-1.5">
        <Avatar {...authorsAvatars[match]} />
        <SearchBox.HitSnippet
          components={{
            container: HitContainer,
          }}
          fieldPath="authors"
        />
      </div>
    );
  }

  return (
    <AvatarsGroup>
      {authors.map((author) => {
        const avatar = authorsAvatars[author._id];

        return <Avatar key={author._id} {...avatar} alt={author._title} />;
      })}
    </AvatarsGroup>
  );
}

function HitContainer({ children }: React.PropsWithChildren) {
  return <p className="text-text-secondary dark:text-dark-text-secondary text-sm">{children}</p>;
}
