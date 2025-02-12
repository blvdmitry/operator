import React from "react";
import env from "@bookingcom/bui-env-react";
import Alert from "components/Alert";
import Text from "components/Text";
import Stack from "components/Stack";
import Button from "components/Button";

env.test.vrt({
  successDefault: (
    <Alert
      title="Your booking is confirmed"
      text="We've sent your confirmation email to booker@booking.com"
      variant="success"
      actions={[
        {
          text: "Get Directions",
          onClick: () => {},
        },
      ]}
    />
  ),
  successInline: (
    <Alert text="Your booking is confirmed!" variant="success" inline />
  ),
  errorDefault: (
    <Alert
      title="Credit card expired"
      text="There was a problem with your credit card, update your payment details to secure your booking."
      variant="error"
      actions={[
        {
          text: "Update payment details",
          onClick: () => {},
        },
      ]}
    />
  ),
  errorInline: (
    <Alert
      text="There was a problem with your payment"
      variant="error"
      inline
    />
  ),
  composableAlert: (
    <Alert variant="success">
      <Stack alignItems="start">
        <Text>
          You can book now, or get a quote{" "}
          <Text tagName="span" variant="strong_2">
            FOR FREE
          </Text>{" "}
          anytime before 10:00 am on March 9, 2021.
        </Text>
        <Stack direction="row">
          <Button>Book now!</Button>
          <Button variant="secondary">Get a quote?</Button>
        </Stack>
      </Stack>
    </Alert>
  ),
  responsiveInline: {
    component: (
      <Alert
        title="Your booking is confirmed"
        text="There was a problem with your payment"
        variant="error"
        inline={{ s: true, m: false, l: true }}
      />
    ),
    viewports: ["small", "medium", "large"],
  },
});
