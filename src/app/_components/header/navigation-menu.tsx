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
import { type HeaderLiksFragment } from ".";
import { useToggleState } from "@/hooks/use-toggle-state";

export function NavigationMenuHeader({
  links,
  className,
}: {
  links: HeaderLiksFragment[];
  className?: string;
}) {
  return (
    <NavigationMenu className={clsx("relative z-[1] flex-col justify-center lg:flex", className)}>
      <NavigationMenuList className="flex flex-1 px-4 ">
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
            <ChevronDownIcon className="text-grayscale-500 dark:text-grayscale-500" />
          </button>
        )}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="absolute left-0 top-[calc(100%+4px)] min-w-[164px] rounded-md border border-border bg-surface-primary p-0.5 dark:border-dark-border dark:bg-dark-surface-primary">
        <ul className="flex flex-col ">
          {sublinks.items.map((props) => {
            const { href, _title } = isPageReferenceComponent(props.link)
              ? {
                  href: props.link.page.pathname,
                  _title: props.link.page._title,
                }
              : {
                  href: props.link.text,
                  _title: props._title,
                };

            return (
              <li key={props._id}>
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

export function DesktopMenu({ links }: { links: HeaderLiksFragment[] }) {
  return (
    <>
      <NavigationMenuHeader className="hidden lg:flex" links={links} />
      <div className="hidden items-center gap-4 justify-self-end lg:flex">
        <ButtonLink href="/login" intent="secondary">
          Login
        </ButtonLink>
        <ButtonLink href="/signup" intent="tertiary">
          Get Started Today
        </ButtonLink>
      </div>
    </>
  );
}

export function MobileMenu({ links }: { links: HeaderLiksFragment[] }) {
  const { handleToggle, isOn, handleOff } = useToggleState();
  const selectedLayoutSegment = useSelectedLayoutSegment();

  // When click, we need to hide the menu

  const headerLinks = React.useMemo(() => {
    return links.map((link) => ({
      ...link,
      isActive: link.sublinks.items.length
        ? (selectedLayoutSegment: string) =>
            link.sublinks.items.some((sublink) =>
              sublink.link.__typename === "PageReferenceComponent"
                ? sublink.link.page.pathname.split("/").pop() === selectedLayoutSegment
                : sublink.link.text === selectedLayoutSegment,
            )
        : link.href
          ? link.href.split("/")[1] === selectedLayoutSegment
          : undefined,
    }));
  }, [links, selectedLayoutSegment]);

  return (
    <>
      <button
        className="col-start-3 flex items-center justify-center gap-2 justify-self-end rounded border border-border bg-surface-secondary p-2 hover:bg-surface-tertiary dark:border-dark-border dark:bg-dark-surface-secondary dark:hover:bg-dark-surface-tertiary lg:hidden lg:h-7"
        onClick={handleToggle}
      >
        <HamburgerMenuIcon className="size-4" />
      </button>
      <div className="block lg:hidden">
        {isOn ? (
          <div className="fixed left-0 top-[calc(var(--header-height)+1)] z-10 h-auto w-full bg-surface-primary dark:bg-dark-surface-primary">
            <div className="flex flex-col gap-8 px-6 py-8">
              <nav className="flex flex-col gap-4">
                {headerLinks.map((props) =>
                  props.sublinks.items.length > 0 ? (
                    <ItemWithSublinks
                      key={props._id}
                      _id={props._id}
                      _title={props._title}
                      sublinks={props.sublinks.items}
                      onClick={handleOff}
                    />
                  ) : (
                    <Link
                      key={props._id}
                      className="flex items-center gap-2 rounded px-3 py-1.5 hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary"
                      href={props.href ?? "#"}
                      onClick={handleOff}
                    >
                      {props._title}
                    </Link>
                  ),
                )}
              </nav>
              <div className="flex items-center justify-start gap-2">
                <ButtonLink href="/login" intent="secondary">
                  Login
                </ButtonLink>
                <ButtonLink href="/signup" intent="primary">
                  Get Started Today
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

  const listRef = React.useRef<HTMLUListElement>(null);
  const prevIsOn = React.useRef(isOn);

  React.useEffect(() => {
    // made a js animation to show the sublinks
    if (prevIsOn.current !== isOn) {
      prevIsOn.current = isOn;
    } else {
      return;
    }
    if (isOn) {
    } else {
      listRef.current?.animate([{ transform: "scaleY(1)" }, { transform: "scaleY(0)" }], {
        duration: 200,
        easing: "ease-in-out",
        fill: "forwards",
      });
    }
  }, [isOn]);
  const handleToggle = () => {
    if (isOn) {
      handleOff();
      listRef.current?.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
        duration: 200,
        easing: "ease-in-out",
        fill: "forwards",
      });
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
            "text-grayscale-500 dark:text-grayscale-500 h-min transition-transform",
            isOn ? "rotate-180 transform" : "rotate-0 transform",
          )}
        />
      </button>

      <ul
        ref={listRef}
        className={clsx("flex origin-top transform-gpu flex-col gap-2 pl-4 transition-transform")}
      >
        {sublinks.map((props) => {
          const { href, _title } = isPageReferenceComponent(props.link)
            ? {
                href: props.link.page.pathname,
                _title: props.link.page._title,
              }
            : {
                href: props.link.text,
                _title: props._title,
              };

          return (
            <li key={_id}>
              <Link
                className="text-grayscale-500 dark:text-grayscale-500 flex items-center gap-2 rounded-md px-3 py-1.5 hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary"
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
