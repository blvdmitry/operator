import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import DismissibleContainer from "components/DismissibleContainer";
import Stack from "components/Stack";
import Text from "components/Text";
import Flyout, { type FlyoutRefProps } from "components/_base/Flyout";
import type * as T from "./Popover.types";
import styles from "@bookingcom/bui-core/css/Popover.module.css";

const PopoverContext = React.createContext<{
  props: T.Props;
  ref: React.RefObject<FlyoutRefProps>;
}>({} as any);

const sizeMap = {
  small: "230px",
  medium: "360px",
  auto: "auto",
  stretch: "100%",
} as const;

const Popover = (props: T.Props) => {
  const {
    id,
    forcePosition,
    onOpen,
    onClose,
    lockClose,
    active,
    defaultActive,
    children,
    zIndex,
    fill,
    trapFocusMode,
    navigationMode,
    triggerType = "click",
    position = "bottom",
    disableAnimation,
    keepMounted,
    triggerRef,
    containerRef,
    positionRef,
    onAfterOpen,
    onAfterClose,
    overflow,
  } = props;
  const size =
    position === "bottom-stretch" ? "stretch" : props.size || "medium";
  const sizeValue = (sizeMap as Record<string, string>)[size] || size;
  const flyoutRef = React.useRef<FlyoutRefProps | null>(null);
  const contentClassName = classNames(
    styles.root,
    fill && styles["root--fill"],
    overflow && styles[`root--overflow-${overflow}`],
    position && styles[`root--position-${position}`]
  );
  const [localActive, setLocalActive] = React.useState(
    active === undefined ? !!defaultActive : !!active
  );

  React.useEffect(() => {
    if (active === undefined) return;

    setLocalActive(!!active);
  }, [active]);

  const handleOpen = () => {
    if (active === undefined) setLocalActive(true);

    if (onOpen) return onOpen();
  };

  const handleClose = () => {
    if (lockClose) return;

    if (active === undefined) setLocalActive(false);

    if (onClose) return onClose();
  };

  return (
    <PopoverContext.Provider value={{ props, ref: flyoutRef }}>
      {/* @ts-ignore */}
      <Flyout
        id={id}
        position={position}
        forcePosition={forcePosition}
        onOpen={handleOpen}
        onClose={handleClose}
        onAfterOpen={onAfterOpen}
        onAfterClose={onAfterClose}
        trapFocusMode={trapFocusMode}
        navigationMode={navigationMode}
        triggerType={triggerType}
        active={localActive}
        contentClassName={contentClassName}
        contentAttributes={{
          style: {
            "--bui-popover-width": sizeValue,
            "--bui-popover-min-width":
              position === "bottom-stretch" ? props.size : undefined,
          },
        }}
        zIndex={zIndex}
        disableAnimation={disableAnimation}
        keepMounted={keepMounted}
        triggerRef={triggerRef}
        containerRef={containerRef}
        positionRef={positionRef}
        ref={flyoutRef}
      >
        {children}
      </Flyout>
    </PopoverContext.Provider>
  );
};

const PopoverContent = (props: T.ContentProps) => {
  const { children, title, attributes } = props;
  const { props: rootProps, ref } = React.useContext(PopoverContext);
  const {
    hideArrow,
    lockClose,
    hideClose,
    closeAriaLabel,
    trapFocusMode,
    triggerType,
    fill,
  } = rootProps;

  const arrowClassName = classNames(
    styles.arrow,
    hideArrow && styles["arrow--hide"]
  );

  const handleClose = () => {
    if (lockClose) return;
    if (ref.current) ref.current.close();
  };

  const renderChildren = () => {
    const shouldHideClose =
      hideClose || triggerType === "hover" || trapFocusMode === "soft";
    const headingNode = title && (
      <Text className={styles.heading} variant="strong_1">
        {title}
      </Text>
    );
    const contentNode = headingNode ? (
      <Stack gap={2}>
        {headingNode}
        <Stack.Item>{children}</Stack.Item>
      </Stack>
    ) : (
      children
    );

    return hideClose ? (
      contentNode
    ) : (
      <DismissibleContainer
        closeAriaLabel={closeAriaLabel as string}
        hideClose={shouldHideClose}
        onClose={handleClose}
        fill={fill}
      >
        {contentNode}
      </DismissibleContainer>
    );
  };

  return (
    <Flyout.Content
      attributes={attributes}
      arrowSlot={
        <Flyout.Arrow
          offset={4}
          size={7}
          background="elevation_two"
          shadow={100}
          className={arrowClassName}
        />
      }
    >
      {renderChildren()}
    </Flyout.Content>
  );
};

PopoverContent.displayName = "Popover.Content";
Popover.Content = PopoverContent;
Popover.Trigger = Flyout.Trigger;
Popover.Trigger.displayName = "Popover.Trigger";
export default Popover;
