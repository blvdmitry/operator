import React from "react";
import env from "@bookingcom/bui-env-react";
import Title from "components/Title";
import Stack from "components/Stack";
import Box from "components/Box";

env.test.vrt({
  variant: (
    <Stack>
      <Title
        title="Display 3 title"
        subtitle="Display 3 subtitle"
        variant="display_3"
      />
      <Title
        title="Headline 1 title"
        subtitle="Headline 1 subtitle"
        variant="headline_1"
      />
      <Title
        title="Headline 2 title"
        subtitle="Headline 2 subtitle"
        variant="headline_2"
      />
      <Title
        title="Headline 3 title"
        subtitle="Headline 3 subtitle"
        variant="headline_3"
      />
      <Title
        title="Strong 1 title"
        subtitle="Strong 1 subtitle"
        variant="strong_1"
      />
      <Title
        title="Strong 2 title"
        subtitle="Strong 2 subtitle"
        variant="strong_2"
      />
    </Stack>
  ),
  reversed: (
    <Stack>
      <Title
        title="Display 3 title"
        subtitle="Display 3 subtitle"
        variant="display_3"
        reversed
      />
      <Title
        title="Headline 1 title"
        subtitle="Headline 1 subtitle"
        variant="headline_1"
        reversed
      />
      <Title
        title="Headline 2 title"
        subtitle="Headline 2 subtitle"
        variant="headline_2"
        reversed
      />
      <Title
        title="Headline 3 title"
        subtitle="Headline 3 subtitle"
        variant="headline_3"
        reversed
      />
      <Title
        title="Strong 1 title"
        subtitle="Strong 1 subtitle"
        variant="strong_1"
        reversed
      />
      <Title
        title="Strong 2 title"
        subtitle="Strong 2 subtitle"
        variant="strong_2"
        reversed
      />
    </Stack>
  ),
  color: (
    <Box backgroundColor="brand_primary">
      <Title color="inherit" title="Title" subtitle="Subtitle" />
    </Box>
  ),
});
