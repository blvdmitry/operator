import React from "react";
import env from "@bookingcom/bui-env-react";
import Placeholder from "components/Placeholder";
import Card, { CardProps } from "components/Card";
import Stack from "components/Stack";
import Title from "components/Title";
import Text from "components/Text";
import Button from "components/Button";
import AspectRatio from "components/AspectRatio";
import Box from "components/Box";
import Grid from "components/Grid";

env.test.vrt({
  defaultEmpty: (
    <Card>
      <Placeholder />
    </Card>
  ),
  defaultComposition: (
    <Card>
      <Stack gap={4}>
        <Title
          variant="headline_3"
          title="Title"
          subtitle="Optional Subtitle"
        />
        <Text>
          Card body text that doesn’t wrap past 4 lines. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.
        </Text>
        <Stack.Item>
          <Button>Card Action</Button>
        </Stack.Item>
      </Stack>
    </Card>
  ),
  mediaTop: {
    component: (
      <Card fill>
        <AspectRatio ratio="16:9">
          <img src="/mock.png" alt="Description for a11y" />
        </AspectRatio>
        <Box>
          <Stack gap={4}>
            <Title
              variant="headline_3"
              title="Title"
              subtitle="Optional subtitle"
            />
            <Text>
              Card body text that doesn’t wrap past 4 lines. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit.
            </Text>
            <Stack direction="row" gap={2}>
              <Button>Card Action</Button>
              <Button variant="secondary">Secondary Action</Button>
            </Stack>
          </Stack>
        </Box>
      </Card>
    ),
    imageMocks: true,
  },
  mediaStart: {
    component: (
      <Card fill>
        <Stack direction="row" gap={1}>
          <img
            style={{
              height: "100%",
              width: "150px",
              objectFit: "cover",
            }}
            src="/mock.png"
            alt="Description for a11y"
          />
          <Stack.Item grow>
            <Box>
              <Stack gap={4}>
                <Title
                  variant="strong_1"
                  title="Hotel Name"
                  subtitle="Optional Subtitle"
                />
                <Stack.Item>
                  <Text>1 room, 2 adults</Text>
                  <Text color="constructive">Confirmed</Text>
                </Stack.Item>
              </Stack>
            </Box>
          </Stack.Item>
        </Stack>
      </Card>
    ),
    imageMocks: true,
  },
  mediaEnd: {
    component: (
      <Card fill>
        <Stack direction="row" gap={1}>
          <Stack.Item grow>
            <Box>
              <Stack gap={4}>
                <Text variant="strong_1">Search and book your next flight</Text>
                <Stack.Item>
                  <Button variant="secondary" text="Search Flights" />
                </Stack.Item>
              </Stack>
            </Box>
          </Stack.Item>
          <img
            style={{
              height: "100%",
              width: "120px",
              objectFit: "cover",
            }}
            src="/mock.png"
            alt="Description for a11y"
          />
        </Stack>
      </Card>
    ),
    imageMocks: true,
  },
  bleedComposition: {
    component: (
      <Card bleed>
        <Grid>
          <Grid.Column size={3}>
            <AspectRatio>
              <img src="/mock.png" alt="Description for a11y" />
            </AspectRatio>
          </Grid.Column>
          <Grid.Column size={9}>
            <Stack gap={4}>
              <Title
                variant="strong_1"
                title="Title"
                subtitle="Optional Subtitle"
              />
              <Text>
                Card body text that doesn’t wrap past 4 lines. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit.
              </Text>

              <Stack.Item>
                <Button>Card Action</Button>
              </Stack.Item>
            </Stack>
          </Grid.Column>
        </Grid>
      </Card>
    ),
    imageMocks: true,
  },
  elevated: (
    <Card variant="elevated">
      <Stack gap={2}>
        <Title variant="strong_1" title="Title" subtitle="Optional Subtitle" />
        <Text>
          Card body text that doesn’t wrap past 4 lines. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.
        </Text>
        <Stack.Item>
          <Button>Card Action</Button>
        </Stack.Item>
      </Stack>
    </Card>
  ),
  variants: (
    <Stack direction="column">
      {(
        [
          "neutral",
          "elevated",
          "success",
          "error",
          "callout",
          "accent",
          "hint",
        ] as CardProps["variant"][]
      ).map((variant) => (
        <Card key={variant} variant={variant}>
          <Placeholder />
        </Card>
      ))}
    </Stack>
  ),
});
