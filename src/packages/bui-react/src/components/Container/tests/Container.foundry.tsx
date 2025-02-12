import React from "react";
import Container from "components/Container";
import readme from "components/Container/Container.mdx";

export default {
  name: "Components/Utilities/Container",
  readme,
  keywords: ["wrapper", "parent", "children"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Container"],
    },
  },
  examples: {
    default: {
      template: () => <Container>Content</Container>,
    },
    centered: {
      template: () => <Container centered>Content</Container>,
    },
  },
};
