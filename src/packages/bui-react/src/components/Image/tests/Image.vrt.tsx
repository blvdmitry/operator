import React from "react";
import env from "@bookingcom/bui-env-react";
import Image from "components/Image";
import Placeholder from "components/Placeholder";

env.test.vrt({
  default: {
    component: (
      <Image
        src="/mock.png"
        height={200}
        width={200}
        alt="A random image from Unsplash"
      />
    ),
    imageMocks: true,
  },
  contentModeFill: {
    component: (
      <Image src="/mock.png" height={200} width={200} alt="Random picture" />
    ),
    imageMocks: true,
  },
  contentModeFit: {
    component: (
      <Image
        src="/mock.png"
        height={200}
        width={200}
        contentMode="fit"
        alt="Random picture"
      />
    ),
    imageMocks: true,
  },
  fallbackImage: (
    <Image
      alt="Fallback set to an illustration"
      height={200}
      width={200}
      fallback="image"
      fallbackImage={<Placeholder width="100%" height="100%" />}
    />
  ),
  fallbackIcon: (
    <Image
      alt="Fallback set to the default icon"
      height={200}
      width={200}
      fallback="icon"
    />
  ),
  fallbackBackground: (
    <Image
      alt="Fallback set to background"
      height={200}
      width={200}
      fallback="background"
    />
  ),
  responsiveWidthAndHeight: {
    component: (
      <Image
        src="/mock.png"
        height={{ s: 200, m: 150 }}
        width={{ s: "100%", m: 150 }}
        alt="A random image from Unsplash"
      />
    ),
    imageMocks: true,
    viewports: ["small", "medium"],
  },
});
