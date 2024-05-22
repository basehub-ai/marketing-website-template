import Image from "next/image";
import { draftMode } from "next/headers";

import { ButtonLink } from "@/common/button";
import { isDev } from "@/utils/constants";

import { NavigationMenuHeader } from "./navigation-menu";
import { DraftModeButton } from "./draft-mode";

export function Header() {
  return (
    <header className="relative left-0 top-0 z-50 flex flex-col border-b border-border dark:border-dark-border">
      <div className="flex h-[--header-height] bg-surface-primary dark:bg-dark-surface-primary">
        <div className="container mx-auto grid w-full grid-cols-header place-items-center content-center items-center px-4 first:*:justify-self-start last:*:justify-self-end">
          <ButtonLink unstyled href="/">
            <Image alt="Logo" className="dark:invert" height={50} src="/acme.svg" width={130} />
          </ButtonLink>
          <NavigationMenuHeader />
          <div className="hidden items-center gap-4 lg:flex">
            <ButtonLink href="/login" intent="secondary">
              Login
            </ButtonLink>
            <ButtonLink href="/signup" intent="tertiary">
              Get Started Today
            </ButtonLink>
          </div>
        </div>
      </div>
      {draftMode().isEnabled ? (
        <div className="flex items-center justify-center bg-surface-secondary dark:bg-dark-surface-secondary">
          <p className="text-pretty text-sm text-text-tertiary dark:text-dark-text-tertiary">
            Draft mode is enabled
          </p>
          <DraftModeButton />
        </div>
      ) : null}
    </header>
  );
}
