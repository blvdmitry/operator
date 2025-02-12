import React from "react";
import env from "@bookingcom/bui-env-react";
import Button from "components/Button";
import { ToastProvider, useToast } from "components/Toast";
import type * as TToast from "components/Toast/Toast.types";

const ActivateToast = (props: { toast: TToast.Props }) => {
  const { show } = useToast();
  return (
    <Button
      className="activate-toast-button"
      text="Show toast"
      onClick={() => show(props.toast, 1000)}
    />
  );
};

env.test.vrt({
  default: {
    component: (
      <ToastProvider>
        <ActivateToast
          toast={{
            text: "Toast content",
          }}
        />
      </ToastProvider>
    ),
    interactive: async (client) => {
      const buttonEl = client.body.querySelector(
        ".activate-toast-button"
      ) as HTMLElement;

      buttonEl.click();
      await client.wait(500);
      client.screenshot("active");
    },
    capture: "viewport",
    skipInitialCapture: true,
  },
  withAction: {
    component: (
      <ToastProvider>
        <ActivateToast
          toast={{
            text: "Toast content",
            action: {
              text: "Action",
              href: "https://www.booking.com/",
            },
          }}
        />
      </ToastProvider>
    ),
    interactive: async (client) => {
      const buttonEl = client.body.querySelector(
        ".activate-toast-button"
      ) as HTMLElement;

      buttonEl.click();
      await client.wait(500);
      client.screenshot("active");
    },
    capture: "viewport",
    skipInitialCapture: true,
  },
  verticalLayout: {
    component: (
      <ToastProvider>
        <ActivateToast
          toast={{
            text: "Toast content",
            layout: "vertical",
            action: {
              text: "Action",
              href: "https://www.booking.com/",
            },
          }}
        />
      </ToastProvider>
    ),
    interactive: async (client) => {
      const buttonEl = client.body.querySelector(
        ".activate-toast-button"
      ) as HTMLElement;

      buttonEl.click();
      await client.wait(500);
      client.screenshot("active");
    },
    capture: "viewport",
    skipInitialCapture: true,
  },
});
