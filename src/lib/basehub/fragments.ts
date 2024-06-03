import { fragmentOn } from "basehub";

/* -------------------------------------------------------------------------- */
/*                                   Heading                                  */
/* -------------------------------------------------------------------------- */

export const headingFragment = fragmentOn("HeadingComponent", {
  title: true,
  subtitle: true,
  tag: true,
  align: true,
});

export type HeadingFragment = fragmentOn.infer<typeof headingFragment>;

/* -------------------------------------------------------------------------- */
/*                                   Avatar                                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                   Author                                   */
/* -------------------------------------------------------------------------- */

export const authorFragment = fragmentOn("AuthorsItem", {
  _id: true,
  _title: true,
  image: { ...avatarFragment, height: true, width: true },
});

export type AuthorFragment = fragmentOn.infer<typeof authorFragment>;

/* -------------------------------------------------------------------------- */
/*                                    Image                                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                    Quote                                   */
/* -------------------------------------------------------------------------- */

export const quoteFragment = fragmentOn("QuoteComponent", {
  _id: true,
  author: {
    _id: true,
    _title: true,
    image: {
      url: true,
      alt: true,
    },
    company: {
      _title: true,
      image: {
        url: true,
        alt: true,
      },
    },
    role: true,
  },
  quote: true,
});

export type QuoteFragment = fragmentOn.infer<typeof quoteFragment>;
