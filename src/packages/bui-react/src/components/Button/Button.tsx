import React from "react";
import {
  classNames,
  responsiveClassNames,
} from "@bookingcom/bui-core/utilities/classNames";
import { mapResponsiveProps } from "@bookingcom/bui-core/utilities/responsive";
import Icon from "components/Icon";
import type { Size as IconSize } from "components/Icon/Icon.types";
import Actionable from "components/Actionable";
import Spinner, { type SpinnerProps } from "components/Spinner";
import type { Size as SpinnerSize } from "components/Spinner/Spinner.types";
import type * as T from "./Button.types";
import styles from "@bookingcom/bui-core/css/Button.module.css";

const getStylesVariant = (variant: NonNullable<T.Props["variant"]>): string => {
  return ["light", "tertiary-neutral", "tertiary-inherit"].includes(variant)
    ? "tertiary"
    : variant.split("-")[0];
};

const getStylesColor = (
  variant: NonNullable<T.Props["variant"]>,
  destructive: NonNullable<T.Props["destructive"]>
): string => {
  if (["primary", "secondary", "tertiary", "elevated"].includes(variant)) {
    return `${destructive ? "destructive" : "action"}`;
  }

  if (["secondary-neutral", "tertiary-neutral"].includes(variant)) {
    return "neutral";
  }
  if (["tertiary-inherit", "light"].includes(variant)) {
    return "inherit";
  }

  return "action";
};

const getSpinnerVariant = (
  buttonVariant: NonNullable<T.Props["variant"]>,
  destructive: boolean
): SpinnerProps["color"] => {
  if (buttonVariant === "light") return "white";

  if (buttonVariant === "secondary-neutral") {
    return "action";
  }

  const isFaded =
    buttonVariant &&
    ["secondary", "tertiary", "tertiary-neutral"].includes(buttonVariant);

  if (buttonVariant === "elevated" || isFaded) {
    return destructive ? "destructive" : "action";
  }

  return "inherit";
};

const ButtonBase = (props: T.Props, ref: T.Ref) => {
  const {
    text,
    type,
    variant = "primary",
    destructive = false,
    active,
    wide = false,
    loading,
    loadingAriaLabel,
    disabled,
    href,
    icon,
    iconPosition = "start",
    size = "medium",
    rounded,
    className,
    attributes,
    children,
    onClick,
    onFocus,
    onBlur,
    preventDefault,
    mixin,
  } = props;
  /* the variants defined according to the styles is not exactly the same as defined by the component
    the variants exposed are: primary, secondary, tertiary, light (for Header)
    these three variants further have multiple colors as a modifier to achieve the destructive, neutral variants
    colors available are: action, destructive, neutral (only available for tertiary & light, default for light variant)
  */
  const stylesVariant = getStylesVariant(variant);
  const stylesColor = getStylesColor(variant, destructive);

  const rootClassName = classNames(
    styles.root,
    styles[`root--variant-${stylesVariant}`],
    !text && icon && styles["root--icon-only"],
    responsiveClassNames(styles, "root--size", size),
    responsiveClassNames(styles, "root--wide", wide),
    loading && styles["root--loading"],
    active && styles["root--active"],
    rounded && styles["root--rounded"],
    !disabled && styles[`root--variant-${stylesVariant}-${stylesColor}`],
    className
  );

  const spinnerSize = () => {
    return mapResponsiveProps<T.Size, SpinnerSize>(size, {
      large: "medium",
      medium: "small",
    });
  };
  const spinnerVariant = getSpinnerVariant(variant, destructive);

  const renderIcon = (position: T.Props["iconPosition"]) => {
    if (!icon || iconPosition !== position) return null;

    const iconClassName = classNames(
      styles.icon,
      iconPosition && (!!text || !!children) && styles[`icon--${iconPosition}`]
    );

    const iconSize = () => {
      return mapResponsiveProps<T.Size, IconSize>(size, {
        large: "medium",
        medium: "small",
      });
    };

    return (
      <span className={iconClassName}>
        <Icon svg={icon} size={iconSize()} />
      </span>
    );
  };

  const handleFocus: T.Props["onFocus"] = (event) => {
    onFocus?.(event);
    (attributes?.onFocus as T.Props["onFocus"])?.(event);
  };

  const handleBlur: T.Props["onBlur"] = (event) => {
    onBlur?.(event);
    (attributes?.onBlur as T.Props["onBlur"])?.(event);
  };

  return (
    <Actionable
      ref={ref}
      className={rootClassName}
      onClick={!loading ? onClick : undefined}
      type={type}
      disabled={disabled}
      href={!disabled ? href : undefined}
      preventDefault={preventDefault}
      attributes={{
        ...attributes,
        onClick: !loading ? attributes?.onClick : undefined,
        onFocus: onFocus || attributes?.onFocus ? handleFocus : undefined,
        onBlur: onBlur || attributes?.onBlur ? handleBlur : undefined,
      }}
      mixin={mixin}
    >
      {loading && (
        <div className={styles.spinner}>
          <Spinner
            color={spinnerVariant}
            size={spinnerSize()}
            ariaLabel={loadingAriaLabel}
          />
        </div>
      )}
      {renderIcon("start")}
      {(text || children) && (
        <span className={styles.text}>{text || children}</span>
      )}
      {renderIcon("end")}
    </Actionable>
  );
};

const ButtonAligner = (props: T.AlignerProps) => {
  const { children, alignment, className } = props;
  let alignmentClassNames: string[] = [];

  if (typeof alignment === "string") {
    alignmentClassNames = [styles[`root--alignment-${alignment}`]];
  } else if (Array.isArray(alignment)) {
    alignmentClassNames = alignment.map(
      (position) => styles[`root--alignment-${position}`]
    );
  }
  const rootClassNames = classNames(
    styles.aligner,
    ...alignmentClassNames,
    className
  );

  return <div className={rootClassNames}>{children}</div>;
};

const Button = React.forwardRef(ButtonBase) as T.Compound;
Button.Aligner = ButtonAligner;

export default Button;
