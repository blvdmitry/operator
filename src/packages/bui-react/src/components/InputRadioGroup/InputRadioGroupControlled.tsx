import React from "react";
import FormControl from "components/FormControl";
import type * as T from "./InputRadioGroup.types";
import Context from "./InputRadioGroup.context";

const InputRadioGroupControlled = (props: T.ControlledProps) => {
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
    const { event, value: fieldValue } = args;
    if (!fieldValue) return;

    onChange?.({ name, value: fieldValue, event });
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

export default InputRadioGroupControlled;
