import { fragmentOn } from ".basehub/schema";

export const headingFragment = fragmentOn("HeadingComponent", {
  title: true,
  subtitle: true,
  tag: true,
});

export type HeadingFragment = fragmentOn.infer<typeof headingFragment>;

export const avatarFragment = fragmentOn("BlockImage", {
  url: true,
  width: true,
  height: true,
  alt: true,
});

export type AvatarFragment = fragmentOn.infer<typeof avatarFragment>;

export const authorFragment = fragmentOn("AuthorsItem", {
  _id: true,
  image: avatarFragment,
  _title: true,
});

export type AuthorFragment = fragmentOn.infer<typeof authorFragment>;
