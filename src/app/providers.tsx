import { ThemeProvider } from "next-themes";
import { Toolbar } from "basehub/next-toolbar";

import { BaseHubThemeProvider } from "@/context/basehub-theme-provider";
import { TooltipProvider } from "@/common/simple-tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      <BaseHubThemeProvider />
      <Toolbar />
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
