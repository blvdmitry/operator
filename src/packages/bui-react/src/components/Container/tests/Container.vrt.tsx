import React from "react";
import env from "@bookingcom/bui-env-react";
import Container from "components/Container";

env.test.vrt({
  default: <Container className="content">Content</Container>,
  centered: (
    <Container className="content" centered>
      Content
    </Container>
  ),
});
