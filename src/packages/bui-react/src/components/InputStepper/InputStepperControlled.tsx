import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import MinusIcon from "@bookingcom/bui-assets-react/streamline/MinusIcon";
import PlusIcon from "@bookingcom/bui-assets-react/streamline/PlusIcon";
import Button from "components/Button";
import Text from "components/Text";
import useId from "hooks/useId";
import type * as T from "./InputStepper.types";
import styles from "@bookingcom/bui-core/css/InputStepper.module.css";

const InputStepperControlled = (props: T.ControlledProps) => {
  const {
    id,
    value,
    name,
    size = "medium",
    label,
    helper,
    min,
    max,
    step = 1,
    disabled,
    onChange,
    className,
    attributes,
    mixin,
  } = props;
  const rootClassName = classNames(
    styles.root,
    className,
    mixinClassNames(mixin)
  );
  const rootAttributes = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };

  const stepperId = useId(id);

  const getValue = (value: number | null) => {
    if (value === null) return min || 0;
    const withMin = min ? Math.max(value, min) : value;
    return max ? Math.min(withMin, max) : withMin;
  };

  const change = React.useCallback(
    (value: number) => {
      if (value < min || value > max) return;
      if (onChange) onChange({ name, value });
    },
    [min, max, name, onChange]
  );

  const handleSubtract = () => value !== null && change(value - step);
  const handleAdd = () => value !== null && change(value + step);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    change(+e.target.value);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-") handleSubtract();
    if (e.key === "+") handleAdd();
  };

  React.useEffect(() => {
    if (value === null) {
      change(min);
      return;
    }

    if (min > value) change(min);
  }, [min, value]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!value) return;
    if (max < value) change(max);
  }, [max, value]); // eslint-disable-line react-hooks/exhaustive-deps

  const normalizedValue = getValue(value);

  /* remove title and subtitle in the following block once deprecated */
  return (
    <div {...rootAttributes} className={rootClassName}>
      <input
        type="range"
        className={styles.input}
        id={stepperId}
        min={min}
        max={max}
        step={step}
        value={normalizedValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={normalizedValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      {label && (
        <div className={styles["label-wrapper"]}>
          <label className={styles.label} htmlFor={stepperId}>
            {label}
          </label>
          {helper && (
            <Text
              variant="small_1"
              color="neutral_alt"
              className={styles["helper-text"]}
            >
              {helper}
            </Text>
          )}
        </div>
      )}

      <div className={styles.wrapper}>
        <Button
          icon={MinusIcon}
          variant="tertiary"
          size={size}
          disabled={disabled || normalizedValue <= min}
          className={styles.subtract}
          attributes={{ tabIndex: -1, "aria-hidden": "true" }}
          onClick={handleSubtract}
        />

        <span className={styles.value} aria-hidden="true">
          {normalizedValue}
        </span>

        <Button
          icon={PlusIcon}
          variant="tertiary"
          size={size}
          disabled={disabled || normalizedValue >= max}
          className={styles.add}
          attributes={{ tabIndex: -1, "aria-hidden": "true" }}
          onClick={handleAdd}
        />
      </div>
    </div>
  );
};

export default InputStepperControlled;
