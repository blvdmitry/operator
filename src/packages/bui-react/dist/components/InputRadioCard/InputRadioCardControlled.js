import React from "react";
import InputRadio, {} from "../InputRadio/index.js";
import InputCard from "../_base/InputCard/index.js";
const InputRadioCardControlled = (props) => {
    const { id, name, value, error, disabled, checked, elevated, showInputElement, showDivider = true, inputElementVerticalAlignment = "top", className, attributes, inputAttributes, children, additionalContent, onChange, highlightIcon, highlightText, mixin, } = props;
    const radioProps = {
        inputAttributes,
        name,
        value,
        disabled,
        checked,
        onChange,
    };
    return (React.createElement(InputCard, { id: id, elevated: elevated, className: className, attributes: attributes, inputElementVerticalAlignment: inputElementVerticalAlignment, additionalContent: additionalContent, disabled: disabled, checked: checked, error: error, showInputElement: showInputElement, showDivider: showDivider, highlightIcon: highlightIcon, highlightText: highlightText, input: ({ id, className }) => (React.createElement(InputRadio, { ...radioProps, id: id, className: className })), mixin: mixin }, children));
};
export default InputRadioCardControlled;
