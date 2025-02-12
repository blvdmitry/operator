import React from "react";
import { nextFrame } from "@bookingcom/bui-core/utilities/helpers";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import ArrowNavDownIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavDownIcon";
import useId from "hooks/useId";
import Icon from "components/Icon";
import type * as T from "./Accordion.types";
import usePrevious from "hooks/usePrevious";
import styles from "@bookingcom/bui-core/css/Accordion.module.css";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";

const AccordionControlled = (props: T.Props) => {
  const {
    active = false,
    titleContent,
    children,
    id: passedId,
    className,
    attributes,
    onOpen,
    onClose,
    mixin,
  } = props;
  const rootClassNames = classNames(
    active && styles["root--active"],
    !children && styles["root--static"],
    mixinClassNames(mixin),
    className
  );
  const [collapserStyleHeight, setCollapserStyleHeight] = React.useState<
    "auto" | `${number}px` | ""
  >(active ? "auto" : "");
  const [animationState, setAnimationState] = React.useState<
    "closed" | "pre-opening" | "opening" | "pre-closing" | "closing" | "opened"
  >(active ? "opened" : "closed");
  const previousActive = usePrevious<boolean>(active);
  const collapserRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const id = useId(passedId);
  const labelId = children ? `${id}-label` : undefined;

  const handleClick = () => {
    if (!children) return;
    if (active && onClose) onClose();
    if (!active && onOpen) onOpen();
  };

  const onTransitionEnd = () => {
    setAnimationState(active ? "opened" : "closed");
  };

  useIsomorphicLayoutEffect(() => {
    if (active === previousActive) return;

    setAnimationState(active ? "pre-opening" : "pre-closing");
  }, [active, previousActive]);

  useIsomorphicLayoutEffect(() => {
    const contentEl = contentRef.current;

    if (!contentEl) return;

    nextFrame(() => {
      if (animationState === "pre-opening") {
        // We don't relay on opening state anywhere,
        // it's here for overall alingment with other states of animations
        setAnimationState("opening");
        setCollapserStyleHeight(
          `${contentEl.getBoundingClientRect().height}px`
        );
      } else if (animationState === "pre-closing") {
        setAnimationState("closing");
        setCollapserStyleHeight(
          `${contentEl.getBoundingClientRect().height}px`
        );
      } else if (animationState === "closing") {
        setCollapserStyleHeight("");
      }
    });
  }, [animationState]);

  return (
    <div className={rootClassNames} style={mixinStyles(mixin)}>
      <button
        {...attributes}
        className={styles.button}
        onClick={handleClick}
        type="button"
        aria-expanded={active}
      >
        <span className={styles.label} id={labelId}>
          {titleContent}
        </span>
        <Icon
          svg={ArrowNavDownIcon}
          className={styles.icon}
          size="large"
          color="neutral_alt"
        />
      </button>

      {children && (
        <div
          ref={collapserRef}
          className={styles.collapser}
          style={{
            height: animationState === "opened" ? "auto" : collapserStyleHeight,
            overflow: animationState === "opened" ? "initial" : "hidden",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          <div
            ref={contentRef}
            aria-labelledby={labelId}
            className={styles.content}
            hidden={animationState === "closed"}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionControlled;
