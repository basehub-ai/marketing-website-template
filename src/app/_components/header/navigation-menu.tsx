"use client";
import Link from "next/link";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink as NavigationMenuLinkPrimitive,
  NavigationMenuList,
  NavigationMenuTrigger,
  type NavigationMenuLinkProps,
} from "@radix-ui/react-navigation-menu";
import { cx } from "class-variance-authority";

import { type HeaderLiksFragment } from ".";

export function NavigationMenuHeader({ links }: { links: HeaderLiksFragment[] }) {
  return (
    <NavigationMenu className="relative z-[1] hidden justify-center md:flex">
      <NavigationMenuList className="flex flex-1 px-4">
        {links.map((props) =>
          props.sublinks.items.length > 0 ? (
            <NavigationMenuLinkWithMenu key={props._id} {...props} />
          ) : (
            <li key={props._id}>
              <NavigationMenuLink href={props.href ?? "#"}>{props._title}</NavigationMenuLink>
            </li>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavigationMenuLink({
  className,
  children,
  href,
  ...props
}: { children: React.ReactNode; href: string } & NavigationMenuLinkProps) {
  return (
    <NavigationMenuLinkPrimitive
      asChild
      className={cx(
        "inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-full px-3 pb-px hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary md:h-7",
        className,
      )}
      {...props}
    >
      <Link href={href}>{children}</Link>
    </NavigationMenuLinkPrimitive>
  );
}

function NavigationMenuLinkWithMenu({ _id, _title, href, sublinks }: HeaderLiksFragment) {
  return (
    <NavigationMenuItem key={`${href ?? ""}${_title}`} className="relative items-center gap-1">
      <NavigationMenuTrigger asChild>
        {href ? (
          <NavigationMenuLink href={href}>{_title}</NavigationMenuLink>
        ) : (
          <button className="inline-flex items-center gap-1 rounded-full px-3 pb-px hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary md:h-7">
            {_title}
            <ChevronDownIcon className="text-text-tertiary dark:text-dark-text-tertiary" />
          </button>
        )}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="absolute left-0 top-[calc(100%+4px)] min-w-[164px] rounded-md border border-border bg-surface-primary p-0.5 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft dark:border-dark-border dark:bg-dark-surface-primary">
        <ul className="flex flex-col ">
          {sublinks.items.map(({ href, _title }) => (
            <li key={`${href ?? ""}${_title}`}>
              <NavigationMenuLinkPrimitive
                asChild
                className="flex items-center gap-2 rounded-md px-3 py-1.5 hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary"
              >
                <Link href={href ?? "#"}>{_title}</Link>
              </NavigationMenuLinkPrimitive>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
