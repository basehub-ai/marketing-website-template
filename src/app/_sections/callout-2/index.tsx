import { fragmentOn } from "basehub";
import { Section } from "@/common/layout";
import { TrackedButtonLink } from "@/app/_components/tracked_button";
import { buttonFragment } from "@/lib/basehub/fragments";

export const calloutv2Fragment = fragmentOn("CalloutV2Component", {
  title: true,
  subtitle: true,
  _analyticsKey: true,
  actions: {
    on_ButtonComponent: {
      _analyticsKey: true,
      ...buttonFragment,
    },
  },
});
type Callout2 = fragmentOn.infer<typeof calloutv2Fragment>;

export function Callout2(callout: Callout2) {
  return (
    <Section>
      <article className="flex flex-col justify-center gap-9 self-stretch rounded-xl bg-accent-500/10 p-6 dark:bg-accent-600/10 lg:flex-row lg:justify-between lg:p-10">
        <div className="flex flex-col gap-2">
          <h4 className="text-3xl font-medium text-text-primary dark:text-dark-text-primary lg:text-4xl">
            {callout.title}
          </h4>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary lg:text-xl">
            {callout.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 md:flex lg:flex-col">
          {callout.actions?.map((action) => (
            <TrackedButtonLink
              key={action._id}
              analyticsKey={action._analyticsKey}
              href={action.href}
              intent={action.type}
              name="secondary_cta_click"
            >
              {action.label}
            </TrackedButtonLink>
          ))}
        </div>
      </article>
    </Section>
  );
}
