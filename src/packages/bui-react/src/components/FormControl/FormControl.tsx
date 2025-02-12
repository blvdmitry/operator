import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Text, { type TextProps } from "components/Text";
import useId from "hooks/useId";
import type * as T from "./FormControl.types";
import styles from "@bookingcom/bui-core/css/FormControl.module.css";

export const FormControlLabel = (props: T.LabelProps) => {
  const { label, subLabel, labelEndSlot, required, id, disabled, group } =
    props;
  const tagName = group ? "legend" : "label";

  return (
    <Text
      tagName={tagName}
      color={disabled ? "disabled" : "neutral"}
      className={styles.label}
      attributes={{ htmlFor: group ? undefined : id }}
    >
      <span>
        <Text tagName="span" variant="emphasized_2">
          {label}
        </Text>
        {subLabel && (
          <Text
            tagName="span"
            variant="body_2"
            color={disabled ? "disabled" : "neutral_alt"}
            className={styles.subLabel}
          >
            {subLabel}
          </Text>
        )}
        {required && (
          <Text
            tagName="span"
            variant="body_2"
            color={disabled ? "disabled" : "destructive"}
            className={styles.asterisk}
          >
            <span aria-hidden="true">*</span>
          </Text>
        )}
      </span>
      {labelEndSlot && (
        <Text
          tagName="span"
          variant="body_2"
          color={disabled ? "disabled" : "neutral_alt"}
          className={styles.labelEnd}
        >
          {labelEndSlot}
        </Text>
      )}
    </Text>
  );
};

const FormControl = React.forwardRef<HTMLElement, T.Props>((props, ref) => {
  const {
    id,
    label,
    subLabel,
    labelEndSlot,
    helper,
    error,
    success,
    disabled,
    required,
    group,
    children,
    className,
    attributes,
    mixin,
  } = props;
  const inputId = useId(id);
  const note =
    (typeof error !== "boolean" && !disabled && error) ||
    (typeof success !== "boolean" && !disabled && success) ||
    helper;
  const noteId = note ? `${inputId}-note` : undefined;
  const rootClassNames = classNames(styles.root, className);
  const tagName = group ? "fieldset" : "div";

  const fieldAttributes: T.ChildrenAttributes = {
    id: group ? undefined : inputId,
  };
  // Add aria only if the value is present so it doesn't override custom attributes passed manually with undefined
  if (noteId) fieldAttributes["aria-describedby"] = noteId;
  // aria-required is not supported on fieldsets unless you specify their role
  if (required && !group) fieldAttributes["aria-required"] = true;

  let rootAttributes = { ...attributes, ref };
  // Group is using fieldset which needs attributes on its level
  if (group) rootAttributes = { ...rootAttributes, ...fieldAttributes };

  let noteColor: TextProps["color"] = "neutral_alt";

  if (disabled) {
    noteColor = "disabled";
  } else if (error) {
    noteColor = "destructive";
  } else if (success) {
    noteColor = "constructive";
  }

  return (
    <Text
      attributes={rootAttributes}
      className={rootClassNames}
      tagName={tagName}
      mixin={mixin}
    >
      {label && (
        <FormControlLabel
          group={group}
          id={inputId}
          label={label}
          subLabel={subLabel}
          required={required}
          labelEndSlot={labelEndSlot}
          disabled={disabled}
        />
      )}
      {group ? children() : children(fieldAttributes)}
      {note && (
        <Text
          variant="small_1"
          className={styles.note}
          color={noteColor}
          attributes={{ id: noteId, role: "alert" }}
        >
          {note}
        </Text>
      )}
    </Text>
  );
});

export default FormControl;
