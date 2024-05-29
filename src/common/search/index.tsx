"use client";
import * as React from "react";
import { useSearch, SearchBox, type Hit } from "basehub/react-search";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { clsx } from "clsx";
import { cx } from "class-variance-authority";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import { getArticleSlugFromSlugPath } from "@/lib/basehub/utils";

import s from "./search.module.scss";

function DialogContent() {
  const search = SearchBox.useContext();

  return (
    <div className={cx(s["search-dialog__content"], "max-w-[550px]")}>
      <div className="flex h-full flex-col">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="mx-2 mt-2 flex gap-x-1">
          <MagnifyingGlassIcon color="currentColor" />
          <input placeholder="Search" type="text" />
        </label>
        {/* <Separator mt="2" size="4" /> */}

        <ScrollArea.Root>
          <ScrollArea.Viewport asChild>
            <div className={cx("flex-1 px-2", s["search-dialog__results"])}>
              <SearchBox.Empty asChild>
                <div className="flex items-center px-2 py-1">
                  <span
                    className={cx(
                      "text-sm text-dark-text-tertiary",
                      s["search-dialog__empty-state"],
                    )}
                  >
                    No results for <span className="font-bold">&ldquo;{search.query}&rdquo;</span>
                  </span>
                </div>
              </SearchBox.Empty>
              <SearchBox.Placeholder asChild>
                <div className="flex items-center px-2 py-1">
                  <span
                    className={cx(
                      "text-sm text-dark-text-tertiary",
                      s["search-dialog__empty-state"],
                    )}
                  >
                    No recent searches.
                  </span>
                </div>
              </SearchBox.Placeholder>

              <HitList hits={search.result?.hits ?? []} />
            </div>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      </div>
    </div>
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
          <div key={hit._key} className={clsx(s["search-dialog-content__result"])}>
            <SearchBox.HitItem asChild hit={hit} href={pathname}>
              <NextLink className={s["search-dialog-content__result-link"]} href={pathname}>
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
  return <p className="text-sm font-medium">{children}</p>;
}

function HitBodyContainer({ children }: React.PropsWithChildren) {
  return <p className="mt-1 text-sm">{children}</p>;
}

export function DialogTriggerMobile() {
  return (
    <button>
      <MagnifyingGlassIcon height={18} width={18} />
    </button>
  );
}

export function DialogTriggerDesktop({ _searchKey, ...props }: { _searchKey: string }) {
  const search = useSearch({
    _searchKey,
    queryBy: ["_title", "body", "description", "introduction"],
    saveRecentSearches: {
      key: "docs-recent-searches",
      getStorage: () => localStorage,
    },
  });

  return (
    <SearchBox.Root search={search}>
      <button
        style={{
          padding: 0,
          background: "none",
          border: "none",
        }}
        tabIndex={-1}
        onFocus={(e) => {
          e.preventDefault();
          e.currentTarget.querySelector("input")?.focus();
        }}
      >
        <label {...props} className={s["search-trigger"]}>
          <MagnifyingGlassIcon color="currentColor" height="16" width="16" />
          <input
            className="text-sm"
            placeholder="Search blog articles"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.currentTarget.closest("button")?.click();
              }
            }}
          />
        </label>
      </button>

      <DialogContent />
    </SearchBox.Root>
  );
}
