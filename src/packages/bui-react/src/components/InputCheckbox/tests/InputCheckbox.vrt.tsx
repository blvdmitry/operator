import React from "react";
import env from "@bookingcom/bui-env-react";
import InputCheckbox from "components/InputCheckbox";
import { PlaneTripIcon } from "@bookingcom/bui-assets-react/streamline";

env.test.vrt({
  default: <InputCheckbox label="Flexible rate" name="rate" />,
  error: <InputCheckbox label="Flexible rate" name="rate" error />,
  helper: (
    <InputCheckbox label="Flexible rate" name="rate" helper="Incl. taxes" />
  ),
  errorWithHelper: (
    <InputCheckbox
      label="Flexible rate"
      name="rate"
      helper="Incl. taxes"
      error
    />
  ),
  disabled: <InputCheckbox disabled label="Flexible rate" name="rate" />,
  indeterminate: (
    <InputCheckbox label="Flexible rate" name="rate" indeterminate />
  ),
  icon: (
    <InputCheckbox
      label="London Heathrow Airport"
      helper="22 km from city centre"
      name="airport"
      icon={PlaneTripIcon}
    />
  ),
  uncontrolledChecked: (
    <InputCheckbox label="Flexible rate" name="rate" defaultChecked />
  ),
  controlledChecked: (
    <InputCheckbox label="Flexible rate" name="rate" checked />
  ),
});
