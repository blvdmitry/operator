import React from "react";
import { configure } from "@bookingcom/foundry-react";
import BUIProvider from "../../components/BUIProvider";
import Container from "../../components/Container";
import LegacyTheme from "../../themes/legacy";
import TravellerTheme from "../../themes/traveller";
import TravellerExTheme from "../../themes/traveller_ex";
import RentalcarsTheme from "../../themes/rentalcars";

const Wrapper = ({ children, theme, mode }) => {
  return (
    <BUIProvider
      theme={theme}
      themeMode={mode}
      id="foundry-preview"
      // experiments={{ slider_container_animation_duration: () => true }}
    >
      <Container>{children}</Container>
    </BUIProvider>
  );
};

configure({
  name: "BUI React",
  description: "Component library implementing BUI in React",
  ownership: {
    orgId: [60008228],
    include: ["dbelyaev"],
  },
  url: "https://design-systems.pages.booking.com/bui/bui-web/react/revs/latest/",
  logo: "./public/logo.svg",
  showExamplesInDocsOnly: true,
  themes: [
    {
      theme: TravellerTheme,
      definition: {
        darkDefinition: TravellerTheme.darkDefinition,
        lightDefinition: TravellerTheme.lightDefinition,
      },
    },
    {
      theme: RentalcarsTheme,
      definition: {
        darkDefinition: RentalcarsTheme.darkDefinition,
        lightDefinition: RentalcarsTheme.lightDefinition,
      },
    },
    {
      theme: LegacyTheme,
      definition: {
        darkDefinition: LegacyTheme.darkDefinition,
        lightDefinition: LegacyTheme.lightDefinition,
      },
    },
    {
      theme: TravellerExTheme,
      definition: {
        darkDefinition: TravellerExTheme.darkDefinition,
        lightDefinition: TravellerExTheme.lightDefinition,
      },
    },
  ],
  links: {
    slack: {
      name: "#bui-react",
      url: "https://booking.slack.com/archives/CBBUC8HH7",
    },
    gitlab: {
      name: "BUI React",
      url: "https://gitlab.booking.com/design-systems/bui/bui-web",
    },
  },

  order: [
    {
      name: "Getting started",
      order: 0,
      children: [
        {
          name: "Repository",
          order: 0,
        },
        {
          name: "Iconography",
          order: 1,
        },
        {
          name: "Installation",
          order: 2,
        },
        {
          name: "Major releases",
          order: 3,
        },
        {
          name: "Hooks",
          order: 4,
        },
      ],
    },
    {
      name: "Foundations",
      order: 1,
      children: [
        {
          name: "Color",
          order: 0,
        },
        {
          name: "Spacing",
          order: 1,
        },
        {
          name: "Typography",
          order: 2,
        },
        {
          name: "Other tokens",
          order: 3,
        },
      ],
    },
    {
      name: "Components",
      order: 2,
      children: [
        {
          name: "Utilities",
          order: 0,
        },
        {
          name: "Elements",
          order: 1,
        },
        {
          name: "Containers",
          order: 2,
        },
        {
          name: "Patterns",
          order: 3,
        },
        {
          name: "Deprecated",
          order: 4,
        },
      ],
    },
  ],
  // versioning: true, enable this when we fix versioner issue
  gaId: "UA-92977044-52",
  render: {
    Wrapper,
  },
});
