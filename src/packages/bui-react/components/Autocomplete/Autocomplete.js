"use client";
import React from "react";
import Keys from "@bookingcom/bui-core/constants/keys";
import { normalizeKey } from "@bookingcom/bui-core/utilities/helpers";
import { getActiveElement } from "@bookingcom/bui-core/utilities/a11y";
import Popover from "../Popover/index.js";
import Stack from "../Stack/index.js";
import ListItem from "../ListItem/index.js";
const AutocompleteContext = React.createContext({});
const useAutocomplete = () => React.useContext(AutocompleteContext);
const AutocompleteTrigger = (props) => {
    const { children } = props;
    const { triggerRef, positionRef, open, close, active, onChange, onInput } = useAutocomplete();
    const handleChange = (e) => {
        onChange?.({ value: e.target.value });
    };
    const handleInput = (e) => {
        onInput?.({ value: e.target.value });
        // Before setting popover to active we check
        // if event is coming from input that is actually focused
        // to prevent cases like browser autofill trigger popover to open
        if (e.target !== document.activeElement) {
            close();
            return;
        }
        open();
    };
    React.useEffect(() => {
        const triggerEl = triggerRef.current;
        if (!triggerEl)
            return;
        const handleKeydown = (e) => {
            const key = normalizeKey(e.key);
            if (key === Keys.ENTER && active) {
                const focusedOnTrigger = getActiveElement() === triggerRef.current;
                if (focusedOnTrigger) {
                    // Close the autocomplete when focus is on the input since it's not handled by item click
                    close();
                }
                else {
                    // Prevent forms from submitting while selecting an item since real focus stays in the input
                    e.preventDefault();
                }
            }
            if (key === Keys.DOWN && !active) {
                open();
            }
        };
        triggerEl.addEventListener("keydown", handleKeydown);
        return () => triggerEl.removeEventListener("keydown", handleKeydown);
    }, [triggerRef, open, active, close]);
    return children({
        ref: triggerRef,
        onChange: handleChange,
        onInput: handleInput,
        autoComplete: "off",
        role: "combobox",
        "aria-haspopup": "listbox",
        "aria-autocomplete": "list",
        "aria-expanded": active,
    }, positionRef);
};
const AutocompletePopover = (props) => {
    const { children, popoverSize } = props;
    const { triggerRef, positionRef, active, open, close } = useAutocomplete();
    const hasChildren = !!React.Children.toArray(children).filter(Boolean).length;
    return (React.createElement(Popover, { position: popoverSize === "auto" ? "bottom-start" : "bottom-stretch", triggerRef: triggerRef, positionRef: positionRef, triggerType: "focus", trapFocusMode: "soft", navigationMode: "arrows", hideClose: true, hideArrow: true, forcePosition: true, fill: true, 
        /**
         * Disabling the animation here to simplify the hiding of the dropdown when all items get filtered out
         * We don't expect product teams to handle this behaviour on the product each time
         */
        disableAnimation: "hide", active: hasChildren ? active : false, size: popoverSize, onOpen: open, onClose: close },
        React.createElement(Popover.Content, null,
            React.createElement(Stack, { gap: 0.5, mixin: { padding: 1 }, attributes: { role: "listbox" } }, children))));
};
const AutocompleteItem = (props) => {
    const { value, ...listItemProps } = props;
    const { onItemClick } = useAutocomplete();
    const handleClick = () => {
        onItemClick({ value });
    };
    return (React.createElement(ListItem, { ...listItemProps, onClick: handleClick, attributes: { ...listItemProps.attributes, role: "option", tabIndex: -1 }, roundedCorners: true, spacing: "small" }));
};
const AutocompleteBase = (props, ref) => {
    const { children, onChange, onInput } = props;
    const [active, setActive] = React.useState(false);
    const triggerRef = React.useRef(null);
    const positionRef = React.useRef(null);
    const open = React.useCallback(() => {
        setActive(true);
    }, []);
    const openWithFocus = React.useCallback(() => {
        setActive(true);
        triggerRef.current?.focus();
    }, []);
    const close = React.useCallback(() => {
        setActive(false);
    }, []);
    const handleItemClick = (args) => {
        onChange?.(args);
        close();
    };
    React.useImperativeHandle(ref, () => ({
        open,
        close,
    }));
    return (React.createElement(AutocompleteContext.Provider, { value: {
            active,
            open: openWithFocus,
            close,
            triggerRef,
            positionRef,
            onChange,
            onInput,
            onItemClick: handleItemClick,
        } }, children));
};
const Autocomplete = React.forwardRef(AutocompleteBase);
Autocomplete.Trigger = AutocompleteTrigger;
Autocomplete.Popover = AutocompletePopover;
Autocomplete.Item = AutocompleteItem;
export default Autocomplete;
