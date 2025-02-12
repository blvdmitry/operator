import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import useId from "hooks/useId";
import Text from "components/Text";
import FormControl from "components/FormControl";
import Icon from "components/Icon";
import Stack from "components/Stack";
import { useInputRadioGroup } from "components/InputRadioGroup";
import type * as T from "./InputRadio.types";
import styles from "@bookingcom/bui-core/css/InputRadio.module.css";

const InputRadio = (props: T.Props) => {
  const {
    label,
    helper,
    className,
    onChange,
    onFocus,
    onBlur,
    value,
    attributes,
    inputAttributes,
    error,
    icon,
    mixin,
  } = props;
  const id = useId(props.id);

  const radioGroup = useInputRadioGroup();
  const name = radioGroup?.name || props.name;
  const disabled = radioGroup?.disabled || props.disabled;
  const checked = radioGroup ? radioGroup.value === value : props.checked;
  const defaultChecked = radioGroup ? undefined : props.defaultChecked;
  const rootClassName = classNames(
    styles.root,
    className,
    (!!error || !!radioGroup?.error) && styles["root--error"]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (!name) {
      // eslint-disable-next-line no-console
      console.error("[BUI:InputRadio] Missing name property");
      return;
    }

    if (radioGroup?.onItemChange) {
      radioGroup.onItemChange({ name, value, checked, event });
    } else {
      onChange?.({ name, value, checked, event });
    }
  };

  return (
    <FormControl
      id={id}
      error={error}
      disabled={disabled}
      className={rootClassName}
      attributes={attributes}
      mixin={mixin}
    >
      {(controlAttributes) => (
        <>
          <input
            {...inputAttributes}
            {...controlAttributes}
            className={styles.input}
            type="radio"
            name={name}
            disabled={disabled}
            checked={checked === null ? false : checked}
            defaultChecked={defaultChecked}
            value={value}
            onFocus={onFocus || inputAttributes?.onFocus}
            onBlur={onBlur || inputAttributes?.onBlur}
            onChange={handleChange}
          />
          <Stack
            direction="row"
            tagName="label"
            className={styles.container}
            attributes={{ htmlFor: controlAttributes.id }}
          >
            <span className={styles.hitbox} />
            <span className={styles.field} />

            {icon && (
              <span className={styles.icon}>
                <Icon svg={icon} size="small" />
              </span>
            )}

            {(label || helper) && (
              <Stack.Item tagName="span" grow className={styles.content}>
                {label && (
                  <Text
                    color={disabled ? "disabled" : "neutral"}
                    className={styles.label}
                  >
                    {label}
                  </Text>
                )}

                {helper && (
                  <Text
                    variant="small_1"
                    color={disabled ? "disabled" : "neutral_alt"}
                    className={styles.helper}
                  >
                    {helper}
                  </Text>
                )}
              </Stack.Item>
            )}
          </Stack>
        </>
      )}
    </FormControl>
  );
};

export default InputRadio;
