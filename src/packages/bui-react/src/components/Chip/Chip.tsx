import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import CloseIcon from "@bookingcom/bui-assets-react/streamline/CloseIcon";
import { useInputCheckboxGroup } from "components/InputCheckboxGroup";
import { ArrowMenuIcon } from "@bookingcom/bui-assets-react/streamline";
import Icon from "components/Icon";
import HiddenVisually from "components/HiddenVisually";
import Text from "components/Text";
import Bubble from "components/Bubble";
import Actionable from "components/Actionable";
import type * as T from "./Chip.types";
import styles from "@bookingcom/bui-core/css/Chip.module.css";

const ToggleChip = (props: T.ToggleProps) => {
  const {
    label,
    icon,
    elevated,
    dismissible,
    onChange,
    onFocus,
    onBlur,
    className,
    attributes,
    value,
    wide = false,
    inputAttributes,
    mixin,
  } = props;
  const checkboxGroup = useInputCheckboxGroup();
  const name = checkboxGroup?.name || props.name!;
  const disabled = checkboxGroup?.disabled || props.disabled;
  const checked = checkboxGroup
    ? checkboxGroup.value?.includes(value!)
    : props.checked;
  const defaultChecked = checkboxGroup ? undefined : props.defaultChecked;

  const rootClassName = classNames(
    styles.root,
    className,
    ((dismissible ? true : checked) || defaultChecked) &&
      styles["root--selected"],
    elevated && styles["root--elevated"],
    disabled && styles["root--disabled"],
    wide && styles["root--wide"],
    mixinClassNames(mixin)
  );

  const rootAttributes = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (onChange) onChange({ name, checked, value, event });
  };

  return (
    <label className={rootClassName} {...rootAttributes}>
      <HiddenVisually>
        {({ className }) => (
          <input
            {...inputAttributes}
            className={classNames(className, styles.input)}
            name={name}
            checked={dismissible ? true : checked}
            defaultChecked={defaultChecked}
            value={value}
            type="checkbox"
            disabled={disabled}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
      </HiddenVisually>
      <span className={styles.wrapper}>
        {icon && <Icon svg={icon} className={styles.icon} />}
        <Text tagName="span" variant="emphasized_2">
          {label}
        </Text>
        {dismissible && <Icon svg={CloseIcon} className={styles.dismiss} />}
      </span>
    </label>
  );
};

const ActionChip = (props: T.ActionProps) => {
  const {
    label,
    icon,
    elevated,
    disabled,
    onFocus,
    onBlur,
    onClick,
    className,
    attributes,
    bubble,
    selected = false,
    wide = false,
    mixin,
  } = props;
  const rootClassName = classNames(
    styles.root,
    styles.action,
    className,
    elevated && styles["root--elevated"],
    disabled && styles["root--disabled"],
    selected && styles["root--selected"],
    wide && styles["root--wide"]
  );

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>
  ) => {
    onClick?.(e);
    attributes?.onClick?.(e);
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLButtonElement> & React.FocusEvent<HTMLAnchorElement>
  ) => {
    onFocus?.(e);
    attributes?.onFocus?.(e);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLButtonElement> & React.FocusEvent<HTMLAnchorElement>
  ) => {
    onBlur?.(e);
    attributes?.onBlur?.(e);
  };

  return (
    <Actionable
      type="button"
      className={rootClassName}
      attributes={{
        ...attributes,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onClick: handleClick,
      }}
      mixin={mixin}
    >
      {icon && <Icon svg={icon} className={styles.icon} />}
      <Text tagName="span" variant="emphasized_2">
        {label}
      </Text>
      {bubble?.text && !disabled && selected && (
        <Bubble
          text={bubble.text}
          className={styles.bubble}
          ariaLabel={bubble.ariaLabel}
          variant={selected ? "action" : "neutral"}
        />
      )}
      <Icon svg={ArrowMenuIcon} className={styles["arrow-icon"]} />
    </Actionable>
  );
};

const Chip = (props: T.Props) => {
  const variant = props.variant || "toggle";

  return variant === "action" ? (
    <ActionChip {...(props as T.ActionProps)} />
  ) : (
    <ToggleChip {...(props as T.ToggleProps)} />
  );
};

export default Chip;
