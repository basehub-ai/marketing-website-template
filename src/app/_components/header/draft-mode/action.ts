"use server";

import { draftMode } from "next/headers";

export const disableDraftMode = async (_args: unknown) => {
  "use client";
  draftMode().disable();
};
