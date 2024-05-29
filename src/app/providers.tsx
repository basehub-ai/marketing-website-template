import { ThemeProvider } from "next-themes";

import { BaseHubThemeProvider } from "@/context/basehub-theme-provider";
import { ButtonLink } from "@/common/button";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      <BaseHubThemeProvider />
      <ForkInBaseHub />
      {children}
    </ThemeProvider>
  );
}

function ForkInBaseHub() {
  return (
    <ButtonLink
      className="z-modal fixed bottom-14 left-1/2 -translate-x-1/2 gap-x-1"
      href="https://basehub.com/basehub/marketing-website"
      size="lg"
      target="_blank"
    >
      <svg
        fill="none"
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M14.4634 5.7507C15.3198 5.7507 16.0141 5.05705 16.0141 4.20139C16.0141 3.34573 15.3198 2.65208 14.4634 2.65208C13.607 2.65208 12.9128 3.34573 12.9128 4.20139C12.9128 5.05705 13.607 5.7507 14.4634 5.7507ZM14.4634 7.0688C16.0484 7.0688 17.3334 5.78502 17.3334 4.20139C17.3334 2.61777 16.0484 1.33398 14.4634 1.33398C12.8784 1.33398 11.5935 2.61777 11.5935 4.20139C11.5935 5.78502 12.8784 7.0688 14.4634 7.0688Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M9.77601 17.3492C10.6324 17.3492 11.3267 16.6556 11.3267 15.7999C11.3267 14.9442 10.6324 14.2506 9.77601 14.2506C8.9196 14.2506 8.22535 14.9442 8.22535 15.7999C8.22535 16.6556 8.9196 17.3492 9.77601 17.3492ZM9.77601 18.6673C11.361 18.6673 12.6459 17.3835 12.6459 15.7999C12.6459 14.2163 11.361 12.9325 9.77601 12.9325C8.191 12.9325 6.9061 14.2163 6.9061 15.7999C6.9061 17.3835 8.191 18.6673 9.77601 18.6673Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M10.4356 9.71827V14.2392H9.11639V9.71827H10.4356Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M5.8574 6.73461V9.13501H4.53815L4.53815 6.73461H5.8574Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M15.1231 6.28803V9.11441H13.8038V6.28803H15.1231Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M15.1231 9.05922C15.1231 9.4232 14.8277 9.71827 14.4634 9.71827H5.19777C4.83347 9.71827 4.53815 9.4232 4.53815 9.05922C4.53815 8.69524 4.83347 8.40017 5.19777 8.40017H14.4634C14.8277 8.40017 15.1231 8.69524 15.1231 9.05922Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M3.98594 2.98635V5.41651H6.40977V2.98635H3.98594ZM3.32631 1.66826C2.96201 1.66826 2.66669 1.96332 2.66669 2.3273V6.07556C2.66669 6.43954 2.96201 6.73461 3.32631 6.73461H7.06939C7.43369 6.73461 7.72902 6.43954 7.72902 6.07556V2.3273C7.72902 1.96332 7.43369 1.66826 7.06939 1.66826H3.32631Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
      <span>Fork in BaseHub</span>
    </ButtonLink>
  );
}
