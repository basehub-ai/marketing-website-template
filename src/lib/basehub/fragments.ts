import { fragmentOn } from ".basehub/schema";

export const headingFragment = fragmentOn("HeadingComponent", {
  title: true,
  subtitle: true,
  tag: true,
  align: true,
});

export type HeadingFragment = fragmentOn.infer<typeof headingFragment>;

export const avatarFragment = fragmentOn("BlockImage", {
  url: {
    __args: {
      quality: 100,
      compression: "auto",
      width: 100,
      height: 100,
    },
  },
  alt: true,
});

export type AvatarFragment = fragmentOn.infer<typeof avatarFragment>;

export const authorFragment = fragmentOn("AuthorsItem", {
  _id: true,
  _title: true,
  image: { ...avatarFragment, height: true, width: true },
});

export type AuthorFragment = fragmentOn.infer<typeof authorFragment>;

export const optimizedImageFragment = fragmentOn("BlockImage", {
  url: {
    __args: {
      compression: "auto",
      quality: 100,
      format: "webp",
    },
  },
  aspectRatio: true,
  width: true,
  height: true,
  alt: true,
});

export type OptimizedImageFragment = fragmentOn.infer<typeof optimizedImageFragment>;
