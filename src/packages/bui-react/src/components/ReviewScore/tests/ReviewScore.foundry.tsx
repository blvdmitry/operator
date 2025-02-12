import React from "react";
import ReviewScore from "components/ReviewScore";
import Stack from "components/Stack";
import type * as T from "../ReviewScore.types";
import readme from "../ReviewScore.mdx";

const fixtures = {
  score: "9.0",
  scoreAriaLabel: "Scored 9.0",
  rating: "Fabulous",
  reviewCount: "1,234 reviews",
  ratingReviewAriaLabel: "Rated fabulous from 1,234 reviews",
};

export const controls = [
  {
    type: "string",
    label: "Score",
    propertyName: "score",
    required: true,
    defaultValue: "10",
  },
  {
    type: "string",
    label: "Score aria label",
    propertyName: "scoreAriaLabel",
    required: true,
    defaultValue: "Scored 10",
  },
  {
    type: "string",
    label: "Review count",
    propertyName: "reviewCount",
    defaultValue: "100 reviews",
  },
  {
    type: "string",
    label: "Rating",
    propertyName: "rating",
    defaultValue: "Fabulous",
  },
  {
    type: "string",
    label: "Review aria label",
    propertyName: "ratingReviewAriaLabel",
    defaultValue: "Fabulous",
  },
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      { label: "Outline", value: "outline" },
      { label: "Text", value: "text" },
      { label: "Inverse", value: "inverse" },
    ],
  },
  {
    type: "boolean",
    label: "Inline",
    propertyName: "inline",
    defaultValue: false,
  },
  {
    type: "enum",
    label: "Alignment",
    propertyName: "alignment",
    options: [
      { label: "Start", value: "start" },
      { label: "End", value: "end" },
    ],
  },
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      { label: "Smaller", value: "smaller" },
      { label: "Small", value: "small" },
    ],
  },
];

export default {
  name: "Components/Patterns/Review score",
  readme,
  keywords: ["star", "feedback", "review", "score", "rating"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=4201%3A6977",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["ReviewScore"],
    },
  },
  playground: {
    template: (props: T.Props) => {
      const { variant } = props;

      if (variant === "inverse") {
        return (
          <div style={{ background: "#333", padding: 8 }}>
            <ReviewScore {...props} />
          </div>
        );
      }

      return <ReviewScore {...props} />;
    },
    controls,
  },
  examples: {
    variants: {
      template: () => (
        <Stack direction="column" gap={6}>
          <ReviewScore {...fixtures} />
          <ReviewScore {...fixtures} variant="outline" />
          <ReviewScore {...fixtures} variant="text" />
          <div style={{ background: "#333", padding: 8 }}>
            <ReviewScore {...fixtures} variant="inverse" />
          </div>
        </Stack>
      ),
    },
    alignment: {
      template: () => <ReviewScore {...fixtures} alignment="end" />,
    },
    simplified: {
      template: () => (
        <Stack direction="column" gap={6}>
          <ReviewScore {...fixtures} inline />
          <ReviewScore score="9.0" scoreAriaLabel="Scored 9.0" />
        </Stack>
      ),
    },
  },
};
