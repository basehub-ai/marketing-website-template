"use client";

import { sendEvent } from "basehub/analytics";
import * as React from "react";

export function PageView({ _analyticsKey }: { _analyticsKey: string }) {
  React.useEffect(() => {
    sendEvent({
      name: "view",
      _analyticsKey,
    });
  }, [_analyticsKey]);

  return null;
}
