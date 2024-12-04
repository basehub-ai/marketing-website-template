"use client";

import { sendEvent } from "basehub/events";
import * as React from "react";

export function PageView({ _analyticsKey }: { _analyticsKey: string }) {
  React.useEffect(() => {
    return;
    sendEvent({
      name: "view",
      _analyticsKey,
    });
  }, [_analyticsKey]);

  return null;
}
