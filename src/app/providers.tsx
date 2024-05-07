import {ThemeProvider} from "next-themes";

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <ThemeProvider attribute="class" forcedTheme="light">
      {children}
    </ThemeProvider>
  );
}
