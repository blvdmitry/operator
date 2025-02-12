import React from "react";
import env from "@bookingcom/bui-env-react";
import InputStepper from "components/InputStepper";

const fixtures = {
  name: "input-stepper-name",
  label: "InputStepper Label",
  helper: "InputStepper Caption",
  defaultValue: 7,
  min: 2,
  max: 11,
};

env.test.vrt({
  sizeMedium: {
    component: (
      <InputStepper
        name={fixtures.name}
        label={fixtures.label}
        helper={fixtures.helper}
        min={fixtures.min}
        max={fixtures.max}
        defaultValue={fixtures.defaultValue}
      />
    ),
    interactive: (client) => {
      const inputEl = client.body.querySelector("input");
      inputEl?.focus();
      client.screenshot("focused");
    },
  },
  sizeLarge: {
    component: (
      <InputStepper
        name={fixtures.name}
        label={fixtures.label}
        helper={fixtures.helper}
        size="large"
        min={fixtures.min}
        max={fixtures.max}
        defaultValue={fixtures.defaultValue}
      />
    ),
    interactive: (client) => {
      const inputEl = client.body.querySelector("input");
      inputEl?.focus();
      client.screenshot("focused");
    },
  },
  disabled: {
    component: (
      <InputStepper
        name={fixtures.name}
        label={fixtures.label}
        helper={fixtures.helper}
        min={fixtures.min}
        max={fixtures.max}
        defaultValue={fixtures.defaultValue}
        disabled
      />
    ),
  },
  atMin: {
    component: (
      <InputStepper
        name={fixtures.name}
        label={fixtures.label}
        helper={fixtures.helper}
        min={fixtures.min}
        max={fixtures.max}
        defaultValue={fixtures.min}
      />
    ),
  },
  atMax: {
    component: (
      <InputStepper
        name={fixtures.name}
        label={fixtures.label}
        helper={fixtures.helper}
        min={fixtures.min}
        max={fixtures.max}
        defaultValue={fixtures.max}
      />
    ),
  },
});
