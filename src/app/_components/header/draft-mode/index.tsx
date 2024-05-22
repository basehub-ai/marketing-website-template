"use client";

import { disableDraftMode } from "./action";

export function DraftModeButton() {
  return (
    <button
      className="p-2 text-sm font-medium text-text-secondary underline hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
      onClick={() => disableDraftMode({})}
    >
      Disable
    </button>
  );
}
