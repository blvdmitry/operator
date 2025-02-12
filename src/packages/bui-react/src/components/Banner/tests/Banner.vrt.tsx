import React from "react";
import { InfoSignIcon } from "@bookingcom/bui-assets-react/streamline";
import env from "@bookingcom/bui-env-react";
import Banner from "components/Banner";
import Placeholder from "../../Placeholder";

env.test.vrt({
  defaultEmpty: (
    <Banner closeAriaLabel="Close banner">
      <Placeholder height="150px" />
    </Banner>
  ),
  default: (
    <Banner
      title="Booking.com in your pocket!"
      text="No need to print your booking confirmations for your 2 upcoming trips - see them in the app!"
      actions={[
        {
          text: "Download the app",
          variant: "secondary",
        },
      ]}
      closeAriaLabel="Close banner"
    />
  ),
  hintEmpty: (
    <Banner variant="hint" closeAriaLabel="Close banner">
      <Placeholder height="24px" />
    </Banner>
  ),
  hint: (
    <Banner
      variant="hint"
      title="It pays to have friends!"
      text="Get € 15 for every friend you invite to Booking.com"
      actions={[
        {
          text: "Start inviting",
          variant: "secondary",
        },
      ]}
      closeAriaLabel="Close banner"
    />
  ),
  calloutEmpty: (
    <Banner variant="callout" closeAriaLabel="Close banner">
      <Placeholder height="24px" />
    </Banner>
  ),
  startImageEmpty: {
    component: (
      <Banner
        startImage={{
          src: "/mock.png",
          alt: "Description for a11y",
        }}
        closeAriaLabel="Close banner"
      >
        <Placeholder height="150px" />
      </Banner>
    ),
    imageMocks: true,
  },
  startImage: {
    component: (
      <Banner
        startImage={{
          src: "/mock.png",
          alt: "Description for a11y",
        }}
        title="Booking.com in your pocket!"
        text="No need to print your booking confirmations for your 2 upcoming trips - see them in the app!"
        actions={[
          {
            text: "Download the app",
            variant: "secondary",
          },
        ]}
        closeAriaLabel="Close banner"
      />
    ),
    imageMocks: true,
  },
  startImageContentModeFit: {
    component: (
      <Banner
        startImage={{
          src: "/mock.png",
          alt: "Description for a11y",
          contentMode: "fit",
        }}
        title="Booking.com in your pocket!"
        text="No need to print your booking confirmations for your 2 upcoming trips - see them in the app!"
        actions={[
          {
            text: "Download the app",
            variant: "secondary",
          },
        ]}
        closeAriaLabel="Close banner"
      />
    ),
    imageMocks: true,
  },
  startIcon: (
    <Banner
      startIcon={InfoSignIcon}
      title="Booking.com in your pocket!"
      text="No need to print your booking confirmations for your 2 upcoming trips - see them in the app!"
      actions={[
        {
          text: "Download the app",
          variant: "secondary",
        },
      ]}
      closeAriaLabel="Close banner"
    />
  ),
  topImageEmpty: {
    component: (
      <Banner
        topImage={{
          src: "/mock.png",
          alt: "Description for a11y",
        }}
        closeAriaLabel="Close banner"
      >
        <Placeholder />
      </Banner>
    ),
    imageMocks: true,
  },
  topImage: {
    component: (
      <Banner
        dismissible={false}
        topImage={{
          src: "/mock.png",
          alt: "Description for a11y",
        }}
        title="Booking.com in your pocket!"
        text="No need to print your booking confirmations for your 2 upcoming trips - see them in the app!"
        actions={[
          {
            text: "Download the app",
            variant: "secondary",
          },
        ]}
        closeAriaLabel="Close banner"
      />
    ),
    imageMocks: true,
  },
  topImageContentModeFit: {
    component: (
      <Banner
        dismissible={false}
        topImage={{
          src: "/mock.png",
          alt: "Description for a11y",
          contentMode: "fit",
        }}
        title="Booking.com in your pocket!"
        text="No need to print your booking confirmations for your 2 upcoming trips - see them in the app!"
        actions={[
          {
            text: "Download the app",
            variant: "secondary",
          },
        ]}
        closeAriaLabel="Close banner"
      />
    ),
    imageMocks: true,
  },
  topImageDismissible: {
    component: (
      <Banner
        topImage={{
          src: "/mock.png",
          alt: "Description for a11y",
        }}
        title="Booking.com in your pocket!"
        text="No need to print your booking confirmations for your 2 upcoming trips - see them in the app!"
        actions={[
          {
            text: "Download the app",
            variant: "secondary",
          },
        ]}
        closeAriaLabel="Close banner"
      />
    ),
    imageMocks: true,
  },
});
