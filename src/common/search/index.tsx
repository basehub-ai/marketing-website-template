"use client";
import * as React from "react";
import { useSearch, SearchBox, type Hit } from "basehub/react-search";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { cx } from "class-variance-authority";
import * as Popover from "@radix-ui/react-popover";

import { getArticleSlugFromSlugPath } from "@/lib/basehub/utils";

export function SearchContent({ _searchKey }: { _searchKey: string }) {
  const search = useSearch({
    _searchKey,
    queryBy: ["_title", "body", "introduction"],
    // "description",
  });

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (search.query) setOpen(true);
    else setOpen(false);
  }, [search.query]);

  return (
    <SearchBox.Root search={search}>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Anchor asChild>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            className={cx(
              "ml-auto flex w-fit max-w-[280px] items-center gap-x-1 rounded-full border border-border px-3.5 py-2.5 focus-within:!border-neutral-500 dark:border-dark-border",
              search.query || "text-border dark:text-dark-border",
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
            <div className="relative max-h-[290px] min-h-20 w-[550px] overflow-y-auto  overscroll-y-contain rounded-xl border border-surface-tertiary bg-surface-primary p-2 shadow-md dark:border-dark-surface-tertiary dark:bg-dark-surface-primary">
              <SearchBox.Empty asChild>
                <div className="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2 items-center px-2 py-1 text-dark-text-tertiary">
                  No results for <span className="font-bold">&ldquo;{search.query}&rdquo;</span>
                </div>
              </SearchBox.Empty>

              <SearchBox.Placeholder>
                <div className="animate-pulse flex h-[54px] flex-col gap-y-0.5 rounded-md border border-transparent bg-surface-tertiary px-4 dark:bg-dark-surface-secondary" />
                <div className="animate-pulse mt-3 flex h-[54px] flex-col gap-y-0.5 rounded-md border border-transparent bg-surface-tertiary px-4 dark:bg-dark-surface-secondary" />
                <div className="animate-pulse mt-3 flex h-[54px] flex-col gap-y-0.5 rounded-md border border-transparent bg-surface-tertiary px-4 dark:bg-dark-surface-secondary" />
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
    <SearchBox.HitList>
      {hits.map((hit) => {
        let pathname = getArticleSlugFromSlugPath(hit.document._slugPath ?? "");

        // TODO is there an opportunity to build a helper function in our SDK here? looks like a common usecase
        const bodyHighlight = hit.highlights
          .map((h) => {
            if (!h.fieldPath.startsWith("body")) return;
            const splitted = h.fieldPath.split(".").slice(0, 2);
            const fullField = hit._getField(splitted.join("."));

            return fullField;
          })
          .filter(Boolean)[0] as { _id: string | undefined } | undefined;

        if (bodyHighlight?._id) {
          pathname += `#${bodyHighlight._id}`;
        }

        return (
          <div key={hit._key} className="relative w-full last:mb-2">
            <SearchBox.HitItem asChild hit={hit} href={pathname}>
              <NextLink
                className={cx(
                  "flex flex-col gap-y-0.5 rounded-md border border-transparent px-4 py-3 transition-colors",
                  "data-[selected='true']:border-surface-tertiary data-[selected='true']:bg-surface-secondary",
                  "dark:data-[selected='true']:border-dark-surface-tertiary dark:data-[selected='true']:bg-dark-surface-secondary",
                  "[&>*]:truncate [&_mark]:bg-transparent [&_mark]:text-neutral-500",
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
                  fieldPath="body"
                />
              </NextLink>
            </SearchBox.HitItem>
          </div>
        );
      })}
    </SearchBox.HitList>
  );
}

function HitTitleContainer({ children }: React.PropsWithChildren) {
  return <p className="leading-normal text-text-primary dark:text-dark-text-primary">{children}</p>;
}

function HitBodyContainer({ children }: React.PropsWithChildren) {
  return <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{children}</p>;
}

export function DialogTriggerMobile() {
  return (
    <button>
      <MagnifyingGlassIcon height={18} width={18} />
    </button>
  );
}
