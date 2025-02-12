import React from "react";
import env from "@bookingcom/bui-env-react";
import SegmentedControl from "components/SegmentedControl";

const options = [
  {
    text: "Stars",
    value: "stars",
  },
  {
    text: "Reviews",
    value: "reviews",
  },
];

env.test.vrt({
  default: {
    component: (
      <SegmentedControl
        name="sort"
        options={options}
        onChange={() => {}}
        value="reviews"
      />
    ),
    viewports: ["medium"],
  },
  fillEqually: {
    component: (
      <SegmentedControl
        name="sort"
        fillEqually
        options={options}
        onChange={() => {}}
        value="reviews"
      />
    ),
    viewports: ["medium"],
  },
  fillEquallyMultiline: {
    component: (
      <SegmentedControl
        name="sort"
        fillEqually
        options={[
          {
            text: "Stars",
            value: "stars",
          },
          {
            text: "Very long but fun to read reviews",
            value: "reviews",
          },
        ]}
        onChange={() => {}}
        value="reviews"
      />
    ),
    viewports: ["small"],
  },
});
