"use client";
import type Link from "next/link";

import {ChevronDownIcon} from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink as NavigationMenuLinkPrimitive,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";

import {Button, ButtonLink} from "@/common/button";

interface Link {
  href: string;
  label: string;
  menu?: Link[];
}

const links: Link[] = [
  {href: "/", label: "Home"},
  {
    href: "/blog",
    label: "Blog",
    menu: [
      {href: "/blog", label: "Featured posts"},
      {href: "/blog", label: "Last posts"},
      {href: "/guides", label: "Guides"},
      {href: "/blog", label: "Use cases"},
    ],
  },
  {href: "/pricing", label: "Pricing"},
  {href: "/changelog", label: "Changelog"},
];

export function NavigationMenuHeader() {
  return (
    <NavigationMenu className="relative z-[1] flex justify-center">
      <NavigationMenuList className="flex flex-1">
        {links.map(({href, label, menu}) =>
          menu ? (
            <NavigationMenuLinkWithMenu
              key={`${href}${label}`}
              href={href}
              label={label}
              menu={menu}
            />
          ) : (
            <NavigationMenuLink key={`${href}${label}`} href={href}>
              {label}
            </NavigationMenuLink>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavigationMenuLink({children, href}: {children: React.ReactNode; href: string}) {
  return (
    <NavigationMenuLinkPrimitive asChild>
      <ButtonLink
        unstyled
        className="dark:hover:bg-dark-surface-tertiary hover:bg-surface-tertiary !px-5 !text-base"
        href={href}
      >
        {children}
      </ButtonLink>
    </NavigationMenuLinkPrimitive>
  );
}

function NavigationMenuLinkWithMenu({
  href,
  label,
  menu,
}: {
  href: string;
  label: string;
  menu: Link[];
}) {
  return (
    <NavigationMenuItem key={`${href}${label}`} className="relative items-center gap-1">
      <NavigationMenuTrigger asChild>
        <Button
          unstyled
          className="dark:hover:bg-dark-surface-tertiary hover:bg-surface-tertiary !px-5 !pr-3 !text-base"
          icon={<ChevronDownIcon />}
          iconSide="right"
          intent="secondary"
        >
          {label}
        </Button>
      </NavigationMenuTrigger>
      <NavigationMenuContent className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight bg-surface-tertiary dark:bg-dark-surface-tertiary absolute left-0 top-full w-full rounded-md sm:w-auto">
        <ul>
          {menu.map(({href, label}) => (
            <li key={`${href}${label}`} className="">
              <NavigationMenuLink href={href}>{label}</NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
