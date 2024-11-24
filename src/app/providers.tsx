import { ThemeProvider } from "next-themes";
import { BaseHubThemeProvider } from "@/context/basehub-theme-provider";
import { TooltipProvider } from "@/common/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      <BaseHubThemeProvider />
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
