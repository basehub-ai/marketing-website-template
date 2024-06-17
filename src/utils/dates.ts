const defaultOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const formatDate = (date: string | Date | number, options?: Intl.DateTimeFormatOptions) => {
  return new Date(date).toLocaleDateString("en-US", {
    ...defaultOptions,
    ...options,
    timeZone: "UTC",
  });
};
