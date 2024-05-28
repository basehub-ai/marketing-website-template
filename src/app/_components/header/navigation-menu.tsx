"use client";
import Link from "next/link";
import { ChevronDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { cx } from "class-variance-authority";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink as NavigationMenuLinkPrimitive,
  NavigationMenuList,
  NavigationMenuTrigger,
  type NavigationMenuLinkProps,
} from "@radix-ui/react-navigation-menu";

export function NavigationMenuHeader({
  links,
  className,
}: {
  links: HeaderLiksFragment[];
  className?: string;
}) {
  return (
    <NavigationMenu className={cx("relative z-[1] flex-col justify-center lg:flex", className)}>
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
      className={cx(
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

export function DesktopMenu({ links }: { links: HeaderLiksFragment[] }) {
  return (
    <>
      <NavigationMenuHeader className="hidden lg:flex" links={links} />
      <div className="hidden items-center gap-4 lg:flex">
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

import * as React from "react";
import { useSelectedLayoutSegment } from "next/navigation";

import { ButtonLink } from "@/common/button";

import { type HeaderLiksFragment } from ".";

const useToggleState = (initialState = false) => {
  const [isOn, setIsOn] = React.useState(initialState);

  const handleToggle = () => setIsOn((prev) => !prev);
  const handleOff = () => setIsOn(false);
  const handleOn = () => setIsOn(true);

  return { isOn, handleToggle, handleOff, handleOn };
};

export function MobileMenu({ links }: { links: HeaderLiksFragment[] }) {
  const { handleToggle, isOn } = useToggleState();
  const selectedLayoutSegment = useSelectedLayoutSegment();

  const headerLinks = React.useMemo(() => {
    return links.map((link) => ({
      ...link,
      isActive: link.sublinks.items.length
        ? (selectedLayoutSegment: string) =>
            link.sublinks.items.some(
              (sublink) =>
                sublink.href && selectedLayoutSegment.startsWith(sublink.href.split("/")[1]),
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
              {/* <Button unstyled onClick={handleOff}>
                Close
              </Button> */}
              <nav className="flex flex-col gap-4">
                {headerLinks.map((props) =>
                  props.sublinks.items.length > 0 ? (
                    <ItemWithSublinks
                      key={props._id}
                      _id={props._id}
                      _title={props._title}
                      sublinks={props.sublinks.items}
                    />
                  ) : (
                    <Link
                      key={props._id}
                      className="flex items-center gap-2 rounded px-3 py-1.5 hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary"
                      href={props.href ?? "#"}
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
}: {
  _id: string;
  _title: string;
  sublinks: HeaderLiksFragment["sublinks"]["items"];
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
          className={cx(
            "h-min text-text-tertiary transition-transform dark:text-dark-text-tertiary",
            isOn ? "rotate-180 transform" : "rotate-0 transform",
          )}
        />
      </button>

      <ul
        ref={listRef}
        className={cx("flex origin-top transform-gpu flex-col gap-2 pl-4 transition-transform")}
      >
        {sublinks.map(({ href, _title }) => (
          <li key={_id}>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-text-tertiary hover:bg-surface-tertiary dark:text-dark-text-tertiary dark:hover:bg-dark-surface-tertiary"
              href={href ?? "#"}
            >
              {_title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
