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
import { useSelectedLayoutSegment } from "next/navigation";
import { ButtonLink } from "@/common/button";
import { isPageReferenceComponent } from ".basehub/schema";
import type { HeaderFragment, HeaderLiksFragment } from ".";
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
  links: HeaderLiksFragment[];
  className?: string;
}) {
  return (
    <NavigationMenu className={clsx("relative z-[1] flex-col justify-center lg:flex", className)}>
      <NavigationMenuList className="flex flex-1 px-4">
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
        "inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-full px-3 pb-px hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary lg:h-7",
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
          <button className="inline-flex items-center gap-1 rounded-full px-3 pb-px hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary lg:h-7">
            {_title}
            <ChevronDownIcon className="text-text-tertiary dark:text-dark-text-tertiary" />
          </button>
        )}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="absolute left-0 top-[calc(100%+4px)] min-w-[164px] rounded-md border border-border bg-surface-primary p-0.5 dark:border-dark-border dark:bg-dark-surface-primary">
        <ul className="flex flex-col">
          {sublinks.items.map((sublink) => {
            const { href, _title } = isPageReferenceComponent(sublink.link)
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
                <NavigationMenuLinkPrimitive
                  asChild
                  className="flex items-center gap-2 rounded-md px-3 py-1.5 hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary"
                >
                  <Link href={href}>{_title}</Link>
                </NavigationMenuLinkPrimitive>
              </li>
            );
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function DesktopMenu({ navbar, ctaS }: HeaderFragment) {
  return (
    <>
      <NavigationMenuHeader className="hidden lg:flex" links={navbar.items} />
      <div className="hidden items-center gap-2 justify-self-end lg:flex">
        <ButtonLink href={ctaS.secondary.href} intent={ctaS.secondary.type}>
          {ctaS.secondary.label}
        </ButtonLink>
        <ButtonLink href={ctaS.primary.href} intent={ctaS.primary.type}>
          {ctaS.primary.label}
        </ButtonLink>
      </div>
    </>
  );
}

// #region mobile 📱
/* -------------------------------------------------------------------------- */
/*                                   Mobile                                   */
/* -------------------------------------------------------------------------- */

export function MobileMenu({ ctaS, navbar }: HeaderFragment) {
  const { handleToggle, isOn, handleOff } = useToggleState();
  const selectedLayoutSegment = useSelectedLayoutSegment();

  const headerLinks = React.useMemo(() => {
    return navbar.items.map((link) => ({
      ...link,
      isActive: link.sublinks.items.length
        ? (segment: string) =>
            link.sublinks.items.some((sublink) =>
              sublink.link.__typename === "PageReferenceComponent"
                ? sublink.link.page.pathname.split("/").pop() === segment
                : sublink.link.text === segment,
            )
        : link.href
          ? link.href.split("/")[1] === selectedLayoutSegment
          : undefined,
    }));
  }, [navbar, selectedLayoutSegment]);

  return (
    <>
      <button
        className="col-start-3 flex items-center justify-center gap-2 justify-self-end rounded border border-border bg-surface-secondary p-2 dark:border-dark-border dark:bg-dark-surface-secondary lg:hidden lg:h-7"
        onClick={handleToggle}
      >
        <HamburgerMenuIcon className="size-4" />
      </button>
      <div className="block lg:hidden">
        {isOn ? (
          <div className="fixed left-0 top-[calc(var(--header-height)+1)] z-10 h-auto w-full bg-surface-primary dark:bg-dark-surface-primary">
            <div className="flex flex-col gap-8 px-6 py-8">
              <nav className="flex flex-col gap-4">
                {headerLinks.map((link) =>
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
                      className="flex items-center gap-2 rounded px-3 py-1.5"
                      href={link.href ?? "#"}
                      onClick={handleOff}
                    >
                      {link._title}
                    </Link>
                  ),
                )}
              </nav>
              <div className="flex items-center justify-start gap-2">
                <ButtonLink href={ctaS.secondary.href} intent={ctaS.secondary.type}>
                  {ctaS.secondary.label}
                </ButtonLink>
                <ButtonLink href={ctaS.primary.href} intent={ctaS.primary.type}>
                  {ctaS.primary.label}
                </ButtonLink>
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
  sublinks: HeaderLiksFragment["sublinks"]["items"];
  onClick: () => void;
}) {
  const { isOn, handleOff, handleOn } = useToggleState(false);
  const hasRendered = useHasRendered();
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (!hasRendered) return;

    if (isOn) {
      listRef.current?.animate([{ transform: "scaleY(1)" }], {
        duration: 200,
        easing: "ease-in-out",
        fill: "forwards",
      });
    } else {
      listRef.current?.animate([{ transform: "scaleY(0)" }], {
        duration: 200,
        easing: "ease-in-out",
        fill: "forwards",
      });
    }
  }, [isOn, hasRendered]);

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
            "h-min transform text-text-tertiary transition-transform dark:text-dark-text-tertiary",
            isOn ? "rotate-180" : "rotate-0",
          )}
        />
      </button>
      <ul
        ref={listRef}
        className={clsx(
          "flex origin-top scale-y-0 transform-gpu flex-col gap-2 pl-4 transition-transform",
        )}
      >
        {sublinks.map((sublink) => {
          const { href, _title } = isPageReferenceComponent(sublink.link)
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
                className="flex items-center gap-2 rounded-md px-3 py-1.5 text-text-tertiary dark:text-dark-text-tertiary"
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
