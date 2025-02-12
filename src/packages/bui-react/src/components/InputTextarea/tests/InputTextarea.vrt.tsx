import React from "react";
import env from "@bookingcom/bui-env-react";
import InputTextarea from "components/InputTextarea";

env.test.vrt({
  default: <InputTextarea label="Your review" name="review" />,
  error: (
    <InputTextarea
      label="Your review"
      name="review"
      error="This is a required field"
    />
  ),
  success: (
    <InputTextarea
      label="Your review"
      name="review"
      success="Your review looks great!"
    />
  ),
  disabled: <InputTextarea label="Your review" name="review" disabled />,
  required: <InputTextarea label="Your review" required name="review" />,
  helper: (
    <InputTextarea
      label="Your review"
      name="review"
      helper="Tell us what you like about your stay"
    />
  ),
  counter: (
    <InputTextarea
      maximumLength={100}
      showLengthCounter
      defaultValue="Hello"
      label="Your review"
      name="review"
    />
  ),
  sizeLarge: (
    <InputTextarea
      size="large"
      label="Your review"
      name="review"
      defaultValue="Hello"
    />
  ),
  autogrow: {
    component: (
      <InputTextarea
        label="Your review"
        name="review"
        defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vestibulum lacinia ipsum eget felis consectetur, ut imperdiet nisi posuere."
        minVisibleLines={1}
        maxVisibleLines={5}
      />
    ),
    viewports: ["small"],
  },
});
