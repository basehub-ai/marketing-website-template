import {ThemeSwitcher} from "../_components/theme-switcher";

import {BigFeature} from "./sections/big-feature";
import {Companies} from "./sections/companies";
import {FeaturesList} from "./sections/features-list";
import {Hero} from "./sections/hero";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100svh-var(--header-height))]">
      <Hero />
      <Companies />
      <FeaturesList />
      <BigFeature />
      <section>{`<Features Grid  />`}</section>
      <section>{`<Features side by side />`}</section>
      <section>{`<CTA />`}</section>
      <section>{`<Second CTA />`}</section>
      <section>{`<Testimonials big Cards />`}</section>
      <section>{`<Testimonials Grid />`}</section>
      <section>{`<Pricing />`}</section>
      <section>{`<FAQs />`}</section>
      <section>{`<FAQs Accordions />`}</section>
      <section>{`<Newsletter />`}</section>
      <ThemeSwitcher />
    </main>
  );
}
