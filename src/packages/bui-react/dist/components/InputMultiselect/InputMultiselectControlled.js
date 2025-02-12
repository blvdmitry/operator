import React from "react";
import Stack from "../Stack/index.js";
import Box from "../Box/index.js";
import InputCheckboxGroup from "../InputCheckboxGroup/index.js";
import InputCheckbox from "../InputCheckbox/index.js";
import InputSelect from "../InputSelect/index.js";
import Link from "../Link/index.js";
import Divider from "../Divider/index.js";
import Popover from "../Popover/index.js";
import styles from "@bookingcom/bui-core/css/InputMultiselect.module.css";
const InputMultiselectControlled = (props) => {
    const { id, value, onChange, name, renderDisplay, placeholder, options, groups, beforeSlot, afterSlot, immediateChange, applyLinkLabel, clearLinkLabel, actionsSlot, label, subLabel, className, attributes, error, helper, required, disabled, onOpen, onClose, inputSize, contentSize, maxHeight, keepMounted, containerRef, buttonAttributes, clearLinkAttributes, applyLinkAttributes, } = props;
    const [tempValue, setTempValue] = React.useState(value || []);
    const dirtyRef = React.useRef(false);
    const [active, setActive] = React.useState(false);
    const handleOpen = () => {
        setActive(true);
        dirtyRef.current = false;
        if (onOpen)
            onOpen();
    };
    const handleClose = (passedValue) => {
        const nextValue = passedValue || value || [];
        setActive(false);
        if (onChange && dirtyRef.current) {
            onChange({ name, value: nextValue });
        }
        if (onClose)
            onClose();
        setTempValue(nextValue);
        dirtyRef.current = false;
    };
    const handleClear = () => {
        if (tempValue.length)
            dirtyRef.current = true;
        handleClose([]);
    };
    const handleApply = () => handleClose(tempValue);
    React.useEffect(() => {
        if (value)
            setTempValue(value);
    }, [value]);
    const getSelectedItems = (value) => {
        if (!value)
            return [];
        if (options) {
            return options.filter((option) => value.includes(option.value));
        }
        if (groups) {
            return groups.reduce((acc, cur) => {
                const selectedOptions = cur.options.filter((option) => value.includes(option.value));
                return acc.concat(selectedOptions);
            }, []);
        }
        return [];
    };
    const renderDisplayNode = () => {
        const currentValue = value || [];
        const renderedItems = getSelectedItems(currentValue);
        if (!currentValue.length)
            return null;
        if (renderDisplay)
            return renderDisplay(renderedItems);
        return renderedItems.map((item) => item.label).join(", ");
    };
    const renderGroupOrOptions = (group) => {
        // Reduce to map to optimize contain-checks.
        const groupOptionValues = group.options.reduce((acc, option) => {
            if (!acc[option.value])
                acc[option.value] = true;
            return acc;
        }, {});
        const groupValue = tempValue.filter((value) => value in groupOptionValues);
        const handleGroupChange = ({ name, value, }) => {
            const otherOptionValues = tempValue.filter((value) => value in groupOptionValues === false);
            const nextValue = [...otherOptionValues, ...value];
            setTempValue(nextValue);
            if (immediateChange && onChange) {
                onChange({ name, value: nextValue });
                return;
            }
            dirtyRef.current = true;
        };
        const checkboxGroupProps = group.title
            ? {
                label: group.title,
                name: group.title,
            }
            : { name };
        return (React.createElement(InputCheckboxGroup
        // Fallback for the case when there is only a single group
        , { 
            // Fallback for the case when there is only a single group
            key: group.title || "group", value: groupValue, onChange: handleGroupChange, ...checkboxGroupProps },
            React.createElement(Stack, null, group.options.map((option) => (React.createElement(InputCheckbox, { ...option, key: option.value }))))));
    };
    const renderGroupsOrOptions = (groups) => {
        return React.createElement(Stack, { gap: 4 }, groups.map(renderGroupOrOptions));
    };
    const renderItems = () => {
        return (React.createElement("div", { className: styles.fields, style: { maxHeight } },
            React.createElement(Stack, { gap: 2 },
                beforeSlot && React.createElement("div", null, beforeSlot),
                renderGroupsOrOptions(groups || [{ name, options: options || [] }]),
                afterSlot && React.createElement("div", null, afterSlot))));
    };
    const renderActions = () => {
        if (!actionsSlot && !clearLinkLabel && !applyLinkLabel)
            return null;
        return (React.createElement(React.Fragment, null,
            React.createElement(Divider, null),
            React.createElement(Box, null,
                React.createElement(Stack, { direction: "row", justifyContent: "space-between" }, actionsSlot || (React.createElement(React.Fragment, null,
                    clearLinkLabel && (React.createElement(Link, { text: clearLinkLabel, variant: "primary", onClick: handleClear, attributes: clearLinkAttributes })),
                    applyLinkLabel && (React.createElement(Link, { text: applyLinkLabel, variant: "primary", onClick: handleApply, attributes: applyLinkAttributes }))))))));
    };
    return (React.createElement(Popover, { fill: true, hideArrow: true, hideClose: true, active: active, onOpen: handleOpen, onClose: handleClose, position: "bottom-stretch", size: contentSize, keepMounted: keepMounted, forcePosition: true, navigationMode: "arrows", trapFocusMode: "soft", containerRef: containerRef },
        React.createElement(Popover.Trigger, { display: "block" }, (triggerAttributes) => (React.createElement(InputSelect, { id: id, label: label, subLabel: subLabel, error: error, helper: helper, name: name, size: inputSize, placeholder: placeholder, required: required, disabled: disabled, className: className, attributes: attributes, inputAttributes: {
                ...buttonAttributes,
                "aria-pressed": active,
                ...triggerAttributes,
            } }, renderDisplayNode()))),
        React.createElement(Popover.Content, null,
            renderItems(),
            renderActions())));
};
export default InputMultiselectControlled;
