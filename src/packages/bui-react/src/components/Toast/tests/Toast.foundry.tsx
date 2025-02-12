import React from "react";
import Button from "components/Button";
import { ToastProvider, useToast, ToastProps } from "components/Toast";
import readme from "components/Toast/Toast.mdx";

export const controls = [
  {
    type: "object",
    label: "Toast properties",
    propertyName: "toast",
    required: true,
    controls: [
      {
        type: "string",
        label: "Text",
        propertyName: "text",
        required: true,
        defaultValue: "Toast text",
      },
      {
        type: "object",
        label: "Action",
        propertyName: "action",
        controls: [
          {
            type: "string",
            label: "Text",
            propertyName: "text",
            required: true,
            defaultValue: "Action",
          },
          {
            type: "string",
            label: "Href",
            propertyName: "href",
          },
        ],
      },
      {
        type: "enum",
        label: "Layout",
        propertyName: "layout",
        options: [
          { label: "Horizontal", value: "horizontal" },
          { label: "Vertical", value: "vertical" },
        ],
      },
    ],
  },
  {
    type: "enum",
    label: "Timeout Length",
    propertyName: "timeout",
    options: [
      { label: "Short", value: "short" },
      { label: "Long", value: "long" },
    ],
  },
];

const Playground = (props: { toast: ToastProps; timeout?: number }) => {
  const { show } = useToast();

  return (
    <Button
      text="Show toast"
      onClick={() => show(props.toast, props.timeout)}
    />
  );
};

const FunctionalToastButton = () => {
  const { show } = useToast();

  return (
    <Button
      text="Show toast"
      onClick={() => show({ text: "Property added to wishlist" })}
    />
  );
};

const VerticalToastButton = () => {
  const { show } = useToast();

  return (
    <Button
      text="Show toast"
      onClick={() =>
        show({
          text: "Property added to wishlist. As and when there are offers happening on this property, we will notify you!",
          layout: "vertical",
          action: {
            text: "Go to wishlist",
          },
        })
      }
    />
  );
};

export default {
  name: "Components/Patterns/Toast",
  readme,
  keywords: ["notification", "banner", "alert", "snackbar"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=167%3A1566",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["ToastProvider", "useToast", "Button"],
    },
  },
  playground: {
    template: (props: any) => (
      <ToastProvider>
        <Playground {...props} />
      </ToastProvider>
    ),
    controls,
  },
  examples: {
    default: {
      template: () => (
        <ToastProvider>
          <FunctionalToastButton />
        </ToastProvider>
      ),
    },
    verticalLayout: {
      template: () => (
        <ToastProvider>
          <VerticalToastButton />
        </ToastProvider>
      ),
    },
  },
};
