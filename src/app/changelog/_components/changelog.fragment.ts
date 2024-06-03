import { fragmentOn } from "basehub";
import { authorFragment, optimizedImageFragment } from "@/lib/basehub/fragments";

export const changelogListFragment = fragmentOn("ChangelogPostComponent", {
  _id: true,
  _title: true,
  image: optimizedImageFragment,
  authors: authorFragment,
  excerpt: true,
  _slug: true,
  publishedAt: true,
});

export type ChangelogListFragment = fragmentOn.infer<typeof changelogListFragment>;
