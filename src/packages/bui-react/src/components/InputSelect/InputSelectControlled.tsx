"use client";

import React from "react";
import { find } from "@bookingcom/bui-core/utilities/helpers";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import ArrowNavDownIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavDownIcon";
import WarningIcon from "@bookingcom/bui-assets-react/streamline/WarningIcon";
import CheckmarkSelectedIcon from "@bookingcom/bui-assets-react/streamline/CheckmarkSelectedIcon";
import FormControl from "components/FormControl";
import Icon from "components/Icon";
import Image from "components/Image";
import Avatar from "components/Avatar";
import type * as T from "./InputSelect.types";
import styles from "@bookingcom/bui-core/css/InputSelect.module.css";

const InputSelectStartContent = (
  props: Pick<T.Props, "startIcon" | "startImage" | "startAvatar">
) => {
  const { startIcon, startImage, startAvatar } = props;

  if (startIcon) {
    return (
      <Icon
        svg={startIcon}
        size="medium"
        className={classNames(styles["start-content"], styles["start-icon"])}
        color="neutral"
      />
    );
  }

  if (startImage) {
    return (
      <Image
        {...startImage}
        width={20}
        height={20}
        className={classNames(styles["start-content"], styles["start-image"])}
      />
    );
  }

  if (startAvatar) {
    return (
      <div
        className={classNames(
          styles["start-content"],
          styles["start-avatar-wrapper"]
        )}
      >
        <Avatar
          {...startAvatar}
          size="small"
          className={styles["start-avatar"]}
        />
      </div>
    );
  }

  return null;
};

const InputSelectStatusIcon = (
  props: Pick<T.Props, "disabled" | "success" | "error">
) => {
  const { disabled, success, error } = props;

  if (!disabled && success) {
    return (
      <Icon svg={CheckmarkSelectedIcon} color="constructive" size="medium" />
    );
  }

  if (!disabled && error) {
    return <Icon svg={WarningIcon} color="destructive" size="medium" />;
  }

  return null;
};

const InputSelectEndIcons = (
  props: Pick<T.Props, "disabled" | "error" | "success">
) => {
  const { disabled, error, success } = props;

  return (
    <span className={styles.endIconContainer}>
      <InputSelectStatusIcon
        disabled={disabled}
        error={error}
        success={success}
      />
      <Icon
        svg={ArrowNavDownIcon}
        className={styles.arrowIcon}
        size="medium"
        color="neutral"
      />
    </span>
  );
};

const InputSelectOption = (option: T.Option) => {
  return (
    <option
      value={option.value}
      key={option.key || option.value}
      data-key={option.key || option.value}
      disabled={option.disabled}
    >
      {option.text}
    </option>
  );
};

const InputSelectOptgroup = (optgroup: T.Optgroup, index: number) => {
  return (
    <optgroup key={index} label={optgroup.label} disabled={optgroup.disabled}>
      {optgroup.options.map(InputSelectOption)}
    </optgroup>
  );
};

const InputSelect = (props: T.Props) => {
  const {
    label,
    subLabel,
    options,
    optgroups,
    placeholder,
    disabled,
    id,
    name,
    value,
    defaultValue,
    success,
    error,
    helper,
    className,
    inputClassName,
    attributes,
    inputAttributes,
    size = "medium",
    startIcon,
    startImage,
    startAvatar,
    hideValue,
    required,
    bordered = true,
    onChange,
    onFocus,
    onBlur,
    onClick,
    children,
    mixin,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (onChange) onChange({ name, value, event });
  };

  const allOptions =
    options ||
    optgroups?.reduce((acc: T.Option[], group) => {
      acc.push(...group.options);

      return acc;
    }, []);

  const selectedOption = find(
    allOptions || [],
    (option: T.Option) => option.value === value
  );

  const isPlaceholderSelected =
    !selectedOption && !value && !children && placeholder;

  const wrapperClassNames = classNames(
    styles.wrapper,
    styles[`root--size-${size}`],
    (startIcon || startImage || startAvatar) &&
      styles["root--has-start-content"],
    !disabled && !!success && styles["root--status-success"],
    !disabled && !!error && styles["root--status-error"],
    disabled && styles["root--disabled"],
    isPlaceholderSelected && styles["root--placeholder"],
    !bordered && styles["root--borderless"],
    hideValue && styles["root--hide-value"]
  );
  const selectClassNames = classNames(styles.field, inputClassName);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    (
      inputAttributes as React.ButtonHTMLAttributes<HTMLButtonElement>
    )?.onClick?.(e);
  };

  return (
    <FormControl
      attributes={attributes}
      className={className}
      label={label}
      subLabel={subLabel}
      required={required}
      error={error}
      success={success}
      helper={helper}
      disabled={disabled}
      id={id}
      mixin={mixin}
    >
      {(controlAttributes) => (
        <div className={wrapperClassNames}>
          {options || optgroups ? (
            <>
              <InputSelectStartContent
                startIcon={startIcon}
                startImage={startImage}
                startAvatar={startAvatar}
              />
              <select
                className={selectClassNames}
                disabled={disabled}
                name={name}
                value={value ?? undefined}
                defaultValue={defaultValue}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                {...inputAttributes}
                {...controlAttributes}
              >
                {placeholder && <option value="">{placeholder}</option>}
                {options
                  ? options.map(InputSelectOption)
                  : optgroups.map(InputSelectOptgroup)}
              </select>
              <InputSelectEndIcons
                disabled={disabled}
                error={error}
                success={success}
              />
            </>
          ) : (
            <button
              {...inputAttributes}
              {...controlAttributes}
              type="button"
              className={selectClassNames}
              disabled={disabled}
              onClick={handleClick}
            >
              <InputSelectStartContent
                startIcon={startIcon}
                startImage={startImage}
                startAvatar={startAvatar}
              />
              {children || placeholder}
              <InputSelectEndIcons
                disabled={disabled}
                error={error}
                success={success}
              />
            </button>
          )}
        </div>
      )}
    </FormControl>
  );
};

export default InputSelect;
