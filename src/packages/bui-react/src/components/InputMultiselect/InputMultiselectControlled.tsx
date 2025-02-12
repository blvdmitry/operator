import React from "react";
import Stack from "components/Stack";
import Box from "components/Box";
import InputCheckboxGroup from "components/InputCheckboxGroup";
import InputCheckbox from "components/InputCheckbox";
import InputSelect from "components/InputSelect";
import Link from "components/Link";
import Divider from "components/Divider";
import Popover from "components/Popover";
import type * as G from "types/global";
import type * as T from "./InputMultiselect.types";
import styles from "@bookingcom/bui-core/css/InputMultiselect.module.css";

const InputMultiselectControlled = (props: T.ControlledProps) => {
  const {
    id,
    value,
    onChange,
    name,
    renderDisplay,
    placeholder,
    options,
    groups,
    beforeSlot,
    afterSlot,
    immediateChange,
    applyLinkLabel,
    clearLinkLabel,
    actionsSlot,
    label,
    subLabel,
    className,
    attributes,
    error,
    helper,
    required,
    disabled,
    onOpen,
    onClose,
    inputSize,
    size,
    maxHeight,
    keepMounted,
    buttonAttributes,
    clearLinkAttributes,
    applyLinkAttributes,
  } = props;
  const [tempValue, setTempValue] = React.useState(value || []);
  const dirtyRef = React.useRef(false);
  const [active, setActive] = React.useState(false);

  const handleOpen = () => {
    setActive(true);
    dirtyRef.current = false;
    if (onOpen) onOpen();
  };

  const handleClose = (passedValue?: string[]) => {
    const nextValue = passedValue || value || [];

    setActive(false);
    if (onChange && dirtyRef.current) {
      onChange({ name, value: nextValue });
    }
    if (onClose) onClose();

    setTempValue(nextValue);
    dirtyRef.current = false;
  };

  const handleClear = () => {
    if (tempValue.length) dirtyRef.current = true;

    handleClose([]);
  };

  const handleApply = () => handleClose(tempValue);

  React.useEffect(() => {
    if (value) setTempValue(value);
  }, [value]);

  const getSelectedItems = (value: T.Props["value"]) => {
    if (!value) return [];

    if (options) {
      return options.filter((option) => value.includes(option.value));
    }

    if (groups) {
      return groups.reduce<T.OptionsBaseProps["options"]>((acc, cur) => {
        const selectedOptions = cur.options.filter((option) =>
          value.includes(option.value)
        );
        return acc.concat(selectedOptions);
      }, []);
    }

    return [];
  };

  const renderDisplayNode = () => {
    const currentValue = value || [];
    const renderedItems = getSelectedItems(currentValue);

    if (!currentValue.length) return null;
    if (renderDisplay) return renderDisplay(renderedItems);
    return renderedItems.map((item) => item.label).join(", ");
  };

  const renderGroupOrOptions = (group: T.UniversalGroup) => {
    // Reduce to map to optimize contain-checks.
    const groupOptionValues = group.options.reduce(
      (acc: { [key: string]: true }, option) => {
        if (!acc[option.value]) acc[option.value] = true;

        return acc;
      },
      {}
    );
    const groupValue = tempValue.filter((value) => value in groupOptionValues);

    const handleGroupChange: G.Prop<typeof InputCheckboxGroup, "onChange"> = ({
      name,
      value,
    }) => {
      const otherOptionValues = tempValue.filter(
        (value) => value in groupOptionValues === false
      );

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

    return (
      <InputCheckboxGroup
        // Fallback for the case when there is only a single group
        key={group.title || "group"}
        value={groupValue}
        onChange={handleGroupChange}
        {...checkboxGroupProps}
      >
        <Stack>
          {group.options.map((option) => (
            <InputCheckbox {...option} key={option.value} />
          ))}
        </Stack>
      </InputCheckboxGroup>
    );
  };

  const renderGroupsOrOptions = (groups: T.UniversalGroup[]) => {
    return <Stack gap={4}>{groups.map(renderGroupOrOptions)}</Stack>;
  };

  const renderItems = () => {
    return (
      <div className={styles.fields} style={{ maxHeight }}>
        <Stack gap={2}>
          {beforeSlot && <div>{beforeSlot}</div>}
          {renderGroupsOrOptions(groups || [{ name, options: options || [] }])}
          {afterSlot && <div>{afterSlot}</div>}
        </Stack>
      </div>
    );
  };

  const renderActions = () => {
    if (!actionsSlot && !clearLinkLabel && !applyLinkLabel) return null;

    return (
      <>
        <Divider />
        <Box>
          <Stack direction="row" justifyContent="space-between">
            {actionsSlot || (
              <>
                {clearLinkLabel && (
                  <Link
                    text={clearLinkLabel}
                    variant="primary"
                    onClick={handleClear}
                    attributes={clearLinkAttributes}
                  />
                )}
                {applyLinkLabel && (
                  <Link
                    text={applyLinkLabel}
                    variant="primary"
                    onClick={handleApply}
                    attributes={applyLinkAttributes}
                  />
                )}
              </>
            )}
          </Stack>
        </Box>
      </>
    );
  };

  return (
    <Popover
      fill
      hideArrow
      hideClose
      active={active}
      onOpen={handleOpen}
      onClose={handleClose}
      position="bottom-stretch"
      size={size}
      keepMounted={keepMounted}
      forcePosition
      navigationMode="arrows"
      trapFocusMode="soft"
    >
      <Popover.Trigger display="block">
        {(triggerAttributes) => (
          <InputSelect
            id={id}
            label={label}
            subLabel={subLabel}
            error={error}
            helper={helper}
            name={name}
            size={inputSize}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={className}
            attributes={attributes}
            inputAttributes={{
              ...buttonAttributes,
              "aria-pressed": active,
              ...triggerAttributes,
            }}
          >
            {renderDisplayNode()}
          </InputSelect>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {renderItems()}
        {renderActions()}
      </Popover.Content>
    </Popover>
  );
};

export default InputMultiselectControlled;
