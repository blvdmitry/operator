import React from "react";
import env from "@bookingcom/bui-env-react";
import AvatarBlock from "components/AvatarBlock";
import Stack from "components/Stack";
import Box from "components/Box";

env.test.vrt({
  viewports: {
    component: (
      <Stack>
        <AvatarBlock
          avatar={{ src: "/mock.png" }}
          size="small"
          title="Small title"
        />
        <AvatarBlock
          avatar={{ src: "/mock.png" }}
          size="medium"
          title="Medium title"
          subtitle="Medium subtitle"
        />
        <AvatarBlock
          avatar={{ src: "/mock.png" }}
          size="large"
          title="Large title"
          subtitle="Large subtitle"
        />
      </Stack>
    ),
    imageMocks: true,
  },
  responsiveSizes: {
    component: (
      <AvatarBlock
        avatar={{ src: "/mock.png" }}
        size={{ s: "large", m: "medium" }}
        title="Small title"
      />
    ),
    viewports: ["small", "medium"],
    imageMocks: true,
  },
  color: {
    component: (
      <Box backgroundColor="brand_primary" borderRadius={100}>
        <AvatarBlock
          avatar={{ src: "/mock.png" }}
          title="Medium title"
          subtitle="Medium subtitle"
          color="inherit"
        />
      </Box>
    ),
    imageMocks: true,
  },
});
