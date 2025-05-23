import type { Metadata } from "next";

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { Pump } from "basehub/react-pump";
import {
  GeneralEvents,
  fragmentOn,
  isCalloutComponent,
  isCalloutV2Component,
  isCompaniesComponent,
  isFaqComponent,
  isFeatureHeroComponent,
  isFeaturesBigImageComponent,
  isFeaturesCardsComponent,
  isFeaturesGridComponent,
  isFeaturesSideBySideComponent,
  isFormComponent,
  isFreeformTextComponent,
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
import { PageView } from "../_components/page-view";
import { FreeformText, freeformTextFragment } from "../_sections/freeform-text";
import { Form, formFragment } from "../_sections/form";

export const dynamic = "force-static";

export const generateStaticParams = async () => {
  const data = await basehub().query({
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

export const generateMetadata = async ({
  params: _params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata | undefined> => {
  const params = await _params;
  const data = await basehub({ draft: (await draftMode()).isEnabled }).query({
    site: {
      settings: { metadata: { defaultTitle: true, titleTemplate: true, defaultDescription: true } },
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
    title: page.metadataOverrides.title ?? data.site.settings.metadata.defaultTitle,
    description:
      page.metadataOverrides.description ?? data.site.settings.metadata.defaultDescription,
  };
};

function SectionsUnion({
  sections,
  eventsKey,
}: {
  sections: fragmentOn.infer<typeof sectionsFragment>["sections"];
  eventsKey: GeneralEvents["ingestKey"];
}): React.ReactNode {
  if (!sections) return null;

  return sections.map((comp) => {
    switch (true) {
      case isHeroComponent(comp):
        return <Hero {...comp} key={comp._id} eventsKey={eventsKey} />;
      case isFeaturesCardsComponent(comp):
        return <FeaturesList {...comp} key={comp._id} />;
      case isFeaturesGridComponent(comp):
        return <FeaturesGrid {...comp} key={comp._id} eventsKey={eventsKey} />;
      case isCompaniesComponent(comp):
        return <Companies {...comp} key={comp._id} />;
      case isFeaturesBigImageComponent(comp):
        return <BigFeature {...comp} key={comp._id} />;
      case isFeaturesSideBySideComponent(comp):
        return <SideFeatures {...comp} key={comp._id} eventsKey={eventsKey} />;
      case isCalloutComponent(comp):
        return <Callout {...comp} key={comp._id} eventsKey={eventsKey} />;
      case isCalloutV2Component(comp):
        return <Callout2 {...comp} key={comp._id} eventsKey={eventsKey} />;
      case isTestimonialSliderComponent(comp):
        return <Testimonials {...comp} key={comp._id} />;
      case isTestimonialsGridComponent(comp):
        return <TestimonialsGrid {...comp} key={comp._id} />;
      case isPricingComponent(comp):
        return <Pricing {...comp} key={comp._id} />;
      case isFaqComponent(comp) && comp.layout === "list":
        return <Faq {...comp} key={comp._id} />;
      case isFaqComponent(comp) && comp.layout === "accordion":
        return <AccordionFaq {...comp} key={comp._id} eventsKey={eventsKey} />;
      case isPricingTableComponent(comp):
        return <PricingTable {...comp} key={comp._id} />;
      case isFeatureHeroComponent(comp):
        return <FeatureHero {...comp} key={comp._id} eventsKey={eventsKey} />;
      case isFreeformTextComponent(comp):
        return <FreeformText {...comp} key={comp._id} />;
      case isFormComponent(comp):
        return <Form {...comp} key={comp._id} />;
      default:
        return null;
    }
  });
}

const sectionsFragment = fragmentOn("PagesItem", {
  sections: {
    __typename: true,
    on_BlockDocument: { _id: true },
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
    on_FreeformTextComponent: freeformTextFragment,
    on_FormComponent: formFragment,
  },
});

export default async function DynamicPage({
  params: _params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await _params;
  const slugs = params.slug;

  return (
    <Pump
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
                _analyticsKey: true,
                _id: true,
                pathname: true,
                sections: sectionsFragment.sections,
              },
            },
            generalEvents: {
              ingestKey: true,
            },
          },
        },
      ]}
    >
      {async ([
        {
          site: { pages, generalEvents },
        },
      ]) => {
        "use server";

        const page = pages.items[0];

        if (!page) notFound();

        const sections = page.sections;

        return (
          <>
            <PageView ingestKey={generalEvents.ingestKey} />
            <SectionsUnion sections={sections} eventsKey={generalEvents.ingestKey} />
          </>
        );
      }}
    </Pump>
  );
}
