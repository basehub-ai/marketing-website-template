import { basehub } from "basehub";

export async function getLanguagesSet() {
  const data = await basehub({ cache: "no-store" }).query({
    sets: {
      languages: {
        variants: {
          id: true,
          apiName: true,
          label: true,
        },
      },
    },
  });

  return data.sets.languages.variants;
}

export async function getAvailableLocales() {
  const data = await basehub({ cache: "no-store" }).query({
    sets: {
      languages: {
        variants: {
          apiName: true,
        },
      },
    },
  });

  return data.sets.languages.variants.map((v) => ({ locale: v.apiName }));
}
