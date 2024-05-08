import Image from "next/image";
import {CheckIcon} from "@radix-ui/react-icons";
import {cx} from "class-variance-authority";
import {Slot} from "@radix-ui/react-slot";

import {Section} from "@/common/layout";
import {Heading} from "@/common/heading";

const array = [
  {
    _id: 1,
    image: {
      alt: "",
      height: 60,
      url: "https://s3-alpha-sig.figma.com/img/f075/be06/5198c386d205be6ba57fefe41359ca99?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cgLbyrN3Nx3GApYZ1-JuHN2I8CY~hX99pc9FSL~-61wXSznsD7chsUlbaRtiMSsopqckDl6170QaXWBk77HsX2JNrO0f6QlTRXiyK77ixJrgtF2nVw49EqICHHd5l3v2bNPOFa2ZnhSGsX8Lz5mt17EU56b4OFsecxyBNRFiJhQS0UDktJKM8clXposLChnBLcTp-auB2oEfiPsGWwBvXslO8BnWs3R0E3VF-5DcdW6mFjbNoedv8LMYkRuafc9kMMqADdH93MJfyX2rBq5JgDHpGyWl~cuOaHVbvpol4Gr-Tm6W6Nt4D-7VtfwEArBbpG3c8BjUHyTpAGmKmt8XEg__",
      width: 100,
    },
    _title: "Natural Language Processing",
    subtitle: "Understand and interpret human language effortlessly.",
    list: [
      {
        _title: "Text Analysis",
      },
      {
        _title: "Speech Recognition",
      },
      {
        _title: "Language Translation",
      },
    ],
  },
  {
    _id: 2,
    image: {
      alt: "",
      height: 60,
      url: "data:image/png;base64,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",
      width: 100,
    },
    _title: "Natural Language Processing",
    subtitle:
      "Understand and interpret human language effortlessly. Labore occaecat deserunt adipisicing Lorem dolor sit consequat ea. Veniam mollit nisi non voluptate enim proident culpa. Commodo ea aute occaecat nostrud esse proident laboris mollit excepteur et veniam. Sunt commodo fugiat enim officia nisi ut.",
    list: [],
  },
];

export function FeaturesList() {
  return (
    <Section container="default">
      <Heading
        subtitle="Experience the future of technology with our AI-powered innovations."
        tag="Features"
      >
        <h4>Transformative AI Solutions</h4>
      </Heading>
      <div className="flex flex-col gap-6">
        {array.map(({image, ...item}) => (
          <article
            key={item._id}
            className="flex min-h-96 w-full max-w-[380px] flex-col rounded-lg border border-border bg-surface-secondary p-px dark:border-dark-border dark:bg-dark-surface-secondary sm:max-w-full md:w-full md:flex-row md:odd:flex-row-reverse xl:gap-16"
          >
            <figure className="p-2 md:h-auto md:w-[360px] lg:w-[480px] xl:w-[560px]">
              <img
                alt=""
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
                {item.list.map(({_title}) => (
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
}
