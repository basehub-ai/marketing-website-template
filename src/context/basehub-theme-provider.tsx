import { draftMode } from "next/headers";

import { Pump } from "basehub/react-pump";
import { hexToRgb } from "@/utils/colors";
import { fragmentOn } from "basehub";

export const themeFragment = fragmentOn("Theme", { palette: true });

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
        const palette = colors[data.site.settings.theme.palette];

        const css = Object.entries(palette).map(([key, value]) => {
          const rgb = hexToRgb(value); // (is used in the tailwind.config.ts to add colors with alpha values)

          return `--neutral-${key}: ${value}; --neutral-rgb-${key}: ${rgb};`;
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
