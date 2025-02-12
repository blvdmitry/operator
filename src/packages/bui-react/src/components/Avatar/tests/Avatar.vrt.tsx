import React from "react";
import { PersonHalfIcon } from "@bookingcom/bui-assets-react/streamline";
import env from "@bookingcom/bui-env-react";
import Avatar from "components/Avatar";

env.test.vrt({
  sizeSmall: {
    component: <Avatar src="/mock.png" size="small" />,
    imageMocks: true,
  },
  sizeMedium: {
    component: <Avatar src="/mock.png" />,
    imageMocks: true,
  },
  sizeLarge: {
    component: <Avatar src="/mock.png" size="large" />,
    imageMocks: true,
  },
  sizeLarger: {
    component: <Avatar src="/mock.png" size="larger" />,
    imageMocks: true,
  },
  sizeLargest: {
    component: <Avatar src="/mock.png" size="largest" />,
    imageMocks: true,
  },
  responsiveSize: {
    component: <Avatar src="/mock.png" size={{ s: "largest", m: "large" }} />,
    viewports: ["small", "medium"],
    imageMocks: true,
  },
  colorDestructive: <Avatar text="DS" color="destructive" />,
  colorConstructive: <Avatar text="DS" color="constructive" />,
  colorCallout: <Avatar text="DS" color="callout" />,
  colorAccent: <Avatar text="DS" color="accent" />,
  colorInherit: <Avatar text="DS" color="inherit" />,
  flagBorderWidth: {
    component: <Avatar countryCode="nl" outline="destructive" />,
    imageMocks: true,
  },
  text: <Avatar text="DS" />,
  icon: <Avatar icon={PersonHalfIcon} />,
});
