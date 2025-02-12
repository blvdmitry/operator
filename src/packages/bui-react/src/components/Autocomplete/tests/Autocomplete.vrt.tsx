import React from "react";
import env from "@bookingcom/bui-env-react";
import Autocomplete from "components/Autocomplete";
import InputText from "components/InputText";

env.test.vrt({
  base: {
    component: (
      <Autocomplete value="Vacation">
        <Autocomplete.Trigger>
          {(attributes) => (
            <InputText
              label="Trip type"
              name="trip-type"
              value="Vacation"
              inputAttributes={attributes}
            />
          )}
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          {["Vacation", "Business trip", "Other"].map((value) => (
            <Autocomplete.Item key={value} value={value}>
              {value}
            </Autocomplete.Item>
          ))}
        </Autocomplete.Popover>
      </Autocomplete>
    ),
    capture: "viewport",
    skipInitialCapture: true,
    interactive: async (client) => {
      const inputEl = client.body.querySelector("input");

      inputEl?.click();

      await client.wait(200);

      client.screenshot("opened");
    },
  },
  positionRef: {
    component: (
      <Autocomplete value="Vacation">
        <Autocomplete.Trigger>
          {(attributes, ref) => (
            <InputText
              label="Trip type"
              name="trip-type"
              value="Vacation"
              attributes={{ ref }}
              inputAttributes={attributes}
            />
          )}
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          {["Vacation", "Business trip", "Other"].map((value) => (
            <Autocomplete.Item key={value} value={value}>
              {value}
            </Autocomplete.Item>
          ))}
        </Autocomplete.Popover>
      </Autocomplete>
    ),
    capture: "viewport",
    skipInitialCapture: true,
    interactive: async (client) => {
      const inputEl = client.body.querySelector("input");

      inputEl?.click();

      await client.wait(200);

      client.screenshot("opened");
    },
  },
});
