import { Pump } from "basehub/react-pump";
import { hexToRgb } from "@/utils/colors";
import { fragmentOn } from "basehub";
import colors from "tailwindcss/colors";

export const themeFragment = fragmentOn("Theme", { accent: true, grayScale: true });

export type BaseHubTheme = fragmentOn.infer<typeof themeFragment>;

const CONTRAST_WARNING_COLORS: (keyof typeof colors)[] = [
  "amber",
  "cyan",
  "green",
  "lime",
  "yellow",
];

export function BaseHubThemeProvider() {
  return (
    <Pump queries={[{ site: { settings: { theme: themeFragment } } }]}>
      {async ([data]) => {
        "use server";
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
        if (CONTRAST_WARNING_COLORS.includes(data.site.settings.theme.accent)) {
          css.push(`--textOnAccent: ${colors.gray[950]};`);
        }

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
