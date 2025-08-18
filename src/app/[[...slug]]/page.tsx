import type { Metadata } from "next";

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { Pump } from "basehub/react-pump";
import { GeneralEvents } from "@/../basehub-types";
import { basehub, fragmentOn } from "basehub";

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
  comp,
  eventsKey,
}: {
  comp: NonNullable<fragmentOn.infer<typeof sectionsFragment>["sections"]>[number];
  eventsKey: GeneralEvents["ingestKey"];
}): React.ReactNode {
  switch (comp.__typename) {
    case "HeroComponent":
      return <Hero {...comp} key={comp._id} eventsKey={eventsKey} />;
    case "FeaturesCardsComponent":
      return <FeaturesList {...comp} key={comp._id} />;
    case "FeaturesGridComponent":
      return <FeaturesGrid {...comp} key={comp._id} eventsKey={eventsKey} />;
    case "CompaniesComponent":
      return <Companies {...comp} key={comp._id} />;
    case "FeaturesBigImageComponent":
      return <BigFeature {...comp} key={comp._id} />;
    case "FeaturesSideBySideComponent":
      return <SideFeatures {...comp} key={comp._id} eventsKey={eventsKey} />;
    case "CalloutComponent":
      return <Callout {...comp} key={comp._id} eventsKey={eventsKey} />;
    case "CalloutV2Component":
      return <Callout2 {...comp} key={comp._id} eventsKey={eventsKey} />;
    case "TestimonialSliderComponent":
      return <Testimonials {...comp} key={comp._id} />;
    case "TestimonialsGridComponent":
      return <TestimonialsGrid {...comp} key={comp._id} />;
    case "PricingComponent":
      return <Pricing {...comp} key={comp._id} />;
    case "FaqComponent":
      return <Faq {...comp} key={comp._id} />;
    case "FaqComponent":
      return <AccordionFaq {...comp} key={comp._id} eventsKey={eventsKey} />;
    case "PricingTableComponent":
      return <PricingTable {...comp} key={comp._id} />;
    case "FeatureHeroComponent":
      return <FeatureHero {...comp} key={comp._id} eventsKey={eventsKey} />;
    case "FreeformTextComponent":
      return <FreeformText {...comp} key={comp._id} />;
    case "FormComponent":
      return <Form {...comp} key={comp._id} />;
    default:
      return null;
  }
}

const sectionsFragment = fragmentOn("PagesItem", {
  sections: {
    __typename: true,
    on_BlockDocument: { _id: true, _slug: true },
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
            {sections?.map((section) => {
              return (
                <div key={section._id} id={section._slug}>
                  <SectionsUnion comp={section} eventsKey={generalEvents.ingestKey} />
                </div>
              );
            })}
          </>
        );
      }}
    </Pump>
  );
}
