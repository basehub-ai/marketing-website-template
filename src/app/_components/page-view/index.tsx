"use client";

import { GeneralEvents } from ".basehub/schema";
import { sendEvent } from "basehub/events";
import * as React from "react";

export function PageView({ ingestKey }: { ingestKey: GeneralEvents["ingestKey"] }) {
  React.useEffect(() => {
    sendEvent(ingestKey, {
      eventType: "view",
    });
  }, [ingestKey]);

  return null;
}
