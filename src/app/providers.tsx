import { ThemeProvider } from "next-themes";

import { BaseHubThemeProvider } from "@/context/basehub-theme-provider";
import { ForkInBaseHub } from "@/common/fork-in-basehub";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      <BaseHubThemeProvider />
      <ForkInBaseHub />
      {children}
    </ThemeProvider>
  );
}
