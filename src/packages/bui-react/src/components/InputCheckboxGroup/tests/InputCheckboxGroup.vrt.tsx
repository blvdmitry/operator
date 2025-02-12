import React from "react";
import env from "@bookingcom/bui-env-react";
import InputCheckboxGroup from "components/InputCheckboxGroup";
import InputCheckbox from "components/InputCheckbox";
import Stack from "components/Stack";

env.test.vrt({
  default: (
    <InputCheckboxGroup name="rate" label="Select rate">
      <Stack>
        <InputCheckbox label="Flexible rate" value="flexible" />
        <InputCheckbox label="Inflexible rate" value="inflexible" />
      </Stack>
    </InputCheckboxGroup>
  ),
  inline: (
    <InputCheckboxGroup name="rate" label="Select rate">
      <Stack direction="row">
        <InputCheckbox label="Flexible rate" value="flexible" />
        <InputCheckbox label="Inflexible rate" value="inflexible" />
      </Stack>
    </InputCheckboxGroup>
  ),
  error: (
    <InputCheckboxGroup name="rate" error="This is a required field">
      <Stack>
        <InputCheckbox label="Flexible rate" value="flexible" />
        <InputCheckbox label="Inflexible rate" value="inflexible" />
      </Stack>
    </InputCheckboxGroup>
  ),
  disabled: (
    <InputCheckboxGroup name="rate" disabled>
      <Stack>
        <InputCheckbox label="Flexible rate" value="flexible" />
        <InputCheckbox label="Inflexible rate" value="inflexible" />
      </Stack>
    </InputCheckboxGroup>
  ),
  selectedUncontrolled: (
    <InputCheckboxGroup name="rate" defaultValue={["flexible"]}>
      <Stack>
        <InputCheckbox
          label="Flexible rate"
          value="flexible"
          helper="Explanation here"
        />
        <InputCheckbox label="Inflexible rate" value="inflexible" />
      </Stack>
    </InputCheckboxGroup>
  ),
  selectedControlled: (
    <InputCheckboxGroup name="rate" value={["flexible"]}>
      <Stack>
        <InputCheckbox
          label="Flexible rate"
          value="flexible"
          helper="Explanation here"
        />
        <InputCheckbox label="Inflexible rate" value="inflexible" />
      </Stack>
    </InputCheckboxGroup>
  ),
});
