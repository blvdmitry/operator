import React from "react";
import InputRadio, { type InputRadioProps } from "components/InputRadio";
import InputCard from "components/_base/InputCard";
import type * as T from "./InputRadioCard.types";

const InputRadioCardControlled = (props: T.ControlledProps) => {
  const {
    id,
    name,
    value,
    error,
    disabled,
    checked,
    elevated,
    showInputElement,
    inputElementVerticalAlignment = "top",
    className,
    attributes,
    inputAttributes,
    children,
    additionalContent,
    onChange,
    mixin,
  } = props;

  const radioProps = {
    inputAttributes,
    name,
    value,
    disabled,
    checked,
    onChange,
  } as InputRadioProps;

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
      showInputElement={showInputElement}
      input={({ id, className }) => (
        <InputRadio {...radioProps} id={id} className={className} />
      )}
      mixin={mixin}
    >
      {children}
    </InputCard>
  );
};

export default InputRadioCardControlled;
