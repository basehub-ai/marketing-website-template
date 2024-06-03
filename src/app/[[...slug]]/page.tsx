import type { Metadata, ResolvingMetadata } from "next";

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { Pump } from "basehub/react-pump";
import {
  isCalloutComponent,
  isCalloutV2Component,
  isCompaniesComponent,
  isFaqComponent,
  isFeatureHeroComponent,
  isFeaturesBigImageComponent,
  isFeaturesCardsComponent,
  isFeaturesGridComponent,
  isFeaturesSideBySideComponent,
  isHeroComponent,
  isPricingComponent,
  isPricingTableComponent,
  isTestimonialSliderComponent,
  isTestimonialsGridComponent,
} from ".basehub/schema";
import { basehub } from "basehub";

import { AccordionFaq } from "../_sections/accordion-faq";
import { BigFeature, bigFeatureFragment } from "../_sections/features/big-feature";
import { Callout, calloutFragment } from "../_sections/callout-1";
import { Callout2, calloutv2Fragment } from "../_sections/callout-2";
import { Companies, companiesFragment } from "../_sections/companies";
import { Faq, faqFragment } from "../_sections/faq";
import { FeaturesGrid, featuresGridFragment } from "../_sections/features/features-grid";
import { FeaturesList, featureCardsComponent } from "../_sections/features/features-list";
import { Hero, heroFragment } from "../_sections/hero";
import { Pricing, pricingFragment } from "../_sections/pricing";
import { SideFeatures, featuresSideBySideFragment } from "../_sections/features/side-features";
import { Testimonials, testimonialsSliderFragment } from "../_sections/testimonials";
import { TestimonialsGrid, testimonialsGridFragment } from "../_sections/testimonials-grid";
import { PricingTable } from "../_sections/pricing-comparation";
import { pricingTableFragment } from "../_sections/pricing-comparation/fragments";
import FeatureHero, { featureHeroFragment } from "../_sections/features/hero";

export const dynamic = "force-static";

export const dynamicParams = false;

export const revalidate = 30;

export const generateStaticParams = async () => {
  const data = await basehub({ cache: "no-store" }).query({
    site: {
      pages: {
        items: {
          pathname: true,
        },
      },
    },
  });

  return data.site.pages.items.map((item) => ({
    slug: item.pathname.split("/").filter(Boolean),
  }));
};

export const generateMetadata = async (
  { params }: { params: { slug?: string[] } },
  currentMetadata: ResolvingMetadata,
): Promise<Metadata | undefined> => {
  const meta = await currentMetadata;

  const data = await basehub({ cache: "no-store", draft: draftMode().isEnabled }).query({
    site: {
      pages: {
        __args: {
          filter: {
            pathname: {
              eq: params.slug ? `/${params.slug.join("/")}` : "/",
            },
          },
        },
        items: {
          metadataOverrides: {
            title: true,
            description: true,
            ogImage: {
              url: true,
              mimeType: true,
              alt: true,
            },
          },
        },
      },
    },
  });

  const page = data.site.pages.items.at(0);

  if (!page) {
    return notFound();
  }

  return {
    title: page.metadataOverrides.title,
    description: page.metadataOverrides.description,
    openGraph: {
      type: "website",
      images: [
        ...(page.metadataOverrides.ogImage ? [page.metadataOverrides.ogImage.url] : []),
        ...(meta.openGraph?.images ?? []),
      ],
    },
  };
};

export default async function DynamicPage({ params }: { params: { slug?: string[] } }) {
  const slugs = params.slug;

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
                    eq: slugs ? `/${slugs.join("/")}` : "/",
                  },
                },
                first: 1,
              },
              items: {
                _id: true,
                pathname: true,
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
                  on_PricingTableComponent: pricingTableFragment,
                  on_FeatureHeroComponent: featureHeroFragment,
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

        const page = pages.items[0];

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
            case isPricingTableComponent(comp):
              return <PricingTable {...comp} />;
            case isFeatureHeroComponent(comp):
              return <FeatureHero {...comp} />;
            default:
              return null;
          }
        });
      }}
    </Pump>
  );
}
