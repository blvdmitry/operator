import React from "react";
import { BackpackIcon } from "@bookingcom/bui-assets-react/streamline";
import env from "@bookingcom/bui-env-react";
import Placeholder from "components/Placeholder";
import EmptyState from "components/EmptyState";

env.test.vrt({
  icon: (
    <EmptyState
      icon={BackpackIcon}
      title="Your trips live here"
      text="You don’t have any bookings yet. You can import a booking using your booking confirmation number and PIN."
      button={{
        text: "Sign in",
      }}
      link={{
        text: "Import booking",
      }}
    />
  ),
  topIllustration: {
    component: (
      <EmptyState
        topIllustration={<Placeholder width="256px" height="256px" />}
        title="Your trips live here"
        text="You don’t have any bookings yet. You can import a booking using your booking confirmation number and PIN."
        button={{
          text: "Sign in",
        }}
        link={{
          text: "Import booking",
        }}
      />
    ),
    viewports: ["small", "medium"],
  },
  startIllustration: {
    component: (
      <EmptyState
        startIllustration={<Placeholder width="256px" height="256px" />}
        title="Your trips live here"
        text="You don’t have any bookings yet. You can import a booking using your booking confirmation number and PIN."
        button={{
          text: "Sign in",
        }}
        link={{
          text: "Import booking",
        }}
      />
    ),
    viewports: ["small", "medium"],
  },
});
