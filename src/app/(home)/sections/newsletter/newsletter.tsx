import {Button} from "@/common/button";
import {Section} from "@/common/layout";

export function Newsletter() {
  return (
    <Section
      className="bg-surface-secondary p-6 pt-4 dark:bg-dark-surface-secondary"
      container="full"
    >
      <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between lg:px-6">
        <div className="flex flex-col items-start gap-2">
          <h5 className="text-xl font-medium lg:text-2xl">Stay Ahead of the AI Curve</h5>
          <p className="text-text-tertiary dark:text-dark-text-tertiary">
            Join our newsletter for exclusive insights and updates on the latest AI trends.
          </p>
        </div>

        <form className="group flex h-10 w-full max-w-[400px] items-center justify-between gap-3 rounded-full border border-border bg-surface-primary py-2 pl-5 pr-1 outline-control has-[:focus]:outline dark:border-dark-border dark:bg-dark-surface-primary lg:h-12">
          <input
            className="flex-1 bg-transparent text-xs text-text-primary placeholder-text-tertiary outline-none dark:text-dark-text-primary dark:placeholder-dark-text-tertiary lg:text-sm"
            placeholder="Your email"
            type="email"
          />
          <Button className="lg:h-9">Submit</Button>
        </form>
      </div>
    </Section>
  );
}
