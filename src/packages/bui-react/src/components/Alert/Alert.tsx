import React from "react";
import globalStyles from "@bookingcom/bui-core/css/BUIProvider.module.css";
import {
  classNames,
  responsiveClassNames,
} from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import { mapResponsiveProps } from "@bookingcom/bui-core/utilities/responsive";
import CheckmarkSelectedIcon from "@bookingcom/bui-assets-react/streamline/CheckmarkSelectedIcon";
import WarningIcon from "@bookingcom/bui-assets-react/streamline/WarningIcon";
import Button from "components/Button";
import Stack from "components/Stack";
import Icon, { type IconProps } from "components/Icon";
import type { Size as IconSize } from "components/Icon/Icon.types";
import Text, { type TextProps } from "components/Text";
import type * as T from "./Alert.types";
import styles from "@bookingcom/bui-core/css/Alert.module.css";

const colorMap: Record<
  T.Props["variant"],
  {
    iconColor: IconProps["color"];
    textColor: TextProps["color"];
  }
> = {
  success: {
    textColor: "constructive",
    iconColor: "constructive",
  },
  error: {
    textColor: "destructive",
    iconColor: "destructive",
  },
};

const Alert = (props: T.Props) => {
  const {
    text,
    title,
    actions,
    variant,
    inline = false,
    className,
    attributes,
    bleed,
    children,
    titleTagName = "span",
    mixin,
  } = props;
  const rootClassNames = classNames(
    styles.root,
    variant && styles[`root--variant-${variant}`],
    responsiveClassNames(styles, "root--inline", inline),
    bleed && globalStyles["bui-u-bleed--small"],
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
  const rootGap = mapResponsiveProps<"true" | "false", 2 | 4>(inline, {
    true: 2,
    false: 4,
  });

  const renderIcon = () => {
    const colorSet = colorMap[variant];
    const iconSVG = {
      success: CheckmarkSelectedIcon,
      error: WarningIcon,
    }[variant];
    const iconSize = mapResponsiveProps<"true" | "false", IconSize>(inline, {
      true: "small",
      false: "medium",
    });

    const iconClassNames = classNames(
      styles.icon,
      !title && !!text && styles["icon--no-title"]
    );

    return (
      <span className={iconClassNames}>
        <Icon svg={iconSVG} size={iconSize} color={colorSet.iconColor} />
      </span>
    );
  };

  const renderContent = () => {
    return (
      <Stack gap={2}>
        {(title || text) && (
          <Stack.Item>
            {title && (
              <Text
                tagName={titleTagName}
                className={styles.title}
                variant="strong_1"
              >
                {title}
              </Text>
            )}
            {text && (
              <Text tagName="p" className={styles.text}>
                {text}
              </Text>
            )}
          </Stack.Item>
        )}
        {children && <Text color="neutral">{children}</Text>}
        {actions && (
          <Stack direction="row" gap={3}>
            {actions.map((action, index) => (
              <Button.Aligner
                alignment={["start", "bottom"]}
                key={action.text || index}
              >
                <Button {...action} variant="tertiary" />
              </Button.Aligner>
            ))}
          </Stack>
        )}
      </Stack>
    );
  };

  return (
    <div
      className={rootClassNames}
      role={variant === "error" ? "alert" : "status"}
      {...rootAttributes}
    >
      <Stack direction="row" gap={rootGap}>
        {renderIcon()}
        <Stack.Item grow>{renderContent()}</Stack.Item>
      </Stack>
    </div>
  );
};

export default Alert;
