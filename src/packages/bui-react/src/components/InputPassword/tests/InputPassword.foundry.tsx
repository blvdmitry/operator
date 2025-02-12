import React from "react";
import Icon from "components/Icon";
import InputPassword, { InputPasswordProps } from "components/InputPassword";
import readme from "components/InputPassword/InputPassword.mdx";

export const controls = [
  {
    type: "string",
    label: "Label",
    propertyName: "label",
    defaultValue: "Password",
  },
  {
    type: "string",
    label: "Sub Label",
    propertyName: "subLabel",
  },
  {
    type: "string",
    label: "Value",
    propertyName: "value",
  },
  {
    type: "string",
    label: "Name",
    propertyName: "name",
    required: true,
    defaultValue: "field",
  },
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      {
        label: "Medium",
        value: "medium",
      },
      {
        label: "Large",
        value: "large",
      },
    ],
    defaultValue: "medium",
  },
  {
    type: "string",
    label: "Helper",
    propertyName: "helper",
  },
  {
    type: "string",
    label: "Success",
    propertyName: "success",
  },
  {
    type: "string",
    label: "Error",
    propertyName: "error",
  },
  {
    type: "string",
    label: "Placeholder",
    propertyName: "placeholder",
    defaultValue: "Your password here",
  },
  {
    type: "string",
    label: "Show password ARIA label",
    propertyName: "showPasswordAriaLabel",
    defaultValue: "Reveal password",
    required: true,
  },
  {
    type: "boolean",
    label: "Disabled",
    propertyName: "disabled",
  },
  {
    type: "boolean",
    label: "Required",
    propertyName: "required",
  },
];

export default {
  name: "Components/Elements/Input password",
  readme,
  keywords: ["input", "password", "secure", "text"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=10249%3A2149",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputPassword"],
    },
  },
  playground: {
    template: (
      props: InputPasswordProps & { startIcon?: React.ReactElement }
    ) => {
      const formattedProps = {
        ...props,
        startSlot: props.startIcon && (
          <Icon svg={props.startIcon} size={props.size} />
        ),
        startIcon: undefined,
      };
      return <InputPassword {...formattedProps} />;
    },
    controls,
    imports: {
      "@bookingcom/bui-react": {
        named: ["Icon"],
      },
    },
  },
  examples: {
    password: {
      template: () => (
        <InputPassword
          label="Password"
          name="password"
          placeholder="Type in your password"
          showPasswordAriaLabel="Disguise password"
        />
      ),
    },
    requiredHelper: {
      template: () => (
        <InputPassword
          required
          label="Password"
          name="password"
          helper="Only lowercase letters and digits"
          placeholder="Type in your password"
          showPasswordAriaLabel="Disguise password"
        />
      ),
    },
  },
};
