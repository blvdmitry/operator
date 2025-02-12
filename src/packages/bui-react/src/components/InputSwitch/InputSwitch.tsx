import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import useId from "hooks/useId";
import Text from "components/Text";
import type * as T from "./InputSwitch.types";
import styles from "@bookingcom/bui-core/css/InputSwitch.module.css";

const InputSwitch = (props: T.Props) => {
  const {
    id,
    value,
    defaultValue,
    onChange,
    label,
    name,
    reversed,
    disabled,
    className,
    ariaLabel,
    attributes,
    inputAttributes,
    mixin,
  } = props;
  const switchId = useId(id);
  const rootClassNames = classNames(
    styles.root,
    className,
    reversed && styles["root--reversed"]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    onChange({ name, value: event.target.checked, event });
  };

  return (
    <Text attributes={attributes} className={rootClassNames} mixin={mixin}>
      <input
        {...inputAttributes}
        type="checkbox"
        name={name}
        checked={value ?? undefined}
        defaultChecked={defaultValue}
        id={switchId}
        disabled={disabled}
        className={styles.trigger}
        aria-label={ariaLabel}
        aria-checked={value ?? false}
        role="switch"
        onChange={handleChange}
      />

      <label htmlFor={switchId} className={styles.inner} aria-live="polite">
        <span className={styles.indicator} />
        {label && <span className={styles.label}>{label}</span>}
        <span className={styles.hitbox} />
      </label>
    </Text>
  );
};

export default InputSwitch;
