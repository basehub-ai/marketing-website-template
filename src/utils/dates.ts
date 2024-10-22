import { type LanguagesEnum } from ".basehub/schema";
import { variantToValidLocale } from "@/lib/basehub/utils";

const defaultOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const formatDate = (
  date: string | Date | number,
  options?: Intl.DateTimeFormatOptions & { locale: LanguagesEnum },
) => {
  const locale = options?.locale ? variantToValidLocale(options.locale) : "en-US";

  return new Date(date).toLocaleDateString(locale, {
    ...defaultOptions,
    ...options,
    timeZone: "UTC",
  });
};
