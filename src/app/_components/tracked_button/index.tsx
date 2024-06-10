"use client";

import { forwardRef } from "react";
import { sendEvent } from "basehub/analytics";
import { Button, ButtonLink } from "@/common/button";

interface TrackProps {
  analyticsKey: string;
  name: string;
}

type TrackedButtonProps = React.ComponentProps<typeof Button> & TrackProps;

export const TrackedButton = forwardRef<HTMLButtonElement, TrackedButtonProps>(
  ({ analyticsKey, children, onClick, name, ...props }, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        onClick={(e) => {
          sendEvent({
            name,
            _analyticsKey: analyticsKey,
          });
          if (onClick) {
            onClick(e);
          }
        }}
      >
        {children}
      </Button>
    );
  },
);

type TrackedButtonLinkProps = React.ComponentProps<typeof ButtonLink> & TrackProps;

export const TrackedButtonLink = forwardRef<HTMLAnchorElement, TrackedButtonLinkProps>(
  ({ analyticsKey, children, onClick, name, ...props }, ref) => {
    return (
      <ButtonLink
        {...props}
        ref={ref}
        onClick={(e) => {
          sendEvent({
            name,
            _analyticsKey: analyticsKey,
          });
          if (onClick) {
            onClick(e);
          }
        }}
      >
        {children}
      </ButtonLink>
    );
  },
);
