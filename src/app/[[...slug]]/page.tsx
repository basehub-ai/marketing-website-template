import { draftMode } from "next/headers";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { Pump } from ".basehub/react-pump";
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
import { basehub } from ".basehub/index";

import { AccordionFaq } from "../_sections/accordion-faq";
import { BigFeature, bigFeatureFragment } from "../_sections/big-feature";
import { Callout, calloutFragment } from "../_sections/callout-1";
import { Callout2, calloutv2Fragment } from "../_sections/callout-2";
import { Companies, companiesFragment } from "../_sections/companies";
import { Faq, faqFragment } from "../_sections/faq";
import { FeaturesGrid, featuresGridFragment } from "../_sections/features-grid";
import { FeaturesList, featureCardsComponent } from "../_sections/features-list";
import { Hero, heroFragment } from "../_sections/hero";
import { Pricing, pricingFragment } from "../_sections/pricing";
import { SideFeatures, featuresSideBySideFragment } from "../_sections/side-features";
import { Testimonials, testimonialsSliderFragment } from "../_sections/testimonials";
import { TestimonialsGrid, testimonialsGridFragment } from "../_sections/testimonials-grid";

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await basehub({ cache: "no-store" }).query({
    site: {
      settings: {
        metadata: {
          sitename: true,
          titleTemplate: true,
          favicon: {
            url: true,
            mimeType: true,
          },
        },
      },
    },
  });

  return {
    title: "Home",
    description: "Home page",
    icons: [
      {
        url: data.site.settings.metadata.favicon.url,
        rel: "icon",
        type: data.site.settings.metadata.favicon.mimeType,
      },
    ],
  };
};

export default async function DynamicPage({ params }: { params: { slug?: string[] } }) {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }}
      queries={[
        {
          site: {
            pages: {
              __args: {
                filter: {
                  pathname: {
                    eq: params.slug ? params.slug.join("/") : "/",
                  },
                },
              },
              items: {
                sections: {
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
            },
          },
        },
      ]}
    >
      {async ([
        {
          site: { pages },
        },
      ]) => {
        "use server";

        const page = pages.items.at(0);

        if (!page) return notFound();
        const sections = page.sections;

        return sections?.map((comp) => {
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
