import clsx from "clsx";

import { fragmentOn } from "basehub";
import { AvatarsGroup } from "@/common/avatars-group";
import { Avatar } from "@/common/avatar";
import { avatarFragment } from "@/lib/basehub/fragments";
import { TrackedButtonLink } from "@/app/_components/tracked_button";

export const heroFragment = fragmentOn("HeroComponent", {
  _analyticsKey: true,
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
    on_ButtonComponent: {
      _analyticsKey: true,
      _id: true,
      href: true,
      label: true,
      type: true,
    },
  },
});
type Hero = fragmentOn.infer<typeof heroFragment>;

export function Hero(hero: Hero) {
  return (
    <section className="relative h-[calc(630px-var(--header-height))] overflow-hidden">
      <div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b border-border dark:border-dark-border">
        {/* Decorations */}
        <div className="col-span-1 flex h-full items-center justify-center" />
        <div className="col-span-1 flex h-full items-center justify-center border-x border-border dark:border-dark-border" />
        <div className="col-span-1 flex h-full items-center justify-center" />
      </div>
      {/* --- */}
      <figure className="pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full bg-accent-500/40 blur-[200px]" />
      <figure className="pointer-events-none absolute left-[4vw] top-[64px] z-20 hidden  aspect-square w-[32vw] rounded-full bg-surface-primary opacity-50 blur-[100px] dark:bg-dark-surface-primary md:block" />
      <figure className="pointer-events-none absolute bottom-[-50px] right-[7vw] z-20 hidden  aspect-square w-[30vw] rounded-full bg-surface-primary opacity-50 blur-[100px] dark:bg-dark-surface-primary md:block" />
      {/* --- */}
      <div className="relative z-10 flex flex-col divide-y divide-border pt-[35px] dark:divide-dark-border">
        <div className="flex flex-col items-center justify-end">
          <div className="flex items-center gap-2 !border !border-b-0 border-border px-4 py-2 dark:border-dark-border">
            <AvatarsGroup>
              {hero.customerSatisfactionBanner.avatars.items.map(({ avatar, _id }) => (
                <Avatar priority {...avatar} key={_id} />
              ))}
            </AvatarsGroup>
            <p className="text-sm tracking-tight text-text-tertiary dark:text-dark-text-tertiary">
              {hero.customerSatisfactionBanner.text}
            </p>
          </div>
        </div>
        <div>
          <div className="mx-auto flex h-[288px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-2 px-2 py-4 sm:px-16 lg:px-24">
            <h1 className="max-w-screen-lg text-pretty text-center text-[clamp(32px,7vw,64px)] font-medium leading-none tracking-[-1.44px] text-text-primary dark:text-dark-text-primary md:tracking-[-2.16px]">
              {hero.title}
            </h1>
            <h2 className="text-md max-w-2xl text-pretty text-center text-text-tertiary dark:text-dark-text-tertiary md:text-lg">
              {hero.subtitle}
            </h2>
          </div>
        </div>
        <div className="flex items-start justify-center px-8 sm:px-24">
          <div className="flex w-full max-w-[80vw] flex-col items-center justify-start md:!max-w-[392px]">
            {hero.actions?.map(({ href, label, type, _id, _analyticsKey }) => (
              <TrackedButtonLink
                key={_id}
                analyticsKey={_analyticsKey}
                className={clsx(
                  "!h-14 flex-col items-center justify-center rounded-none !text-base",
                  type === "primary"
                    ? "flex w-full"
                    : "max-w-sm:!border-x-0 flex w-full !border-x !border-y-0 border-border !bg-transparent backdrop-blur-xl transition-colors duration-150 hover:!bg-black/5 dark:border-dark-border dark:hover:!bg-white/5",
                )}
                href={href}
                intent={type}
                name="cta_click"
              >
                {label}
              </TrackedButtonLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
