"use client";

import { getEventCount, sendEvent } from "basehub/analytics";
import React from "react";

export function PageView({
  _analyticsKey,
  render,
}: {
  _analyticsKey: string;
  render?: (count?: number) => React.ReactNode;
}) {
  const [count, setCount] = React.useState<number>();

  // On mount, send the event
  React.useEffect(() => {
    sendEvent({ _analyticsKey, name: "page_view" });
  }, [_analyticsKey]);

  // We also get the event count so we can render it
  React.useEffect(() => {
    getEventCount({ _analyticsKey, name: "page_view" }).then((count) => {
      setCount(count);
    });
  }, [_analyticsKey]);

  return render ? render(count) : null;
}
