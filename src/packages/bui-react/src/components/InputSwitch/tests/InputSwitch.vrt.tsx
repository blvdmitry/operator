import React from "react";
import env from "@bookingcom/bui-env-react";
import InputSwitch from "components/InputSwitch";
import Text from "components/Text";

env.test.vrt({
  defaultUnchecked: (
    <InputSwitch
      defaultValue={false}
      label="Receive notifications"
      name="switch"
    />
  ),
  defaultChecked: (
    <InputSwitch defaultValue label="Receive notifications" name="switch" />
  ),
  reversedUnchecked: (
    <InputSwitch
      defaultValue={false}
      reversed
      label="Receive notifications"
      name="switch"
    />
  ),
  reversedChecked: (
    <InputSwitch
      defaultValue
      reversed
      label="Receive notifications"
      name="switch"
    />
  ),
  disabledUnchecked: (
    <InputSwitch
      disabled
      value={false}
      label="Receive notifications"
      name="switch"
    />
  ),
  disabledChecked: (
    <InputSwitch disabled value label="Receive notifications" name="switch" />
  ),
  customLabel: (
    <InputSwitch
      name="switch"
      defaultValue
      label={<Text variant="strong_2">Custom Label</Text>}
    />
  ),
});
