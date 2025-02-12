import React from "react";
import env from "@bookingcom/bui-env-react";
import Box from "components/Box";

env.test.vrt({
  padding: <Box padding={2}>Content</Box>,
  responsivePadding: {
    component: <Box padding={{ s: 2, m: 4 }}>Content</Box>,
    viewports: ["small", "medium"],
  },
  responsivePaddingWithNestedComponents: {
    component: (
      <Box padding={{ s: 2, m: 4 }}>
        <Box padding={2}>Content</Box>
      </Box>
    ),
    viewports: ["small", "medium", "large"],
  },
  orientationVertical: <Box orientation="vertical">Content</Box>,
  orientationHorizontal: <Box orientation="horizontal">Content</Box>,
  backgroundBrandPrimary: <Box backgroundColor="brand_primary">Content</Box>,
  elevationWithBorder: (
    <Box
      backgroundColor="elevation_one"
      borderColor="neutral_alt"
      borderRadius={200}
    >
      Content
    </Box>
  ),
  destructiveWithBorder: (
    <Box
      backgroundColor="destructive_alt"
      borderColor="destructive"
      borderRadius={200}
    >
      Content
    </Box>
  ),
  circleRadius: (
    <Box borderColor="neutral_alt" borderRadius="circle">
      Content
    </Box>
  ),
});
