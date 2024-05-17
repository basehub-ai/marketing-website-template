"use client";
import Link from "next/link";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink as NavigationMenuLinkPrimitive,
  NavigationMenuList,
  NavigationMenuTrigger,
  type NavigationMenuLinkProps,
} from "@radix-ui/react-navigation-menu";
import {cx} from "class-variance-authority";

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
  {href: "/#pricing", label: "Pricing"},
  {href: "/changelog", label: "Changelog"},
];

export function NavigationMenuHeader() {
  return (
    <NavigationMenu className="relative z-[1] hidden justify-center md:flex">
      <NavigationMenuList className="flex flex-1 px-4">
        {links.map(({href, label, menu}) =>
          menu ? (
            <NavigationMenuLinkWithMenu
              key={`${href}${label}`}
              href={href}
              label={label}
              menu={menu}
            />
          ) : (
            <li key={`${href}${label}`}>
              <NavigationMenuLink href={href}>{label}</NavigationMenuLink>
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
}: {children: React.ReactNode; href: string} & NavigationMenuLinkProps) {
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
        <NavigationMenuLink href={href}>
          {label}
          <ChevronDownIcon className="text-text-tertiary dark:text-dark-text-tertiary" />
        </NavigationMenuLink>
      </NavigationMenuTrigger>
      <NavigationMenuContent className="absolute left-0 top-[calc(100%+4px)] min-w-[164px] rounded-md border border-border bg-surface-primary p-0.5 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft dark:border-dark-border dark:bg-dark-surface-primary">
        <ul className="flex flex-col ">
          {menu.map(({href, label}) => (
            <li key={`${href}${label}`}>
              <NavigationMenuLinkPrimitive
                asChild
                className="flex items-center gap-2 rounded-md px-3 py-1.5 hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary"
                href={href}
              >
                <Link href={href}>{label}</Link>
              </NavigationMenuLinkPrimitive>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
