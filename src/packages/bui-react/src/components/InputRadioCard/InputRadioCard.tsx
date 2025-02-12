import React from "react";
import { useInputRadioGroup } from "components/InputRadioGroup";
import InputRadioCardControlled from "./InputRadioCardControlled";
import InputRadioCardUncontrolled from "./InputRadioCardUncontrolled";
import type * as T from "./InputRadioCard.types";

const InputRadioCard = (props: T.Props) => {
  const { value } = props;
  const radioGroup = useInputRadioGroup();
  const resolvedProps = {
    ...props,
    name: radioGroup?.name || props.name,
    disabled: radioGroup?.disabled || props.disabled,
    checked:
      radioGroup?.value && value ? radioGroup.value === value : props.checked,
    defaultChecked: radioGroup ? undefined : props.defaultChecked,
    onChange: radioGroup?.onItemChange || props?.onChange,
  };

  if (resolvedProps.checked !== undefined) {
    return (
      <InputRadioCardControlled {...(resolvedProps as T.ControlledProps)} />
    );
  }

  return (
    <InputRadioCardUncontrolled {...(resolvedProps as T.UncontrolledProps)} />
  );
};

export default InputRadioCard;
