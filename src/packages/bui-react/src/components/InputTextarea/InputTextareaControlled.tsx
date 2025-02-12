import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { calculateTextareaHeight } from "@bookingcom/bui-core/utilities/input";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import FormControl from "components/FormControl";
import type * as T from "./InputTextarea.types";
import styles from "@bookingcom/bui-core/css/InputTextarea.module.css";

const InputTextareaControlled = (props: T.ControlledProps) => {
  const {
    id,
    onChange,
    name,
    label,
    subLabel,
    disabled,
    placeholder,
    size = "medium",
    rows,
    required,
    maximumLength,
    showLengthCounter,
    inputAttributes,
    onFocus,
    onBlur,
    error,
    success,
    helper,
    className,
    attributes,
    minVisibleLines = 2,
    maxVisibleLines,
    mixin,
  } = props;
  const value = props.value || "";
  const rootClassName = classNames(
    styles.root,
    className,
    !!error && styles["root--status-error"],
    size && styles[`root--size-${size}`]
  );
  const valueLength = value?.length || 0;
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!onChange) return;
    onChange({ name, value: event.target.value, event });
  };

  useIsomorphicLayoutEffect(() => {
    if (!textareaRef.current) return;

    if (maxVisibleLines) {
      const { height, minHeight } = calculateTextareaHeight(
        textareaRef.current,
        minVisibleLines,
        maxVisibleLines
      );

      textareaRef.current.style.minHeight = minHeight || "";
      textareaRef.current.style.height = height;
    } else {
      // Prioritize "rows" attribute for non-resizable textareas
      const minRows = Number(inputAttributes?.rows) || minVisibleLines;
      textareaRef.current.style.minHeight =
        calculateTextareaHeight(textareaRef.current, minRows).minHeight || "";
    }
  }, [
    value,
    textareaRef,
    minVisibleLines,
    maxVisibleLines,
    inputAttributes?.rows,
  ]);

  return (
    <FormControl
      id={id}
      attributes={attributes}
      className={rootClassName}
      label={label}
      subLabel={subLabel}
      error={error}
      success={success}
      helper={helper}
      disabled={disabled}
      required={required}
      labelEndSlot={
        !!maximumLength &&
        showLengthCounter &&
        `${valueLength} / ${maximumLength}`
      }
      mixin={mixin}
    >
      {(attributes) => (
        <div className={styles.wrapper}>
          <textarea
            ref={textareaRef}
            onFocus={onFocus}
            onBlur={onBlur}
            {...inputAttributes}
            {...attributes}
            rows={rows}
            disabled={disabled}
            name={name}
            className={styles.field}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            maxLength={maximumLength}
          />
          <div className={styles.decorator} />
        </div>
      )}
    </FormControl>
  );
};

export default InputTextareaControlled;
