import React from "react";
import env from "@bookingcom/bui-env-react";
import InputRadio from "components/InputRadio";
import { PlaneTripIcon } from "@bookingcom/bui-assets-react/streamline";

env.test.vrt({
  default: <InputRadio label="Flexible rate" name="rate" />,
  error: <InputRadio label="Flexible rate" name="rate" error />,
  helper: <InputRadio label="Flexible rate" name="rate" helper="Incl. taxes" />,
  errorWithSubLabel: (
    <InputRadio label="Flexible rate" name="rate" helper="Incl. taxes" error />
  ),
  disabled: <InputRadio disabled label="Flexible rate" name="rate" />,
  icon: (
    <InputRadio
      label="London Heathrow Airport"
      helper="22 km from city centre"
      name="airport"
      icon={PlaneTripIcon}
    />
  ),
  uncontrolledChecked: (
    <InputRadio label="Flexible rate" name="rate" defaultChecked />
  ),
  controlledChecked: <InputRadio label="Flexible rate" name="rate" checked />,
});
