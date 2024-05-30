"use client";
import * as React from "react";
import { useSearch, SearchBox, type Hit } from "basehub/react-search";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { cx } from "class-variance-authority";
import * as ScrollArea from "@radix-ui/react-scroll-area";
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
          <label className="ml-auto flex w-fit max-w-[280px] items-center gap-x-1 rounded-full border border-border px-3.5 py-3 focus-within:!border-neutral-500 dark:border-dark-border">
            <MagnifyingGlassIcon
              className="pointer-events-none size-5 shrink-0"
              color="currentColor"
            />
            <SearchBox.Input
              asChild
              onFocus={() => {
                search.query && setOpen(true);
              }}
            >
              <input
                className="grow bg-transparent outline-none"
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
            <ScrollArea.Root className="relative h-[290px] max-h-[290px] w-[550px] overflow-hidden rounded-xl border border-surface-tertiary bg-surface-primary p-2 shadow-md">
              <ScrollArea.Viewport className="h-full w-full overscroll-y-contain rounded-xl [&>div]:!block">
                <SearchBox.Empty asChild>
                  <div className="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2 items-center px-2 py-1 text-lg text-dark-text-tertiary">
                    No results for <span className="font-bold">&ldquo;{search.query}&rdquo;</span>
                  </div>
                </SearchBox.Empty>

                <HitList hits={search.result?.hits ?? []} />
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="flex h-full w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-full bg-border dark:bg-dark-border" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner />
            </ScrollArea.Root>
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
  return <p className="leading-normal text-text-primary">{children}</p>;
}

function HitBodyContainer({ children }: React.PropsWithChildren) {
  return <p className="text-sm text-text-secondary">{children}</p>;
}

export function DialogTriggerMobile() {
  return (
    <button>
      <MagnifyingGlassIcon height={18} width={18} />
    </button>
  );
}
