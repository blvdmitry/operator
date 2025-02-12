import React from "react";
import {
  classNames,
  responsiveClassNames,
} from "@bookingcom/bui-core/utilities/classNames";
import DismissibleContainer from "components/DismissibleContainer";
import Overlay from "components/Overlay";
import Title from "components/Title";
import useId from "hooks/useId";
import type * as TOverlay from "components/Overlay/Overlay.types";
import type * as T from "./SheetContainer.types";
import styles from "@bookingcom/bui-core/css/SheetContainer.module.css";

const isSheetWithClose = (
  props: T.Props,
  headingContent: React.ReactNode
): props is Extract<T.Props, { hideClose?: false }> => {
  return !props.hideClose || !!headingContent;
};

const SheetContainer = (props: T.Props, ref: T.Ref) => {
  const {
    id: passedId,
    active,
    lockClose,
    lockCloseOnOutsideClick,
    onOpen,
    onAfterOpen,
    onClose,
    onAfterClose,
    onCloseTrigger,
    className,
    innerClassName,
    fill,
    attributes,
    zIndex,
    keepMounted,
    arrowNavigation,
    children,
    title,
    subtitle,
    footer,
    stickyHeader = false,
    closeClassName,
    closeAttributes,
    overlayAttributes,
    ariaLabel,
    position = "bottom",
    size,
    hideOverlay,
    overflow,
  } = props;
  const overlayRef = React.useRef<TOverlay.RefProps | null>(null);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  const closeClassNames = classNames(styles.close, closeClassName);

  const openOverlay = () => overlayRef.current!.open();
  const closeOverlay = () => overlayRef.current!.close();

  React.useImperativeHandle(ref, () => ({
    open: openOverlay,
    close: closeOverlay,
  }));

  const id = useId(passedId);
  const titleId = `${id}-title`;
  const subtitleId = `${id}-subtitle`;

  const headingContent = (title || subtitle) && (
    <Title
      variant="headline_3"
      tagName="div"
      titleTagName="h2"
      subtitleTagName="span"
      title={title}
      subtitle={subtitle}
      className={styles.title}
      subtitleClassName={styles.subtitle}
      titleAttributes={{ id: titleId }}
      subtitleAttributes={{ id: subtitleId }}
    />
  );

  return (
    <Overlay
      active={active}
      lockClose={lockClose}
      lockCloseOnClick={lockCloseOnOutsideClick}
      keepMounted={keepMounted}
      onClose={onClose}
      onCloseTrigger={onCloseTrigger}
      onAfterClose={onAfterClose}
      onOpen={onOpen}
      onAfterOpen={onAfterOpen}
      ref={overlayRef}
      zIndex={zIndex}
      arrowNavigation={arrowNavigation}
      attributes={overlayAttributes}
      hideOverlay={hideOverlay}
    >
      {({ active }) => {
        const isSizeLarge = size === "large";
        const isPaddingLarge =
          isSizeLarge || (typeof size === "number" && size >= 780);
        const rootClassName = classNames(
          styles.root,
          className,
          active && styles["root--active"],
          fill && styles["root--fill"],
          responsiveClassNames(styles, "root--position", position),
          isSizeLarge && styles["root--size-large"],
          isPaddingLarge && styles["root--padding-large"],
          overflow && styles[`root--overflow-${overflow}`]
        );
        const innerClassNames = classNames(styles.inner, innerClassName);
        const headerClassNames = classNames(
          styles.header,
          !title && !subtitle && styles["header--preserve-space"],
          stickyHeader && styles["header--sticky"]
        );

        return (
          <div
            {...attributes}
            className={rootClassName}
            style={
              typeof size === "number"
                ? ({
                    "--bui_sheet_container_size": `${size}px`,
                  } as React.CSSProperties)
                : undefined
            }
            ref={rootRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={subtitle ? subtitleId : undefined}
          >
            <div className={innerClassNames}>
              <div className={styles.content}>
                {isSheetWithClose(props, headingContent) && (
                  <DismissibleContainer
                    fill={fill}
                    // Can't use destructured variables here due to the type guard
                    hideClose={props.hideClose}
                    closeAriaLabel={props.closeAriaLabel}
                    onClose={closeOverlay}
                    className={headerClassNames}
                    closeClassName={closeClassNames}
                    closeAttributes={closeAttributes}
                  >
                    {headingContent}
                  </DismissibleContainer>
                )}

                {children && <div className={styles.body}>{children}</div>}
              </div>

              {footer && <div className={styles.footer}>{footer}</div>}
            </div>
          </div>
        );
      }}
    </Overlay>
  );
};

export default React.forwardRef(SheetContainer);
