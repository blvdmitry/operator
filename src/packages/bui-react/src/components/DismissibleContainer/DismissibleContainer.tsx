import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import CloseIcon from "@bookingcom/bui-assets-react/streamline/CloseIcon";
import Button from "components/Button";
import type * as T from "./DismissibleContainer.types";
import styles from "@bookingcom/bui-core/css/DismissibleContainer.module.css";

const DismissibleContainer = (props: T.Props) => {
  const {
    hideClose,
    children,
    fill,
    onClose,
    buttonColor,
    className,
    attributes,
    closeAriaLabel,
    closeClassName,
    closeAttributes,
  } = props;
  const rootClassNames = classNames(
    styles.root,
    className,
    fill && styles["root--fill"],
    hideClose && styles["root--hide-close"]
  );
  const closeClassNames = classNames(styles.close, closeClassName);

  const handleClose = () => onClose && onClose();

  return (
    <div {...attributes} className={rootClassNames}>
      {children}

      {!hideClose && (
        <Button.Aligner alignment={["top", "end"]} className={closeClassNames}>
          <Button
            variant={
              buttonColor === "inherit"
                ? "tertiary-inherit"
                : "tertiary-neutral"
            }
            onClick={handleClose}
            attributes={{ ...closeAttributes, "aria-label": closeAriaLabel }}
            icon={CloseIcon}
          />
        </Button.Aligner>
      )}
    </div>
  );
};

export default DismissibleContainer;
