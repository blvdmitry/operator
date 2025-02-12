import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import CheckmarkFillIcon from "@bookingcom/bui-assets-react/streamline/CheckmarkFillIcon";
import FormControl from "components/FormControl";
import Text from "components/Text";
import Icon from "components/Icon";
import Stack from "components/Stack";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useComposeRefs from "hooks/useComposeRefs";
import useId from "hooks/useId";
import { useInputCheckboxGroup } from "components/InputCheckboxGroup";
import type * as T from "./InputCheckbox.types";
import styles from "@bookingcom/bui-core/css/InputCheckbox.module.css";

const InputCheckbox = (props: T.Props) => {
  const {
    error,
    label,
    helper,
    className,
    onChange,
    onFocus,
    onBlur,
    attributes,
    value,
    indeterminate,
    inputAttributes,
    children,
    icon,
    mixin,
  } = props;

  const checkboxGroup = useInputCheckboxGroup();
  const name = checkboxGroup?.name || props.name;
  const disabled = checkboxGroup?.disabled || props.disabled;
  const checked = checkboxGroup
    ? checkboxGroup.value?.includes(value!)
    : props.checked;
  const defaultChecked = checkboxGroup ? undefined : props.defaultChecked;
  const internalRef = React.useRef<HTMLInputElement | null>(null);
  const syncRefs = useComposeRefs<HTMLInputElement | null>(
    internalRef,
    inputAttributes?.ref
  );
  const id = useId(props.id);
  const rootClassName = classNames(
    styles.root,
    className,
    (!!error || !!checkboxGroup?.error) && styles["root--error"]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (!name) {
      // eslint-disable-next-line no-console
      console.error("[BUI:InputCheckbox] Missing name property");
      return;
    }

    if (checkboxGroup?.onItemChange) {
      checkboxGroup?.onItemChange({ name, value, checked, event });
    } else {
      onChange?.({ name, value, checked, event });
    }
  };

  useIsomorphicLayoutEffect(() => {
    internalRef.current!.indeterminate = indeterminate || false;
  }, [indeterminate]);

  return (
    <>
      <FormControl
        id={id}
        error={error}
        disabled={disabled}
        className={rootClassName}
        attributes={attributes}
        mixin={mixin}
      >
        {(controlAttributes) => (
          <>
            <input
              {...inputAttributes}
              {...controlAttributes}
              className={styles.input}
              type="checkbox"
              name={name}
              disabled={disabled}
              checked={checked === null ? false : checked}
              defaultChecked={defaultChecked}
              value={value}
              onFocus={onFocus || inputAttributes?.onFocus}
              onBlur={onBlur || inputAttributes?.onBlur}
              onChange={handleChange}
              ref={syncRefs}
            />
            <Stack
              direction="row"
              tagName="label"
              className={styles.container}
              attributes={{ htmlFor: controlAttributes.id }}
            >
              <span className={styles.hitbox} />
              <span className={styles.field}>
                <Icon
                  svg={CheckmarkFillIcon}
                  className={styles["checkbox-icon"]}
                />
              </span>

              {icon && (
                <span className={styles.icon}>
                  <Icon svg={icon} size="small" />
                </span>
              )}

              {(label || helper) && (
                <Stack.Item tagName="span" grow>
                  {label && (
                    <Text
                      color={disabled ? "disabled" : "neutral"}
                      className={styles.label}
                    >
                      {label}
                    </Text>
                  )}

                  {helper && (
                    <Text
                      variant="small_1"
                      color={disabled ? "disabled" : "neutral_alt"}
                      className={styles.helper}
                    >
                      {helper}
                    </Text>
                  )}
                </Stack.Item>
              )}
            </Stack>
          </>
        )}
      </FormControl>

      {/* Has to be deprecated but currently it works for people adding extra content in between
      checkboxes when using CheckboxGroup */}
      {children && <div className={styles.bottom}>{children}</div>}
    </>
  );
};

export default InputCheckbox;
