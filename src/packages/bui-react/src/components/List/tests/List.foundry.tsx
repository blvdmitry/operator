import React from "react";
import { CheckmarkSelectedIcon } from "@bookingcom/bui-assets-react/streamline";
import Link from "components/Link";
import List from "components/List";
import Text from "components/Text";
import Stack from "components/Stack";
import Icon from "components/Icon";
import Title from "components/Title";
import readme from "components/List/List.mdx";

export const controls = [
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    required: true,
    options: [
      { label: "Unordered", value: "unordered" },
      { label: "Ordered", value: "ordered" },
      { label: "Upper Alpha", value: "upper-alpha" },
      { label: "Text", value: "text" },
    ],
    defaultValue: "text",
  },
  {
    type: "enum",
    label: "Row spacing",
    propertyName: "rowSpacing",
    options: [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
      { label: "None", value: "none" },
    ],
    defaultValue: "medium",
  },
  {
    type: "boolean",
    label: "Divided",
    propertyName: "divided",
  },
  {
    type: "array",
    label: "Items",
    propertyName: "children",
    required: true,
    item: {
      type: "slot",
      propertyName: "item",
      defaultValue: "Item",
    },
    defaultValue: ["Item 1", "Item 2", "Item 3"],
  },
];

const contentWithIconsAndActions = [
  {
    title: "Attract more attention to your your rooms",
    subtitle: "2 rooms have less than four photos",
    sideContent: <Link text="Add room photos" href="/" />,
  },
  {
    title: "Add photos of your property to show guests how great it is",
    subtitle: "Only 10 property photos found",
    sideContent: <Link text="Add property photos" href="/" />,
  },
  {
    title: "Tell your guests about the great things in your area",
    subtitle: "No location information found",
    sideContent: <Link text="Add location information" href="/" />,
  },
  {
    title: "Tag photos so guests can easily search for what they need",
    sideContent: <Link text="Tag photos" href="/" />,
  },
  {
    title: "Inform guests about your restaurant facilities",
    sideContent: <Link text="Add facility information" href="/" />,
  },
];

export default {
  name: "Components/Utilities/List",
  readme,
  keywords: ["ordered", "bulleted", "numbered"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=374%3A0",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["List"],
    },
  },
  playground: {
    template: (props: any) => <List {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <List>
          <Text>Minimum stay match with rate</Text>
          <Text>10% of discount</Text>
          <Text>Flexible rate</Text>
          <Text>All Rooms</Text>
          <Text>From July 7 to July 20</Text>
        </List>
      ),
    },
    ordered: {
      template: () => (
        <List variant="ordered">
          <Text>Minimum stay match with rate</Text>
          <Text>10% of discount</Text>
          <Text>Flexible rate</Text>
          <Text>All Rooms</Text>
          <Text>From July 7 to July 20</Text>
        </List>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Text"],
        },
      },
    },
    divided: {
      template: () => (
        <List divided>
          <Link text="Minimum stay match with rate" href="/" />
          <Link text="10% of discount" href="/" />
          <Link text="Flexible rate" href="/" />
          <Link text="All rooms" href="/" />
          <Link text="From July 7 to July 20" href="/" />
        </List>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Link"],
        },
      },
    },
    dividedActionsAndIcons: {
      template: () => (
        <List divided>
          {contentWithIconsAndActions.map((item) => (
            <Stack key={item.title} direction="row" alignItems="center" gap={4}>
              <Icon
                svg={CheckmarkSelectedIcon}
                size="large"
                color="constructive"
              />
              <Stack.Item grow>
                <Title title={item.title} subtitle={item.subtitle} />
              </Stack.Item>
              {item.sideContent}
            </Stack>
          ))}
        </List>
      ),
    },
  },
};
