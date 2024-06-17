"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Half2Icon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { Button } from "@/common/button";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = React.useState<string>();

  React.useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  return (
    <div className="flex gap-0.5 rounded-full border border-border bg-surface-primary p-1 text-center dark:border-dark-border dark:bg-dark-surface-primary">
      <SwitchButton selectedTheme={selectedTheme} setTheme={setTheme} theme="light">
        <SunIcon color="currentColor" height={16} width={16} />
      </SwitchButton>
      <SwitchButton selectedTheme={selectedTheme} setTheme={setTheme} theme="system">
        <Half2Icon color="currentColor" height={16} width={16} />
      </SwitchButton>
      <SwitchButton selectedTheme={selectedTheme} setTheme={setTheme} theme="dark">
        <MoonIcon color="currentColor" height={16} width={16} />
      </SwitchButton>
    </div>
  );
}

function SwitchButton({
  selectedTheme,
  theme,
  setTheme,
  children,
}: {
  selectedTheme?: string;
  theme: string;
  setTheme: (theme: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <Button
      unstyled
      aria-label={`${theme} theme`}
      className={clsx(
        "!flex !size-6 items-center justify-center rounded-full !p-[3px] text-text-secondary dark:text-dark-text-secondary",
        "data-[selected='true']:bg-surface-tertiary data-[selected='true']:text-text-primary data-[selected='true']:dark:bg-dark-surface-tertiary data-[selected='true']:dark:text-dark-text-primary",
        "hover:bg-surface-secondary hover:text-text-primary hover:dark:bg-dark-surface-secondary hover:dark:text-dark-text-primary",
      )}
      data-selected={selectedTheme === theme}
      onClick={() => setTheme(theme)}
    >
      {children}
    </Button>
  );
}
