import Image from "next/image";

import {ButtonLink} from "@/common/button";

import {NavigationMenuHeader} from "./navigation-menu";

export function Header() {
  return (
    <header className="sticky left-0 top-0 z-50 flex h-[--header-height] border-b border-border bg-surface-primary dark:border-dark-border dark:bg-dark-surface-primary">
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
    </header>
  );
}
