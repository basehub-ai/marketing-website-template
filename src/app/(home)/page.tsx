import {draftMode} from "next/headers";

import {Pump} from ".basehub/react-pump";
import {
  isCalloutComponent,
  isCalloutV2Component,
  isCompaniesComponent,
  isFaqComponent,
  isFeaturesBigImageComponent,
  isFeaturesCardsComponent,
  isFeaturesGridComponent,
  isFeaturesSideBySideComponent,
  isHeroComponent,
  isPricingComponent,
  isTestimonialSliderComponent,
  isTestimonialsGridComponent,
} from ".basehub/schema";
import {isDev} from "@/utils/constants";

import {ThemeSwitcher} from "../_components/theme-switcher";

import {AccordionFaq} from "./sections/accordion-faq";
import {BigFeature, bigFeatureFragment} from "./sections/big-feature";
import {Callout, calloutFragment} from "./sections/callout-1";
import {Callout2, calloutv2Fragment} from "./sections/callout-2";
import {Companies, companiesFragment} from "./sections/companies";
import {Faq, faqFragment} from "./sections/faq";
import {FeaturesGrid, featuresGridFragment} from "./sections/features-grid";
import {FeaturesList, featureCardsComponent} from "./sections/features-list";
import {Hero, heroFragment} from "./sections/hero";
import {Pricing, pricingFragment} from "./sections/pricing";
import {SideFeatures, featuresSideBySideFragment} from "./sections/side-features";
import {Testimonials, testimonialsSliderFragment} from "./sections/testimonials";
import {TestimonialsGrid, testimonialsGridFragment} from "./sections/testimonials-grid";

export default async function HomePage() {
  return (
    <Pump
      draft={draftMode().isEnabled || isDev}
      queries={[
        {
          home: {
            __typename: true,
            on_HeroComponent: heroFragment,
            on_FeaturesCardsComponent: featureCardsComponent,
            on_FeaturesSideBySideComponent: featuresSideBySideFragment,
            on_FeaturesBigImageComponent: bigFeatureFragment,
            on_FeaturesGridComponent: featuresGridFragment,
            on_CompaniesComponent: companiesFragment,
            on_CalloutComponent: calloutFragment,
            on_CalloutV2Component: calloutv2Fragment,
            on_TestimonialSliderComponent: testimonialsSliderFragment,
            on_TestimonialsGridComponent: testimonialsGridFragment,
            on_PricingComponent: pricingFragment,
            on_FaqComponent: {
              layout: true,
              ...faqFragment,
            },
          },
        },
      ]}
    >
      {async ([{home}]) => {
        "use server";
        if (!home) return null;

        return home.map((comp) => {
          switch (true) {
            case isHeroComponent(comp):
              return <Hero {...comp} />;
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
            case isTestimonialsGridComponent(comp):
              return <TestimonialsGrid {...comp} />;
            case isPricingComponent(comp):
              return <Pricing {...comp} />;
            case isFaqComponent(comp) && comp.layout === "list":
              return <Faq {...comp} />;
            case isFaqComponent(comp) && comp.layout === "accordion":
              return <AccordionFaq {...comp} />;
            default:
              return null;
          }
        });
      }}
    </Pump>
  );
}
