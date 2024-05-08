export function Hero() {
  return (
    <section className="relative h-[calc(630px-var(--header-height))]">
      <div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(32px,10vw,120px)_auto_clamp(32px,10vw,120px)] grid-rows-[80px_auto_180px] divide-x divide-y divide-surface-tertiary border-y border-surface-tertiary dark:divide-dark-surface-tertiary dark:border-dark-surface-tertiary">
        {Array.from({length: 9}, (v, i) => i + 1).map((i) => (
          <div key={i} className="" />
        ))}
      </div>
      <div className="relative z-10 flex flex-col pt-[35px]">
        <div className="flex flex-col items-center justify-end">
          <div className="flex items-center gap-2 !border !border-b-0 border-surface-tertiary px-4 py-2 dark:border-dark-surface-tertiary">
            <div className="flex -space-x-3 rtl:space-x-reverse">
              <img
                alt=""
                className="size-7 rounded-full border-2 border-surface-primary dark:border-dark-surface-primary"
                src="https://i.pravatar.cc/"
              />
              <img
                alt=""
                className="size-7 rounded-full border-2 border-surface-primary dark:border-dark-surface-primary"
                src="https://i.pravatar.cc/"
              />
              <img
                alt=""
                className="size-7 rounded-full border-2 border-surface-primary dark:border-dark-surface-primary"
                src="https://i.pravatar.cc/"
              />
            </div>
            <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
              10k+ happy customers
            </p>
          </div>
        </div>

        <div className="flex h-[288px] shrink-0 flex-col items-center justify-center gap-2 px-8 py-4 sm:px-24">
          <h1 className="max-w-screen-md text-pretty text-center text-[clamp(32px,10vw,64px)] font-normal leading-none tracking-tighter text-text-primary dark:text-dark-text-primary">
            Unleash the power of AI Innovation. Title up to three lines
          </h1>
          <h2 className="text-center text-lg text-text-tertiary dark:text-dark-text-tertiary">
            Revolutionize your business with our cutting-edge AI solutions.
          </h2>
        </div>
        <div className="flex items-start justify-center px-8 sm:px-24">
          <div className="flex w-full max-w-[392px] flex-col items-center justify-start">
            <p className="flex h-14 w-full flex-col items-center justify-center border-x border-surface-tertiary dark:border-dark-surface-tertiary">
              Request demo
            </p>
            <p className=" flex h-14 w-full flex-col items-center justify-center bg-text-primary text-dark-text-primary dark:bg-dark-text-primary dark:text-text-primary">
              Get Started Today
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
