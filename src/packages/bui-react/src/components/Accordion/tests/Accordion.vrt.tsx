import React from "react";
import env from "@bookingcom/bui-env-react";
import Accordion from "components/Accordion";
import Card from "components/Card";
import Stack from "components/Stack";
import Divider from "components/Divider";
import InputText from "components/InputText";
import Container from "components/Container";
import Placeholder from "components/Placeholder";

env.test.vrt({
  default: {
    component: (
      <Container>
        <Accordion titleContent={<Placeholder />}>
          <InputText name="test" />
        </Accordion>
      </Container>
    ),
    interactive: async (client) => {
      const el = client.body.querySelector("button");
      const input = client.body.querySelector("input");

      el?.click();
      await client.wait(500);
      input?.focus();
      client.screenshot("opened");
    },
  },
  group: (
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
  static: <Accordion titleContent={<Placeholder />} />,
});
