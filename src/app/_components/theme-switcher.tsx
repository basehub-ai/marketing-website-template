"use client";

import { useTheme } from "next-themes";
import { Half2Icon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { useHasRendered } from "@/hooks/use-has-rendered";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const hasRendered = useHasRendered();

  return (
    <div className="text-center">
      <button onClick={() => setTheme("light")}>
        <SunIcon color="currentColor" height={16} width={16} />
      </button>
      <button onClick={() => setTheme("system")}>
        <Half2Icon color="currentColor" height={16} width={16} />
      </button>
      <button onClick={() => setTheme("dark")}>
        <MoonIcon color="currentColor" height={16} width={16} />
      </button>
    </div>
  );
}
