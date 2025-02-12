import React from "react";
import InputCheckbox from "../InputCheckbox/index.js";
import InputCard from "../_base/InputCard/index.js";
const InputCheckboxCard = (props) => {
    const { id, error, className, attributes, value, inputElementVerticalAlignment = "top", showDivider = true, elevated, inputAttributes, additionalContent, children, onChange, disabled, checked, highlightIcon, highlightText, name, mixin, } = props;
    return (React.createElement(InputCard, { id: id, elevated: elevated, className: className, attributes: attributes, inputElementVerticalAlignment: inputElementVerticalAlignment, showDivider: showDivider, additionalContent: additionalContent, disabled: disabled, checked: checked, error: error, highlightIcon: highlightIcon, highlightText: highlightText, input: ({ id }) => (React.createElement(InputCheckbox, { id: id, inputAttributes: inputAttributes, name: name, value: value, disabled: disabled, onChange: onChange, checked: checked })), mixin: mixin }, children));
};
export default InputCheckboxCard;
