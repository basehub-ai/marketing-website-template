"use client";
import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import { ChevronDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink as NavigationMenuLinkPrimitive,
  NavigationMenuList,
  NavigationMenuTrigger,
  type NavigationMenuLinkProps,
} from "@radix-ui/react-navigation-menu";
import { Button, ButtonLink } from "@/common/button";
import type { HeaderFragment, HeaderLinksFragment } from ".";
import { useToggleState } from "@/hooks/use-toggle-state";
import { useHasRendered } from "@/hooks/use-has-rendered";

// #region desktop 💻
/* -------------------------------------------------------------------------- */
/*                                   Desktop                                  */
/* -------------------------------------------------------------------------- */

export function NavigationMenuHeader({
  links,
  className,
}: {
  links: HeaderLinksFragment[];
  className?: string;
}) {
  return (
    <NavigationMenu
      className={clsx("relative z-1 flex-col justify-center lg:flex", className)}
      delayDuration={50}
    >
      <NavigationMenuList className="flex flex-1 gap-0.5 px-4">
        {links.map((link) =>
          link.sublinks.items.length > 0 ? (
            <NavigationMenuLinkWithMenu key={link._id} {...link} />
          ) : (
            <li key={link._id}>
              <NavigationMenuLink href={link.href ?? "#"}>{link._title}</NavigationMenuLink>
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
      className={clsx(
        "hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-full px-3 pb-px tracking-tight lg:h-7",
        className,
      )}
      {...props}
    >
      <ButtonLink unstyled href={href}>
        {children}
      </ButtonLink>
    </NavigationMenuLinkPrimitive>
  );
}

function NavigationMenuLinkWithMenu({ _title, href, sublinks }: HeaderLinksFragment) {
  const [closeOnClick, setCloseOnClick] = React.useState(false);
  const timeoutRef = React.useRef<number | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = window.setTimeout(() => {
      setCloseOnClick(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current!);
    setCloseOnClick(false);
  };

  return (
    <NavigationMenuItem key={`${href ?? ""}${_title}`} className="relative items-center gap-0.5">
      <NavigationMenuTrigger
        asChild
        onClick={(e) => {
          if (!closeOnClick) {
            e.preventDefault();
          }
        }}
        onPointerEnter={handleMouseEnter}
        onPointerLeave={handleMouseLeave}
      >
        {href ? (
          <NavigationMenuLink href={href}>{_title}</NavigationMenuLink>
        ) : (
          <Button
            unstyled
            className="hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary inline-flex items-center gap-1 rounded-full pr-2 pb-px pl-3 tracking-tight lg:h-7"
            icon={<ChevronDownIcon className="text-text-tertiary dark:text-dark-text-tertiary" />}
          >
            {_title}
          </Button>
        )}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="border-border bg-surface-primary dark:border-dark-border dark:bg-dark-surface-primary absolute top-[calc(100%+4px)] w-[clamp(180px,30vw,300px)] rounded-md border p-0.5">
        <div className="flex flex-col gap-1">
          <ul className="flex flex-col">
            {sublinks.items.map((sublink) => {
              const { href, _title } =
                sublink.link.__typename === "PageReferenceComponent"
                  ? {
                      href: sublink.link.page.pathname,
                      _title: sublink.link.page._title,
                    }
                  : {
                      href: sublink.link.text,
                      _title: sublink._title,
                    };

              return (
                <li key={sublink._id}>
                  <NavigationMenuLinkPrimitive asChild>
                    <ButtonLink
                      unstyled
                      className="hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary flex w-full items-center gap-2 rounded-md px-3 py-1.5"
                      href={href}
                    >
                      {_title}
                    </ButtonLink>
                  </NavigationMenuLinkPrimitive>
                </li>
              );
            })}
          </ul>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function DesktopMenu({ navbar, rightCtas }: HeaderFragment) {
  return (
    <>
      <NavigationMenuHeader className="hidden lg:flex" links={navbar.items} />
      <div className="hidden items-center gap-2 justify-self-end lg:flex">
        {rightCtas.items.map((cta) => {
          return (
            <ButtonLink key={cta._id} className="px-3.5!" href={cta.href} intent={cta.type}>
              {cta.label}
            </ButtonLink>
          );
        })}
      </div>
    </>
  );
}

// #region mobile 📱
/* -------------------------------------------------------------------------- */
/*                                   Mobile                                   */
/* -------------------------------------------------------------------------- */

export function MobileMenu({ navbar, rightCtas }: HeaderFragment) {
  const { handleToggle, isOn, handleOff } = useToggleState();

  return (
    <>
      <button
        aria-label="Toggle Menu"
        className="border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary col-start-3 flex items-center justify-center gap-2 justify-self-end rounded-sm border p-2 lg:hidden lg:h-7"
        onPointerDown={handleToggle}
      >
        <HamburgerMenuIcon className="size-4" />
      </button>
      <div className="block lg:hidden">
        {isOn ? (
          <div className="bg-surface-primary dark:bg-dark-surface-primary fixed top-[calc(var(--header-height)+1px)] left-0 z-10 h-auto w-full">
            <div className="flex flex-col gap-8 px-6 py-8">
              <nav className="flex flex-col gap-4">
                {navbar.items.map((link) =>
                  link.sublinks.items.length > 0 ? (
                    <ItemWithSublinks
                      key={link._id}
                      _id={link._id}
                      _title={link._title}
                      sublinks={link.sublinks.items}
                      onClick={handleOff}
                    />
                  ) : (
                    <Link
                      key={link._id}
                      className="flex items-center gap-2 rounded-sm px-3 py-1.5"
                      href={link.href ?? "#"}
                      onClick={handleOff}
                    >
                      {link._title}
                    </Link>
                  ),
                )}
              </nav>
              <div className="flex items-center justify-start gap-2">
                {rightCtas.items.map((cta) => {
                  return (
                    <ButtonLink key={cta._id} href={cta.href} intent={cta.type} size="lg">
                      {cta.label}
                    </ButtonLink>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

function ItemWithSublinks({
  _id,
  _title,
  sublinks,
  onClick,
}: {
  _id: string;
  _title: string;
  sublinks: HeaderLinksFragment["sublinks"]["items"];
  onClick: () => void;
}) {
  const { isOn, handleOff, handleOn } = useToggleState(false);
  const hasRendered = useHasRendered();
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (!hasRendered) return;

    if (isOn) {
      listRef.current?.animate([{ height: `${(40 * sublinks.length).toString()}px` }], {
        duration: 200,
        easing: "ease-in-out",
        fill: "forwards",
      });
    } else {
      listRef.current?.animate([{ height: "0px" }], {
        duration: 200,
        easing: "ease-in-out",
        fill: "forwards",
      });
    }
  }, [isOn, hasRendered, sublinks]);

  const handleToggle = () => {
    if (isOn) {
      handleOff();
    } else {
      handleOn();
    }
  };

  return (
    <div key={_id}>
      <button className="flex items-center gap-2 px-3 py-1.5" onClick={handleToggle}>
        {_title}
        <ChevronDownIcon
          className={clsx(
            "text-text-tertiary dark:text-dark-text-tertiary h-min transform transition-transform",
            isOn ? "rotate-180" : "rotate-0",
          )}
        />
      </button>
      <ul
        ref={listRef}
        className={clsx(
          "flex h-0 origin-top transform-gpu flex-col gap-2 overflow-hidden pl-4 transition-transform",
        )}
      >
        {sublinks.map((sublink) => {
          const { href, _title } =
            sublink.link.__typename === "PageReferenceComponent"
              ? {
                  href: sublink.link.page.pathname,
                  _title: sublink.link.page._title,
                }
              : {
                  href: sublink.link.text,
                  _title: sublink._title,
                };

          return (
            <li key={sublink._id}>
              <Link
                className="text-text-tertiary dark:text-dark-text-tertiary flex items-center gap-2 rounded-md px-3 py-1.5"
                href={href}
                onClick={onClick}
              >
                {_title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
