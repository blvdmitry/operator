import React from "react";
import { useInputCheckboxGroup } from "components/InputCheckboxGroup";
import InputCheckboxCardControlled from "./InputCheckboxCardControlled";
import InputCheckboxCardUncontrolled from "./InputCheckboxCardUncontrolled";
import type * as T from "./InputCheckboxCard.types";

const InputCheckboxCard = (props: T.Props) => {
  const { value } = props;
  const checkboxGroup = useInputCheckboxGroup();
  const resolvedProps = {
    ...props,
    name: checkboxGroup?.name || props.name,
    disabled: checkboxGroup?.disabled || props.disabled,
    checked:
      checkboxGroup && value
        ? checkboxGroup.value?.includes(value)
        : props.checked,
    defaultChecked: checkboxGroup ? undefined : props.defaultChecked,
    onChange: checkboxGroup?.onItemChange || props?.onChange,
  };

  if (resolvedProps.checked !== undefined) {
    return (
      <InputCheckboxCardControlled {...(resolvedProps as T.ControlledProps)} />
    );
  }

  return (
    <InputCheckboxCardUncontrolled
      {...(resolvedProps as T.UncontrolledProps)}
    />
  );
};

export default InputCheckboxCard;
