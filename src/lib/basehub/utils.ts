import { type LanguagesEnum } from ".basehub/schema";

export function getArticleSlugFromSlugPath(slugPath: string) {
  // article _slugPath will have something like root index categories-section categories <category> articles <page> children <page> children <page>...
  // remove root/pages and then filter out every other part
  return (
    "/" +
    slugPath
      .replace(/(root|site|posts)\s/gm, "")
      .split(/\s/)
      .join("/")
  );
}

export function variantToValidLocale(variant: LanguagesEnum): Intl.LocalesArgument {
  switch (true) {
    case variant.startsWith("es"):
      return "es-AR";
    case variant.startsWith("en"):
      return "en-US";
    default:
      return "en-US";
  }
}
