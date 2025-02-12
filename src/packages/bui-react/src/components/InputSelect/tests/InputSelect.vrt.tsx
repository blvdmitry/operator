import React from "react";
import env from "@bookingcom/bui-env-react";
import InputSelect from "components/InputSelect";
import AccountUserIcon from "@bookingcom/bui-assets-react/streamline/AccountUserIcon";
import Stack from "components/Stack";

const fixtures = {
  options: [
    {
      text: "1 child",
      value: "1",
    },
    {
      text: "2 children",
      value: "2",
    },
    {
      text: "3 children",
      value: "3",
    },
    {
      text: "4 children",
      value: "4",
    },
    {
      text: "5 children",
      value: "5",
    },
  ],
};

env.test.vrt({
  default: (
    <InputSelect
      label="Children"
      id="children"
      name="children"
      placeholder="Select"
      options={fixtures.options}
    />
  ),
  error: (
    <InputSelect
      label="Children"
      name="children"
      placeholder="Select"
      options={fixtures.options}
      error="This is a required field"
    />
  ),
  success: (
    <InputSelect
      label="Children"
      name="children"
      placeholder="Select"
      options={fixtures.options}
      success="Confirmed"
    />
  ),
  large: (
    <InputSelect
      label="Children"
      name="children"
      placeholder="Select"
      options={fixtures.options}
      size="large"
    />
  ),
  disabled: (
    <InputSelect
      disabled
      label="Children"
      name="children"
      placeholder="Select"
      options={fixtures.options}
    />
  ),
  startContent: {
    component: (
      <Stack direction="column">
        <InputSelect
          hideValue
          name="children"
          placeholder="Select"
          startAvatar={{
            countryCode: "nl",
          }}
          options={fixtures.options}
        />
        <InputSelect
          hideValue
          name="children"
          placeholder="Select"
          startImage={{
            src: "/img.png",
          }}
          options={fixtures.options}
        />
        <InputSelect
          hideValue
          name="children"
          placeholder="Select"
          startIcon={AccountUserIcon}
          options={fixtures.options}
        />
      </Stack>
    ),
    imageMocks: true,
  },
});
