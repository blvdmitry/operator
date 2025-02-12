import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import WarningIcon from "@bookingcom/bui-assets-react/streamline/WarningIcon";
import CheckmarkSelectedIcon from "@bookingcom/bui-assets-react/streamline/CheckmarkSelectedIcon";
import CloseIcon from "@bookingcom/bui-assets-react/streamline/CloseIcon";
import FormControl, { type FormControlProps } from "components/FormControl";
import Button from "components/Button";
import Icon from "components/Icon";
import type * as T from "./InputText.types";
import styles from "@bookingcom/bui-core/css/InputText.module.css";

const InputTextControlled = (props: T.ControlledProps) => {
  const {
    id,
    onChange,
    name,
    value,
    label,
    subLabel,
    disabled,
    type,
    placeholder,
    prefix,
    suffix,
    className,
    inputClassName,
    decoratorClassName,
    attributes,
    onFocus,
    onBlur,
    inputAttributes,
    prefixAttributes,
    suffixAttributes,
    startSlot,
    error,
    success,
    helper,
    size = "medium",
    maximumLength,
    showLengthCounter,
    clearButtonVisibility = "never",
    clearButtonAttributes,
    required,
    bordered = true,
    mixin,
  } = props;
  let { endSlot } = props;
  const containerRef = React.createRef<HTMLDivElement>();
  const internalInputRef = React.createRef<HTMLInputElement>();
  const inputRef =
    (inputAttributes?.ref as React.RefObject<HTMLInputElement>) ||
    internalInputRef;
  const [isFocused, setFocused] = React.useState(false);
  const valueLength = value?.length || 0;
  const isClearButtonRendered =
    (clearButtonVisibility === "always" ||
      (clearButtonVisibility === "on-edit" && isFocused)) &&
    valueLength > 0;

  let validationIcon: T.Props["endSlot"] = null;
  if (!disabled && !isFocused && success) {
    validationIcon = (
      <Icon svg={CheckmarkSelectedIcon} color="constructive" size="medium" />
    );
  }
  if (!disabled && !isFocused && error) {
    validationIcon = (
      <Icon svg={WarningIcon} color="destructive" size="medium" />
    );
  }

  const handleClearButtonClick = () => {
    if (inputRef.current) {
      if (onChange) {
        onChange({ name, value: "" });
      }
      inputRef.current.focus();
    }
  };

  const handleClearButtonBlur = () => {
    requestAnimationFrame(() => {
      if (
        containerRef.current &&
        !containerRef.current.contains(document.activeElement)
      ) {
        setFocused(false);
      }
    });
  };

  if (isClearButtonRendered) {
    validationIcon = null;
    endSlot = (
      <Button.Aligner alignment="end">
        <Button
          variant="tertiary-neutral"
          size={size}
          onClick={handleClearButtonClick}
          onBlur={handleClearButtonBlur}
          icon={CloseIcon}
          attributes={clearButtonAttributes}
        />
      </Button.Aligner>
    );
  }

  const rootClassName = classNames(
    className,
    styles.root,
    !!error && !isFocused && styles["root--status-error"],
    !error && !!success && !isFocused && styles["root--status-success"],
    size && styles[`root--size-${size}`],
    disabled && styles["root--disabled"],
    !bordered && styles["root--borderless"]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ name, value: event.target.value, event });
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);

    if (clearButtonVisibility === "never") {
      setFocused(false);
      return;
    }

    // Don't change the focused state in case we're focused on the clear button or any other actionable element
    // We keep this operation async to give the browser time to focus on the button before we unmount it
    requestAnimationFrame(() => {
      if (
        containerRef.current &&
        !containerRef.current.contains(document.activeElement)
      ) {
        setFocused(false);
      }
    });
  };

  const renderField = (
    controlAttributes: Parameters<FormControlProps["children"]>[0]
  ) => {
    const inputClassNames = classNames(styles.control, inputClassName);
    const decoratorClassNames = classNames(
      styles.decorator,
      decoratorClassName
    );

    return (
      <div ref={containerRef} className={styles.field}>
        {startSlot && (
          <div className={classNames(styles.side, styles["side--start"])}>
            {startSlot}
          </div>
        )}

        <input
          ref={inputRef}
          disabled={disabled}
          type={type}
          name={name}
          className={inputClassNames}
          placeholder={placeholder}
          value={value === null ? "" : value}
          maxLength={maximumLength}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...inputAttributes}
          {...controlAttributes}
        />
        <div className={decoratorClassNames} />

        {validationIcon && (
          <div className={classNames(styles.side, styles["side--end"])}>
            {validationIcon}
          </div>
        )}
        {endSlot && (
          <div className={classNames(styles.side, styles["side--end"])}>
            {endSlot}
          </div>
        )}
      </div>
    );
  };

  const renderGroup = (
    controlAttributes: Parameters<FormControlProps["children"]>[0]
  ) => {
    return (
      <>
        {prefix && (
          <div {...prefixAttributes} className={styles.addon}>
            {prefix}
          </div>
        )}
        {renderField(controlAttributes)}
        {suffix && (
          <div {...suffixAttributes} className={styles.addon}>
            {suffix}
          </div>
        )}
      </>
    );
  };

  return (
    <FormControl
      attributes={attributes}
      className={rootClassName}
      label={label}
      error={error}
      success={success}
      helper={helper}
      disabled={disabled}
      required={required}
      subLabel={subLabel}
      labelEndSlot={
        !!maximumLength &&
        showLengthCounter &&
        `${valueLength} / ${maximumLength}`
      }
      id={id}
      mixin={mixin}
      ref={attributes?.ref}
    >
      {(controlAttributes) => (
        <div className={styles.content}>
          {prefix || suffix
            ? renderGroup(controlAttributes)
            : renderField(controlAttributes)}
        </div>
      )}
    </FormControl>
  );
};

export default InputTextControlled;
