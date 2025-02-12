import React from "react";
import env from "@bookingcom/bui-env-react";
import InputRadioGroup from "components/InputRadioGroup";
import InputRadio from "components/InputRadio";
import Stack from "components/Stack";

env.test.vrt({
  default: (
    <InputRadioGroup name="rate" label="Select rate">
      <Stack>
        <InputRadio label="Flexible rate" value="flexible" />
        <InputRadio label="Inflexible rate" value="inflexible" />
      </Stack>
    </InputRadioGroup>
  ),
  inline: (
    <InputRadioGroup name="rate" label="Select rate">
      <Stack direction="row">
        <InputRadio label="Flexible rate" value="flexible" />
        <InputRadio label="Inflexible rate" value="inflexible" />
      </Stack>
    </InputRadioGroup>
  ),
  error: (
    <InputRadioGroup name="rate" error="This is a required field">
      <Stack>
        <InputRadio label="Flexible rate" value="flexible" />
        <InputRadio label="Inflexible rate" value="inflexible" />
      </Stack>
    </InputRadioGroup>
  ),
  disabled: (
    <InputRadioGroup disabled name="rate">
      <Stack>
        <InputRadio label="Flexible rate" value="flexible" />
        <InputRadio label="Inflexible rate" value="inflexible" />
      </Stack>
    </InputRadioGroup>
  ),
  withHelper: (
    <InputRadioGroup name="rate" defaultValue="flexible">
      <Stack>
        <InputRadio
          label="Flexible rate"
          value="flexible"
          helper="Explanation here"
        />
        <InputRadio label="Inflexible rate" value="inflexible" />
      </Stack>
    </InputRadioGroup>
  ),
  controlled: (
    <InputRadioGroup name="rate" defaultValue="flexible">
      <Stack>
        <InputRadio label="Flexible rate" value="flexible" />
        <InputRadio label="Inflexible rate" value="inflexible" />
      </Stack>
    </InputRadioGroup>
  ),
  uncontrolled: (
    <InputRadioGroup name="rate" value="flexible">
      <Stack>
        <InputRadio label="Flexible rate" value="flexible" />
        <InputRadio label="Inflexible rate" value="inflexible" />
      </Stack>
    </InputRadioGroup>
  ),
});
