import React from "react";
import Divider from "components/Divider";
import readme from "components/Divider/Divider.mdx";

export default {
  name: "Components/Elements/Divider",
  readme,
  keywords: ["separator", "line", "break", "horizontal", "vertical"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=4184%3A0",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Divider"],
    },
  },
  examples: {
    horizontal: {
      template: () => <Divider />,
    },
    vertical: {
      template: () => (
        <div style={{ height: 100 }}>
          <Divider vertical />
        </div>
      ),
    },
    responsive: {
      template: () => (
        <div style={{ height: 100 }}>
          <Divider vertical={{ s: true, m: false }} />
        </div>
      ),
    },
  },
};
