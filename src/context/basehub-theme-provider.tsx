import { draftMode } from "next/headers";

import { Pump } from "basehub/react-pump";
import { hexToRgb } from "@/utils/colors";
import { fragmentOn } from "basehub";

export const themeFragment = fragmentOn("Theme", { accent: true, grayScale: true });

export type BaseHubTheme = fragmentOn.infer<typeof themeFragment>;

export function BaseHubThemeProvider() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }}
      queries={[{ site: { settings: { theme: themeFragment } } }]}
    >
      {async ([data]) => {
        "use server";
        const colors = await import("tailwindcss/colors");
        const accent = colors[data.site.settings.theme.accent];
        const grayScale = colors[data.site.settings.theme.grayScale];

        const css = Object.entries(accent).map(([key, value]) => {
          const rgb = hexToRgb(value); // (is used in the tailwind.config.ts to add colors with alpha values)

          return `--accent-${key}: ${value}; --accent-rgb-${key}: ${rgb};`;
        });

        Object.entries(grayScale).forEach(([key, value]) => {
          const rgb = hexToRgb(value);

          css.push(`--grayscale-${key}: ${value}; --grayscale-rgb-${key}: ${rgb};`);
        });

        return (
          <style>{`
      :root {
        ${css.join("\n")}
      }
      `}</style>
        );
      }}
    </Pump>
  );
}
