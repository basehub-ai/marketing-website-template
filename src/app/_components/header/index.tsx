import Image from "next/image";
import Link from "next/link";

import {ButtonLink} from "@/common/button";

import {NavigationMenuHeader} from "./navigation-menu";

export function Header() {
  return (
    <header className="grid-cols-header container sticky left-0 top-0 z-10 mx-auto grid h-[--header-height] w-full place-items-center content-center items-center px-4 first:*:justify-self-start last:*:justify-self-end">
      <ButtonLink unstyled href="/">
        <Image alt="Logo" className="dark:invert" height={50} src="/acme.svg" width={130} />
      </ButtonLink>
      <NavigationMenuHeader />
      <div className="flex items-center gap-4">
        <ButtonLink href="/login" intent="secondary">
          Login
        </ButtonLink>
        <ButtonLink href="/signup">Get Started Today</ButtonLink>
      </div>
    </header>
  );
}
