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
    queryBy: ["_title", "body", "introduction", "categories", "authors"],
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
            className={cx(
              "ml-auto flex w-full items-center gap-x-1 rounded-full border border-border px-3.5 py-2.5 focus-within:!border-neutral-500 dark:border-dark-border md:max-w-[280px]",
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
            <div className="relative mx-5 min-h-20 w-[calc(100vw_-_2.5rem)] overflow-y-auto overscroll-y-contain rounded-xl border border-surface-tertiary bg-surface-primary p-2 shadow-md dark:border-dark-surface-tertiary dark:bg-dark-surface-primary md:mx-0 md:max-h-[290px] md:w-[550px]">
              <SearchBox.Empty asChild>
                <div className="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2 items-center px-2 py-1 text-dark-text-tertiary">
                  No results for <span className="font-bold">&ldquo;{search.query}&rdquo;</span>
                </div>
              </SearchBox.Empty>

              <SearchBox.Placeholder>
                <div className="flex h-[64px] animate-pulse flex-col gap-y-0.5 rounded-md border border-transparent bg-surface-tertiary px-4 dark:bg-dark-surface-secondary" />
                <div className="mt-3 flex h-[64px] animate-pulse flex-col gap-y-0.5 rounded-md border border-transparent bg-surface-tertiary px-4 dark:bg-dark-surface-secondary" />
                <div className="mt-3 flex h-[64px] animate-pulse flex-col gap-y-0.5 rounded-md border border-transparent bg-surface-tertiary px-4 dark:bg-dark-surface-secondary" />
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
        const bodyHighlight = hit._getFieldHighlight("body");

        if (
          bodyHighlight?.highlightedField?._type === "rich-text-section" &&
          bodyHighlight.highlightedField._id
        ) {
          pathname += `#${bodyHighlight.highlightedField._id}`;
        }

        return (
          <div key={hit._key} className="relative w-full last:mb-2">
            <SearchBox.HitItem asChild hit={hit} href={pathname}>
              <NextLink
                className={cx(
                  "grid grid-cols-[1fr_auto] grid-rows-[auto_1fr_auto] gap-x-1 gap-y-0.5 rounded-md border border-transparent px-4 py-3 transition-colors",
                  "data-[selected='true']:border-surface-tertiary data-[selected='true']:bg-surface-secondary",
                  "dark:data-[selected='true']:border-dark-surface-tertiary dark:data-[selected='true']:bg-dark-surface-secondary",
                  "[&_mark]:bg-transparent [&_mark]:text-neutral-500",
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
                  fallbackFieldPaths={["introduction"]}
                  fieldPath="body"
                />
                <SearchBox.HitSnippet
                  components={{
                    container: HitAvatarContainer,
                    // text: ({ children }) => {
                    //   return <span>children</span>;
                    // },
                  }}
                  // fallbackFieldPaths={[
                  //   "authors.1._title",
                  //   "authors.2._title",
                  //   "authors.3._title",
                  //   "authors.4._title",
                  //   "authors.5._title",
                  // ]}
                  fieldPath="authors"
                />
                <SearchBox.HitSnippet
                  components={{
                    container: HitCategoryContainer,
                  }}
                  fieldPath="categories"
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
  return (
    <p className="col-span-full truncate leading-normal text-text-primary dark:text-dark-text-primary">
      {children}
    </p>
  );
}

function HitBodyContainer({ children }: React.PropsWithChildren) {
  return (
    <p className="col-span-full line-clamp-2 text-sm text-text-secondary dark:text-dark-text-secondary">
      {children}
    </p>
  );
}

const getNodeText = (node: React.ReactNode): string | number => {
  if (["string", "number"].includes(typeof node)) return node as string | number;
  if (node instanceof Array) return node.map(getNodeText).join("");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  if (typeof node === "object" && node && "props" in node) return getNodeText(node.props.children);
  throw new Error(`Unsupported node type: ${typeof node}`);
};

function HitAvatarContainer({ children }: React.PropsWithChildren) {
  console.log(getNodeText(children));

  return <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">{children}</p>;
}

function HitCategoryContainer({ children }: React.PropsWithChildren) {
  return <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">{children}</p>;
}
