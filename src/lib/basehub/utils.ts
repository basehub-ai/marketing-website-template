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
