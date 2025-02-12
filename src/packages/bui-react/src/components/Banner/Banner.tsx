import React from "react";
import globalStyles from "@bookingcom/bui-core/css/BUIProvider.module.css";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Box, { type BoxProps } from "components/Box";
import AspectRatio from "components/AspectRatio";
import Text from "components/Text";
import Stack from "components/Stack";
import DismissibleContainer from "components/DismissibleContainer";
import Scrim from "components/Scrim";
import Button from "components/Button";
import Icon from "components/Icon";
import Image from "components/Image";
import useId from "hooks/useId";
import type * as T from "./Banner.types";
import styles from "@bookingcom/bui-core/css/Banner.module.css";

const colorMap: Record<
  "neutral" | "hint" | "callout",
  Pick<BoxProps, "borderColor" | "backgroundColor">
> = {
  neutral: {
    borderColor: "neutral_alt",
    backgroundColor: "elevation_one",
  },
  hint: {
    borderColor: "neutral",
    backgroundColor: "neutral_alt",
  },
  callout: {
    borderColor: "callout",
    backgroundColor: "callout_alt",
  },
};

const Banner = (props: T.Props) => {
  const {
    title,
    text,
    titleTagName = "h3",
    actions,
    startIcon,
    startIconColor,
    variant = "neutral",
    bleed,
    children,
    dismissible = true,
    onClose,
    closeAriaLabel,
    shown,
    startImage,
    topImage,
    className,
    attributes,
    mixin,
  } = props;
  const rootClassName = classNames(
    className,
    bleed && globalStyles["bui-u-bleed--small"]
  );
  const tagName = variant === "callout" ? "aside" : "section";
  const isMedia = topImage;
  const [shownState, setShown] = React.useState(true);
  const isControlled = typeof shown === "boolean";
  const shouldRender = isControlled ? shown : shownState;
  const colorSet = variant ? colorMap[variant] : colorMap.neutral;
  const titleId = useId();
  const boxAttributes: T.Props["attributes"] = {
    ...attributes,
    ...(title ? { "aria-labelledby": titleId } : {}),
  };

  if (!shouldRender) return null;

  const handleClose = () => {
    if (!isControlled) setShown(false);
    if (onClose) onClose();
  };

  const dismissibleProps = {
    closeAriaLabel,
    hideClose: !dismissible,
    onClose: handleClose,
    buttonColor: isMedia ? "inherit" : undefined,
  };

  const renderTopImage = (img: NonNullable<T.Props["topImage"]>) => {
    return (
      <AspectRatio ratio="16:9">
        <Image src={img.src} alt={img.alt} contentMode={img.contentMode} />
      </AspectRatio>
    );
  };

  const renderDismissibleTopImage = (img: NonNullable<T.Props["topImage"]>) => {
    return (
      <Scrim backgroundSlot={renderTopImage(img)} position="top">
        {/* @ts-ignore */}
        <DismissibleContainer {...dismissibleProps} />
      </Scrim>
    );
  };

  const renderStartImage = (img: NonNullable<T.Props["startImage"]>) => {
    return (
      <AspectRatio className={styles.imageContainer}>
        <Image
          borderRadius="100"
          src={img.src}
          alt={img.alt}
          contentMode={img.contentMode}
        />
      </AspectRatio>
    );
  };

  const renderStartIcon = (icon: NonNullable<T.Props["startIcon"]>) => {
    const iconClassNames = classNames(
      styles.icon,
      !title && !!text && styles["icon--no-title"]
    );

    return (
      <span className={iconClassNames}>
        <Icon svg={icon} size="medium" color={startIconColor} />
      </span>
    );
  };

  const renderTitleTextAndActions = () => {
    const titleSlot = title && (
      <Text
        variant="strong_1"
        key="title"
        attributes={{ id: titleId }}
        tagName={titleTagName}
        className={styles.title}
      >
        {title}
      </Text>
    );
    const textSlot = (text || children) && (
      <React.Fragment key="text">
        {text && (
          <Text tagName="p" className={styles.text}>
            {text}
          </Text>
        )}
        {children && <Text>{children}</Text>}
      </React.Fragment>
    );

    return (
      <Stack gap={2}>
        {isMedia
          ? [titleSlot, textSlot]
          : [
              // @ts-ignore
              <DismissibleContainer
                {...dismissibleProps}
                key="dismissible-container"
              >
                {titleSlot || textSlot}
              </DismissibleContainer>,
              titleSlot && textSlot,
            ]}

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

  const renderBannerContent = () => {
    const titleTextAndActions = renderTitleTextAndActions();

    const renderTopImageLayout = (img: NonNullable<T.Props["topImage"]>) => {
      return (
        <>
          {dismissible ? renderDismissibleTopImage(img) : renderTopImage(img)}
          <Box>{titleTextAndActions}</Box>
        </>
      );
    };

    const renderStartImageLayout = (args: {
      image?: T.Props["startImage"];
      icon?: T.Props["startIcon"];
    }) => {
      const { image, icon } = args;
      return (
        <Stack direction="row" gap={4}>
          {image ? renderStartImage(image) : undefined}
          {!image && icon ? renderStartIcon(icon) : undefined}
          <Stack.Item grow>{titleTextAndActions}</Stack.Item>
        </Stack>
      );
    };

    if (topImage) {
      return renderTopImageLayout(topImage);
    }

    if (startImage) {
      return renderStartImageLayout({ image: startImage });
    }

    if (startIcon) {
      return renderStartImageLayout({ icon: startIcon });
    }

    return titleTextAndActions;
  };

  return (
    <Box
      tagName={tagName}
      attributes={boxAttributes}
      className={rootClassName}
      borderColor={colorSet.borderColor}
      backgroundColor={colorSet.backgroundColor}
      borderRadius={200}
      overflow="hidden"
      padding={isMedia ? 0 : 4}
      mixin={mixin}
    >
      {renderBannerContent()}
    </Box>
  );
};

export default Banner;
