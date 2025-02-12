import React from "react";
import Autocomplete from "components/Autocomplete";
import InputText from "components/InputText";
import Stack from "components/Stack";
import SkeletonLoader from "components/SkeletonLoader";
import readme from "../Autocomplete.mdx";

const Demo = () => {
  const [value, setValue] = React.useState("");

  return (
    <Autocomplete
      value={value}
      onChange={(args) => {
        setValue(args.value);
      }}
    >
      <Stack gap={2}>
        <Autocomplete.Trigger>
          {(attributes) => {
            return (
              <InputText
                label="Trip type"
                name="trip-type"
                value={value}
                inputAttributes={attributes}
              />
            );
          }}
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          {["Vacation", "Business trip", "Other"].map((value) => (
            <Autocomplete.Item key={value} value={value}>
              {value}
            </Autocomplete.Item>
          ))}
        </Autocomplete.Popover>
      </Stack>
    </Autocomplete>
  );
};

const PositionRefDemo = () => {
  const [value, setValue] = React.useState("");

  return (
    <Autocomplete
      value={value}
      onChange={(args) => {
        setValue(args.value);
      }}
    >
      <Stack gap={2}>
        <Autocomplete.Trigger>
          {(attributes, ref) => {
            return (
              <InputText
                label="Trip type"
                name="trip-type"
                value={value}
                prefix="+31"
                attributes={{ ref }}
                inputAttributes={attributes}
              />
            );
          }}
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          {["Vacation", "Business trip", "Other"].map((value) => (
            <Autocomplete.Item key={value} value={value}>
              {value}
            </Autocomplete.Item>
          ))}
        </Autocomplete.Popover>
      </Stack>
    </Autocomplete>
  );
};

const AsyncDemo = () => {
  const [value, setValue] = React.useState("");
  const mock = ["Vacation", "Business trip", "Other"];
  const [items, setItems] = React.useState<string[]>([]);

  return (
    <Autocomplete
      value={value}
      onChange={(args) => {
        setValue(args.value);
        setTimeout(() => {
          setItems(mock);
        }, 1000);
      }}
    >
      <Stack gap={2}>
        <Autocomplete.Trigger>
          {(attributes) => (
            <InputText
              label="Trip type"
              name="trip-type"
              value={value}
              inputAttributes={attributes}
            />
          )}
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          {value &&
            (items.length ? (
              items.map((value) => (
                <Autocomplete.Item key={value} value={value}>
                  {value}
                </Autocomplete.Item>
              ))
            ) : (
              <Stack gap={3} mixin={{ padding: 2 }}>
                <SkeletonLoader variant="one-line" />
                <SkeletonLoader variant="one-line" />
                <SkeletonLoader variant="one-line" />
              </Stack>
            ))}
        </Autocomplete.Popover>
      </Stack>
    </Autocomplete>
  );
};

export default {
  name: "Components/Utilities/Autocomplete",
  readme,
  keywords: ["search", "autosuggest", "completion", "dropdown", "typeahead"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Autocomplete"],
    },
  },
  playground: {
    controls: [{ type: "boolean", propertyName: "foo" }],
    template: () => {
      return <Demo />;
    },
  },
  examples: {
    base: {
      template: () => <Demo />,
    },
    positionRef: {
      template: () => <PositionRefDemo />,
    },
    skeleton: {
      template: () => <AsyncDemo />,
    },
  },
};
