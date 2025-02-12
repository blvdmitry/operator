import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Text, {} from "../Text/index.js";
import useId from "../../hooks/useId.js";
import styles from "@bookingcom/bui-core/css/FormControl.module.css";
export const FormControlLabel = (props) => {
    const { label, subLabel, labelEndSlot, required, id, disabled, group } = props;
    const tagName = group ? "legend" : "label";
    const renderAsterisk = () => required && (React.createElement(Text, { tagName: "span", color: disabled ? "disabled" : "destructive" },
        React.createElement("span", { "aria-hidden": "true" }, "*")));
    return (React.createElement(Text, { tagName: tagName, color: disabled ? "disabled" : "neutral", className: styles.form, variant: "body_2", attributes: { htmlFor: group ? undefined : id } },
        React.createElement("span", null,
            React.createElement(Text, { tagName: "span", variant: "emphasized_2", className: styles.labelText }, label),
            subLabel ? (React.createElement("span", { className: styles.subLabel },
                React.createElement(Text, { tagName: "span", color: disabled ? "disabled" : "neutral_alt", className: styles.labelText }, subLabel),
                renderAsterisk())) : (renderAsterisk())),
        labelEndSlot && (React.createElement(Text, { tagName: "span", color: disabled ? "disabled" : "neutral_alt", className: styles.labelEnd }, labelEndSlot))));
};
const FormControl = React.forwardRef((props, ref) => {
    const { id, label, subLabel, labelEndSlot, helper, error, success, disabled, required, group, children, className, attributes, mixin, } = props;
    const inputId = useId(id);
    const note = (typeof error !== "boolean" && !disabled && error) ||
        (typeof success !== "boolean" && !disabled && success) ||
        helper;
    const noteId = note ? `${inputId}-note` : undefined;
    const rootClassNames = classNames(styles.root, className);
    const tagName = group ? "fieldset" : "div";
    const fieldAttributes = {
        id: group ? undefined : inputId,
    };
    // Add aria only if the value is present so it doesn't override custom attributes passed manually with undefined
    if (noteId)
        fieldAttributes["aria-describedby"] = noteId;
    // aria-required is not supported on fieldsets unless you specify their role
    if (required && !group)
        fieldAttributes["aria-required"] = true;
    let rootAttributes = { ...attributes, ref };
    // Group is using fieldset which needs attributes on its level
    if (group)
        rootAttributes = { ...rootAttributes, ...fieldAttributes };
    let noteColor = "neutral_alt";
    if (disabled) {
        noteColor = "disabled";
    }
    else if (error) {
        noteColor = "destructive";
    }
    else if (success) {
        noteColor = "constructive";
    }
    return (React.createElement(Text, { attributes: rootAttributes, className: rootClassNames, variant: "body_2", tagName: tagName, mixin: mixin },
        label && (React.createElement(FormControlLabel, { group: group, id: inputId, label: label, subLabel: subLabel, required: required, labelEndSlot: labelEndSlot, disabled: disabled })),
        group ? children() : children(fieldAttributes),
        note && (React.createElement(Text, { variant: "small_1", className: styles.note, color: noteColor, attributes: { id: noteId, role: "alert" } }, note))));
});
export default FormControl;
