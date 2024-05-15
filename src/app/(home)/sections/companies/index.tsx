import Image from "next/image";
import {cx} from "class-variance-authority";

import {Section} from "@/common/layout";
import {fragmentOn} from ".basehub/schema";

import s from "./companies.module.scss";

export const companiesFragment = fragmentOn("CompaniesComponent", {
  companies: {
    items: {
      _title: true,
      url: true,
      image: {
        url: true,
      },
    },
  },
});

type Companies = fragmentOn.infer<typeof companiesFragment>;

export function Companies(props: Companies) {
  return (
    <Section>
      <h2 className="text-center text-dark-text-tertiary opacity-50">
        Join 4,000 companies already growing
      </h2>
      <div className="no-scrollbar relative flex max-w-full justify-center">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[30vw] bg-transparent bg-gradient-to-r from-surface-primary dark:from-dark-surface-primary xl:hidden" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[30vw] bg-transparent bg-gradient-to-l from-surface-primary dark:from-dark-surface-primary xl:hidden" />
        <div
          className={cx(
            "flex items-center gap-4 overflow-x-auto px-6 lg:gap-6 lg:px-12",
            s.scrollbar,
          )}
        >
          {props.companies.items.map((company) => (
            <figure key={company.url} className="px-2 py-3 lg:p-4">
              <Image
                alt={company._title}
                className="w-24 lg:w-32"
                height={20}
                src={company.image!.url}
                width={32}
              />
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
