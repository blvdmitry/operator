import React from "react";
import Placeholder from "components/Placeholder";
import Card from "components/Card";
import Divider from "components/Divider";
import Stack from "components/Stack";
import Accordion, { AccordionProps } from "components/Accordion";
import readme from "components/Accordion/Accordion.mdx";

export const controls = [
  {
    type: "slot",
    label: "Title content",
    propertyName: "titleContent",
    defaultValue: "Open accordion",
  },
  {
    type: "slot",
    label: "Content",
    propertyName: "children",
    defaultValue: "Accordion content",
  },
  {
    type: "boolean",
    label: "Active",
    propertyName: "active",
  },
];

const AccordionGroup = () => {
  const [active, setActive] = React.useState("acc-1");

  const handleAccordionOpen = (key: string) => {
    setActive(key);
  };

  const handleAccordionClose = () => {
    setActive("");
  };

  return (
    <Card>
      <Stack gap={4}>
        <Accordion
          titleContent={<Placeholder />}
          onOpen={() => handleAccordionOpen("acc-1")}
          onClose={() => handleAccordionClose()}
          active={active === "acc-1"}
        >
          <Placeholder />
        </Accordion>
        <Divider />
        <Accordion
          titleContent={<Placeholder />}
          onOpen={() => handleAccordionOpen("acc-2")}
          onClose={() => handleAccordionClose()}
          active={active === "acc-2"}
        >
          <Placeholder />
        </Accordion>
      </Stack>
    </Card>
  );
};

export default {
  name: "Components/Containers/Accordion",
  readme,
  keywords: [
    "collapse",
    "expand",
    "panel",
    "section",
    "hidden",
    "expandable",
    "collapsible",
  ],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=367%3A145",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Accordion"],
    },
  },
  playground: {
    template: (props: AccordionProps) => <Accordion {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <Accordion titleContent={<Placeholder />}>
          <Placeholder />
        </Accordion>
      ),
    },
    multiple: {
      template: () => (
        <Card>
          <Stack gap={4}>
            <Accordion titleContent={<Placeholder />}>
              <Placeholder />
            </Accordion>
            <Divider />
            <Accordion titleContent={<Placeholder />}>
              <Placeholder />
            </Accordion>
          </Stack>
        </Card>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Card", "Divider", "Stack"],
        },
      },
    },
    controlled: {
      template: () => <AccordionGroup />,
      imports: {
        "@bookingcom/bui-react": {
          named: ["Card", "Divider", "Stack"],
        },
      },
    },
  },
};
