import React from "react";
import FormControl from "components/FormControl";
import readme from "components/FormControl/FormControl.mdx";

export const controls = [
  {
    type: "string",
    label: "Label",
    propertyName: "label",
    defaultValue: "Label",
  },
  {
    type: "string",
    label: "Helper",
    propertyName: "helper",
    defaultValue: "Note",
  },
  {
    type: "string",
    label: "Error",
    propertyName: "error",
    defaultValue: "Error message",
  },
  {
    type: "string",
    label: "Success",
    propertyName: "success",
    defaultValue: "Success",
  },
  {
    type: "string",
    label: "Id",
    propertyName: "id",
  },
  {
    type: "boolean",
    label: "Group",
    propertyName: "group",
  },
];

export default {
  name: "Components/Utilities/Form control",
  readme,
  keywords: ["form", "control", "state", "input", "field"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["FormControl"],
    },
  },
  playground: {
    template: (props: any) => (
      <FormControl {...props}>
        {(attrs) => (
          <input
            {...attrs}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        )}
      </FormControl>
    ),
    controls,
  },
  examples: {
    helper: {
      template: () => (
        <FormControl label="Field label" helper="Field note">
          {(attrs) => (
            <input
              {...attrs}
              style={{ width: "100%", boxSizing: "border-box" }}
            />
          )}
        </FormControl>
      ),
    },
    error: {
      template: () => (
        <FormControl label="Field label" error="Error">
          {(attrs) => (
            <input
              {...attrs}
              style={{ width: "100%", boxSizing: "border-box" }}
            />
          )}
        </FormControl>
      ),
    },
    success: {
      template: () => (
        <FormControl label="Field label" success="Success">
          {(attrs) => (
            <input
              {...attrs}
              style={{ width: "100%", boxSizing: "border-box" }}
            />
          )}
        </FormControl>
      ),
    },
    disabled: {
      template: () => (
        <FormControl label="Field label" disabled>
          {(attrs) => (
            <input
              {...attrs}
              style={{ width: "100%", boxSizing: "border-box" }}
            />
          )}
        </FormControl>
      ),
    },
    other: {
      template: () => (
        <FormControl
          label="Field label"
          subLabel="(optional)"
          required
          labelEndSlot="22/24"
          helper="Field note"
        >
          {(attrs) => (
            <input
              {...attrs}
              style={{ width: "100%", boxSizing: "border-box" }}
            />
          )}
        </FormControl>
      ),
    },
  },
};
