import {ThemeSwitcher} from "../_components/theme-switcher";

import {BigFeature} from "./sections/big-feature";
import {Callout1} from "./sections/callout-1";
import {Callout2} from "./sections/callout-2";
import {Companies} from "./sections/companies";
import {FeaturesGrid} from "./sections/features-grid";
import {FeaturesList} from "./sections/features-list";
import {Hero} from "./sections/hero";
import {SideFeatures} from "./sections/side-features";
import {Testimonials} from "./sections/testimonials";
import {TestimonialsGrid} from "./sections/testimonials-grid";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100svh-var(--header-height))]">
      <Hero />
      <Companies />
      <FeaturesList />
      <BigFeature />
      <FeaturesGrid />
      <SideFeatures />
      <Callout1 />
      <Callout2 />
      <Testimonials />
      <TestimonialsGrid />
      <section>{`<Pricing />`}</section>
      <section>{`<FAQs />`}</section>
      <section>{`<FAQs Accordions />`}</section>
      <section>{`<Newsletter />`}</section>
      <ThemeSwitcher />
    </main>
  );
}
