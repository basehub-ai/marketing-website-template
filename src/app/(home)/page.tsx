import {Pump} from ".basehub/react-pump";
import {
  isCalloutComponent,
  isCalloutV2Component,
  isCompaniesComponent,
  isFeaturesBigImageComponent,
  isFeaturesCardsComponent,
  isFeaturesGridComponent,
  isFeaturesSideBySideComponent,
  isTestimonialSliderComponent,
} from ".basehub/schema";

import {ThemeSwitcher} from "../_components/theme-switcher";

import {AccordionFaq} from "./sections/accordion-faq";
import {BigFeature, bigFeatureFragment} from "./sections/big-feature";
import {Callout, calloutFragment} from "./sections/callout-1";
import {Callout2, calloutv2Fragment} from "./sections/callout-2";
import {Companies, companiesFragment} from "./sections/companies";
import {Faq} from "./sections/faq";
import {FeaturesGrid, featuresGridFragment} from "./sections/features-grid";
import {FeaturesList, featureCardsComponent} from "./sections/features-list";
import {Hero} from "./sections/hero";
import {Newsletter} from "./sections/newsletter/newsletter";
import {Pricing} from "./sections/pricing";
import {SideFeatures, featuresSideBySideFragment} from "./sections/side-features";
import {Testimonials, testimonialsSliderFragment} from "./sections/testimonials";
import {TestimonialsGrid} from "./sections/testimonials-grid";

export default async function HomePage() {
  return (
    <main className="min-h-[calc(100svh-var(--header-height))]">
      <Hero />
      <Pump
        draft
        queries={[
          {
            home: {
              __typename: true,
              on_FeaturesCardsComponent: featureCardsComponent,
              on_FeaturesSideBySideComponent: featuresSideBySideFragment,
              on_FeaturesBigImageComponent: bigFeatureFragment,
              on_FeaturesGridComponent: featuresGridFragment,
              on_CompaniesComponent: companiesFragment,
              on_CalloutComponent: calloutFragment,
              on_CalloutV2Component: calloutv2Fragment,
              on_TestimonialSliderComponent: testimonialsSliderFragment,
            },
          },
        ]}
      >
        {async ([{home}]) => {
          "use server";
          if (!home) return null;

          return home.map((comp) => {
            switch (true) {
              case isFeaturesCardsComponent(comp):
                return <FeaturesList {...comp} />;
              case isFeaturesGridComponent(comp):
                return <FeaturesGrid {...comp} />;
              case isCompaniesComponent(comp):
                return <Companies {...comp} />;
              case isFeaturesBigImageComponent(comp):
                return <BigFeature {...comp} />;
              case isFeaturesSideBySideComponent(comp):
                return <SideFeatures {...comp} />;
              case isCalloutComponent(comp):
                return <Callout {...comp} />;
              case isCalloutV2Component(comp):
                return <Callout2 {...comp} />;
              case isTestimonialSliderComponent(comp):
                return <Testimonials {...comp} />;
              default:
                return null;
            }
          });
        }}
      </Pump>
      <TestimonialsGrid />
      <Pricing />
      <Faq />
      <AccordionFaq />
      <Newsletter />
      <ThemeSwitcher />
    </main>
  );
}
