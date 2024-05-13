import {Pump} from ".basehub/react-pump";
import {isFeaturesCardsComponent} from ".basehub/schema";

import {ThemeSwitcher} from "../_components/theme-switcher";

import {AccordionFaq} from "./sections/accordion-faq";
import {BigFeature} from "./sections/big-feature";
import {Callout1} from "./sections/callout-1";
import {Callout2} from "./sections/callout-2";
import {Companies} from "./sections/companies";
import {Faq} from "./sections/faq";
import {FeaturesGrid} from "./sections/features-grid";
import {FeaturesList, featureCardsComponent} from "./sections/features-list";
import {Hero} from "./sections/hero";
import {Newsletter} from "./sections/newsletter/newsletter";
import {Pricing} from "./sections/pricing";
import {SideFeatures} from "./sections/side-features";
import {Testimonials} from "./sections/testimonials";
import {TestimonialsGrid} from "./sections/testimonials-grid";

export default async function HomePage() {
  return (
    <main className="min-h-[calc(100svh-var(--header-height))]">
      {/* <Pump
        queries={[
          {
            home: {
              on_FeaturesCardsComponent: featureCardsComponent,
            },
          },
        ]}
      >
        {async ([{home}]) => {
          "use server";

          return home?.map((comp) => {
            switch (true) {
              case isFeaturesCardsComponent(comp):
                return <FeaturesList {...comp} />;
              default:
                return null;
            }
          });
        }}
      </Pump> */}
      <Hero />
      <Companies />

      <BigFeature />
      <FeaturesGrid />
      <SideFeatures />
      <Callout1 />
      <Callout2 />
      <Testimonials />
      <TestimonialsGrid />
      <Pricing />
      <Faq />
      <AccordionFaq />
      <Newsletter />
      <ThemeSwitcher />
    </main>
  );
}
