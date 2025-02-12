"use client";

import React from "react";
import Keys from "@bookingcom/bui-core/constants/keys";
import { normalizeKey } from "@bookingcom/bui-core/utilities/helpers";
import { getActiveElement } from "@bookingcom/bui-core/utilities/a11y";
import Popover from "components/Popover";
import Stack from "components/Stack";
import ListItem from "components/ListItem";
import type * as T from "./Autocomplete.types";

const AutocompleteContext = React.createContext({} as T.Context);
const useAutocomplete = () => React.useContext(AutocompleteContext);

const AutocompleteTrigger = (props: T.TriggerProps) => {
  const { children } = props;
  const { triggerRef, positionRef, open, close, active, onChange, onInput } =
    useAutocomplete();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.({ value: e.target.value });
  };

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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

    if (!triggerEl) return;

    const handleKeydown = (e: KeyboardEvent) => {
      const key = normalizeKey(e.key);

      if (key === Keys.ENTER && active) {
        const focusedOnTrigger = getActiveElement() === triggerRef.current;

        if (focusedOnTrigger) {
          // Close the autocomplete when focus is on the input since it's not handled by item click
          close();
        } else {
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

  return children(
    {
      ref: triggerRef,
      onChange: handleChange,
      onInput: handleInput,
      autoComplete: "off",
      role: "combobox",
      "aria-haspopup": "listbox",
      "aria-autocomplete": "list",
      "aria-expanded": active,
    },
    positionRef
  );
};

const AutocompletePopover = (props: T.PopoverProps) => {
  const { children, popoverSize } = props;
  const { triggerRef, positionRef, active, open, close } = useAutocomplete();
  const hasChildren = !!React.Children.toArray(children).filter(Boolean).length;

  return (
    <Popover
      position="bottom-stretch"
      triggerRef={triggerRef}
      positionRef={positionRef}
      triggerType="focus"
      trapFocusMode="soft"
      navigationMode="arrows"
      hideClose
      hideArrow
      forcePosition
      fill
      /**
       * Disabling the animation here to simplify the hiding of the dropdown when all items get filtered out
       * We don't expect product teams to handle this behaviour on the product each time
       */
      disableAnimation="hide"
      active={hasChildren ? active : false}
      onOpen={open}
      onClose={close}
      size={popoverSize}
    >
      <Popover.Content>
        <Stack
          gap={0.5}
          mixin={{ padding: 1 }}
          attributes={{ role: "listbox" }}
        >
          {children}
        </Stack>
      </Popover.Content>
    </Popover>
  );
};

const AutocompleteItem = (props: T.ItemProps) => {
  const { value, ...listItemProps } = props;
  const { onItemClick } = useAutocomplete();

  const handleClick = () => {
    onItemClick({ value });
  };

  return (
    <ListItem
      {...listItemProps}
      onClick={handleClick}
      attributes={{ ...listItemProps.attributes, role: "option", tabIndex: -1 }}
      roundedCorners
      spacing="small"
    />
  );
};

const AutocompleteBase = (props: T.Props, ref: T.Ref) => {
  const { children, onChange, onInput } = props;
  const [active, setActive] = React.useState(false);
  const triggerRef = React.useRef<HTMLInputElement>(null);
  const positionRef = React.useRef<HTMLDivElement>(null);

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

  const handleItemClick: T.Context["onItemClick"] = (args) => {
    onChange?.(args);
    close();
  };

  React.useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <AutocompleteContext.Provider
      value={{
        active,
        open: openWithFocus,
        close,
        triggerRef,
        positionRef,
        onChange,
        onInput,
        onItemClick: handleItemClick,
      }}
    >
      {children}
    </AutocompleteContext.Provider>
  );
};

const Autocomplete = React.forwardRef(AutocompleteBase) as T.Compound;

Autocomplete.Trigger = AutocompleteTrigger;
Autocomplete.Popover = AutocompletePopover;
Autocomplete.Item = AutocompleteItem;

export default Autocomplete;
