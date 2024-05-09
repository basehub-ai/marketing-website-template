import {draftMode} from "next/headers";

import {Pump} from ".basehub/react-pump";
import {hexToRgb} from "@/utils/colors";
import {fragmentOn} from ".basehub/schema";

export const themeFragment = fragmentOn("Theme", {palette: true});

export type BaseHubTheme = fragmentOn.infer<typeof themeFragment>;

export function BaseHubThemeProvider() {
  return (
    <Pump next={{revalidate: 30}} queries={[{settings: {theme: themeFragment}}]}>
      {async ([data]) => {
        "use server";
        const colors = await import("tailwindcss/colors");
        const palette = colors[data.settings.theme.palette as keyof typeof colors] as
          | Record<number, string>
          | undefined;

        if (!palette) throw new Error("Palette not found");

        const css = Object.entries(palette).map(([key, value]) => {
          const rgb = hexToRgb(value);

          return `--neutral-${key}: ${value}; --neutral-rgb-${key}: ${rgb};`;
        });

        return (
          <style>{`
      :root {
        ${css.join("\n")}
      `}</style>
        );
      }}
    </Pump>
  );
}
