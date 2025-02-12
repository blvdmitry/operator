import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { debounce } from "@bookingcom/bui-core/utilities/helpers";
import Stack from "components/Stack";
import Text from "components/Text";
import Button, { type ButtonProps } from "components/Button";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import type * as T from "./CollapsedText.types";
import styles from "@bookingcom/bui-core/css/CollapsedText.module.css";

const CollapsedText = (props: T.Props) => {
  const {
    text,
    readMoreLabel,
    readLessLabel,
    variant = "body_2",
    visibleLines = 4,
    className,
    attributes,
    mixin,
  } = props;

  const rootClassName = classNames(className);
  const [textIsCollapsed, setTextIsCollapsed] = React.useState(true);
  const [textIsCollapsable, setTextIsCollapsable] = React.useState(true);
  const textEndRef = React.useRef<HTMLElement>(null);
  const resizerListenerIsSet = React.useRef(false);

  const textClassName = classNames(
    styles.text,
    textIsCollapsed ? styles["text--collapsed"] : null,
    !textIsCollapsable ? styles["text--non-collapsable"] : null
  );

  const buttonSize = {
    body_1: "large",
    body_2: "medium",
  }[variant] as Extract<ButtonProps["size"], "medium" | "large">;

  const rootStyle = textIsCollapsed
    ? { "--bui_collapsed_text_visible_lines": visibleLines }
    : {};

  const style = {
    ...rootStyle,
    ...((attributes?.style as React.CSSProperties) || {}),
  };

  const updateTextIsCollapsable = () => {
    if (!textEndRef.current?.offsetTop) return;

    const textEndOffsetTop = textEndRef.current.offsetTop;
    const lineHeight = parseFloat(
      window.getComputedStyle(textEndRef.current).lineHeight
    );
    const isCollapsableThreshold = lineHeight * visibleLines;

    setTextIsCollapsable(textEndOffsetTop > isCollapsableThreshold);
  };

  const onResizeHandler = debounce(updateTextIsCollapsable, 100);

  const setupWindowResize = () => {
    if (resizerListenerIsSet.current) return;

    window.addEventListener("resize", onResizeHandler, true);

    resizerListenerIsSet.current = true;
  };

  const removeWindowResize = () => {
    if (!resizerListenerIsSet.current) return;

    window.removeEventListener("resize", onResizeHandler);

    resizerListenerIsSet.current = false;
  };

  useIsomorphicLayoutEffect(() => {
    updateTextIsCollapsable();
    setupWindowResize();

    return removeWindowResize;
  }, [text, visibleLines, textIsCollapsed]);

  return (
    <Stack
      direction="column"
      alignItems="start"
      gap={0}
      className={rootClassName}
      attributes={{
        ...attributes,
        style,
      }}
      mixin={mixin}
    >
      <Text variant={variant} className={textClassName}>
        {text}
        <span ref={textEndRef} />
      </Text>
      {textIsCollapsable && (
        <Button.Aligner alignment="start">
          <Button
            size={buttonSize}
            text={textIsCollapsed ? readMoreLabel : readLessLabel}
            variant="tertiary"
            className={styles.button}
            onClick={() => setTextIsCollapsed(!textIsCollapsed)}
            attributes={{
              "aria-label": textIsCollapsed ? readLessLabel : readMoreLabel,
            }}
          />
        </Button.Aligner>
      )}
    </Stack>
  );
};

export default CollapsedText;
