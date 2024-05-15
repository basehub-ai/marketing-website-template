import {fragmentOn} from ".basehub/schema";

export const headingFragment = fragmentOn("HeadingComponent", {
  title: true,
  subtitle: true,
  tag: true,
});

type HeadingFragment = fragmentOn.infer<typeof headingFragment>;
