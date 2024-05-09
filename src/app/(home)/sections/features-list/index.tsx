import Image from "next/image";
import {CheckIcon} from "@radix-ui/react-icons";

import {Section} from "@/common/layout";
import {Heading} from "@/common/heading";
import {Pump} from ".basehub/react-pump";

export async function FeaturesList() {
  return (
    <Pump
      queries={[
        {
          home: {
            featuresSection: {
              subtitle: true,
              tag: true,
              title: true,
              features: {
                items: {
                  _title: true,
                  subtitle: true,
                  image: {
                    alt: true,
                    width: true,
                    height: true,
                    url: true,
                  },
                  subfeatures: {
                    items: {_title: true},
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
          home: {featuresSection},
        },
      ]) => {
        "use server";

        return (
          <Section container="default">
            <Heading subtitle={featuresSection.subtitle} tag={featuresSection.tag}>
              <h4>{featuresSection.title}</h4>
            </Heading>
            <div className="flex flex-col gap-6">
              {featuresSection.features.items.map(({image, ...item}) => (
                <article
                  key={item._title}
                  className="flex min-h-96 w-full max-w-[380px] flex-col rounded-lg border border-border bg-surface-secondary p-px dark:border-dark-border dark:bg-dark-surface-secondary sm:max-w-full md:w-full md:flex-row md:odd:flex-row-reverse xl:gap-16"
                >
                  <figure className="p-2 md:h-auto md:w-[360px] lg:w-[480px] xl:w-[560px]">
                    <Image
                      alt={image.alt ?? ""}
                      className="block aspect-video h-[200px] w-full rounded-lg object-cover md:h-full"
                      height={image.height}
                      src={image.url}
                      width={image.width}
                    />
                  </figure>
                  <div className="flex flex-col gap-8 p-5 pt-6 md:flex-1 md:p-10">
                    <div className="flex flex-col items-start gap-2">
                      <h5 className="text-2xl font-medium text-text-primary dark:text-dark-text-primary md:text-3xl">
                        {item._title}
                      </h5>
                      <p className="font-normal text-text-secondary dark:text-dark-text-secondary md:text-lg">
                        {item.subtitle}
                      </p>
                    </div>
                    <ul className="flex flex-col items-start gap-5 pl-2 md:text-lg">
                      {item.subfeatures.items.map(({_title}) => (
                        <li
                          key={_title}
                          className="flex items-center gap-4 font-normal text-text-secondary dark:text-dark-text-secondary"
                        >
                          <span className="flex size-6 items-center justify-center rounded-full bg-surface-tertiary dark:bg-surface-tertiary">
                            <CheckIcon />
                          </span>
                          {_title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        );
      }}
    </Pump>
  );
}
