import Link from "next/link";
import clsx from "clsx";

import { fragmentOn } from "basehub";
import { AvatarsGroup } from "@/common/avatars-group";
import { Avatar } from "@/common/avatar";
import { avatarFragment } from "@/lib/basehub/fragments";

export const heroFragment = fragmentOn("HeroComponent", {
  customerSatisfactionBanner: {
    text: true,
    avatars: {
      items: {
        _id: true,
        avatar: avatarFragment,
      },
    },
  },
  title: true,
  subtitle: true,
  actions: {
    _id: true,
    href: true,
    label: true,
    type: true,
  },
});
type Hero = fragmentOn.infer<typeof heroFragment>;

export function Hero(hero: Hero) {
  return (
    <section className="relative h-[calc(630px-var(--header-height))] overflow-hidden">
      <div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(32px,10vw,120px)_auto_clamp(32px,10vw,120px)] grid-rows-[80px_auto_180px] divide-x divide-border border-b border-border dark:divide-dark-border dark:border-dark-border">
        {/* Decorations */}
        {Array.from({ length: 9 }, (v, i) => i + 1).map((i) => (
          <div key={i} className="" />
        ))}
      </div>
      {/* --- */}
      <figure className="pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full bg-neutral-500/40 blur-[200px]" />
      <figure className="pointer-events-none absolute left-[4vw] top-[64px] z-20 hidden  aspect-square w-[32vw] rounded-full bg-surface-primary opacity-50 blur-[100px] dark:bg-dark-surface-primary md:block" />
      <figure className="pointer-events-none absolute bottom-[-50px] right-[7vw] z-20 hidden  aspect-square w-[30vw] rounded-full bg-surface-primary opacity-50 blur-[100px] dark:bg-dark-surface-primary md:block" />
      {/* --- */}
      <div className="relative z-10 flex flex-col divide-y divide-border pt-[35px] dark:divide-dark-border">
        <div className="flex flex-col items-center justify-end">
          <div className="flex items-center gap-2 !border !border-b-0 border-border px-4 py-2 dark:border-dark-border">
            <AvatarsGroup>
              {hero.customerSatisfactionBanner.avatars.items.map(({ avatar, _id }) => (
                <Avatar {...avatar} key={_id} />
              ))}
            </AvatarsGroup>
            <p className="text-sm text-grayscale-500 dark:text-grayscale-500">
              {hero.customerSatisfactionBanner.text}
            </p>
          </div>
        </div>

        <div className="flex h-[288px] shrink-0 flex-col items-center justify-center gap-2 px-8 py-4 sm:px-24">
          <h1 className="max-w-screen-md text-pretty text-center text-[clamp(32px,7vw,64px)] font-normal leading-none tracking-tighter text-text-primary dark:text-dark-text-primary">
            {hero.title}
          </h1>
          <h2 className="text-md max-w-2xl text-pretty text-center text-grayscale-500 dark:text-grayscale-500 md:text-lg">
            {hero.subtitle}
          </h2>
        </div>
        <div className="flex items-start justify-center px-8 sm:px-24">
          <div className="flex w-full max-w-[80vw] flex-col items-center justify-start md:!max-w-[392px]">
            {hero.actions?.map(({ href, label, type, _id }) =>
              type === "primary" ? (
                <Link
                  key={_id}
                  className={clsx(
                    "flex h-14 w-full flex-col items-center justify-center bg-text-primary text-dark-text-primary dark:bg-dark-text-primary dark:text-text-primary",
                    "transition-[opacity] hover:opacity-90",
                  )}
                  href={href ?? "#"}
                >
                  {label}
                </Link>
              ) : (
                <Link
                  key={_id}
                  className={clsx(
                    "flex h-14 w-full flex-col items-center justify-center border-x border-border dark:border-dark-border",
                    "backdrop-blur-xl transition-colors duration-150 hover:bg-black/5 dark:hover:bg-white/5",
                  )}
                  href={href ?? "#"}
                >
                  {label}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
