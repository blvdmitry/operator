import React from "react";
import FormControl from "components/FormControl";
import type * as T from "./InputCheckboxGroup.types";
import Context from "./InputCheckboxGroup.context";

const InputCheckboxGroupControlled = (props: T.ControlledProps) => {
  const {
    onChange,
    name,
    disabled,
    value,
    children,
    error,
    id,
    label,
    subLabel,
    required,
    className,
    attributes,
    mixin,
  } = props;

  const handleItemChange: T.Context["onItemChange"] = (args) => {
    const { event, value: fieldValue, checked } = args;
    if (!fieldValue) return;

    let nextValue = [...value];

    if (checked) {
      nextValue.push(fieldValue);
    } else {
      nextValue = nextValue.filter((v) => v !== fieldValue);
    }

    if (onChange) onChange({ name, value: nextValue, event });
  };

  return (
    <Context.Provider
      value={{ onItemChange: handleItemChange, disabled, value, name, error }}
    >
      <FormControl
        group
        id={id}
        label={label}
        subLabel={subLabel}
        required={required}
        className={className}
        error={error}
        disabled={disabled}
        attributes={attributes}
        mixin={mixin}
      >
        {() => children}
      </FormControl>
    </Context.Provider>
  );
};

export default InputCheckboxGroupControlled;
