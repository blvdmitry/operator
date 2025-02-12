import React from "react";
import InputCheckbox from "components/InputCheckbox";
import InputCard from "components/_base/InputCard";
import type * as T from "./InputCheckboxCard.types";

const InputCheckboxCard = (props: T.ControlledProps) => {
  const {
    id,
    error,
    className,
    attributes,
    value,
    inputElementVerticalAlignment = "top",
    elevated,
    inputAttributes,
    additionalContent,
    children,
    onChange,
    disabled,
    checked,
    name,
    mixin,
  } = props;

  return (
    <InputCard
      id={id}
      elevated={elevated}
      className={className}
      attributes={attributes}
      inputElementVerticalAlignment={inputElementVerticalAlignment}
      additionalContent={additionalContent}
      disabled={disabled}
      checked={checked}
      error={error}
      input={({ id }) => (
        <InputCheckbox
          id={id}
          inputAttributes={inputAttributes}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          checked={checked}
        />
      )}
      mixin={mixin}
    >
      {children}
    </InputCard>
  );
};

export default InputCheckboxCard;
