import React from "react";
import ListItem from "components/ListItem";
import Popover from "components/Popover";
import Divider from "components/Divider";
import type * as T from "./DropdownMenu.types";
import styles from "@bookingcom/bui-core/css/DropdownMenu.module.css";

const DropdownMenuItem = (props: T.ItemProps) => {
  const {
    className,
    href,
    attributes,
    icon,
    text,
    disabled,
    onClick,
    textSlot,
    startSlot,
    endSlot,
    preventDefault,
    divider,
  } = props;

  return (
    <li className={className}>
      {divider && <Divider className={styles.divider} />}
      <ListItem
        attributes={attributes}
        icon={icon}
        startSlot={startSlot}
        endSlot={endSlot}
        href={href}
        onClick={onClick}
        disabled={disabled}
        preventDefault={preventDefault}
        roundedCorners={false}
      >
        <span>{text}</span>
        {textSlot && <span className={styles.textSlot}>{textSlot}</span>}
      </ListItem>
    </li>
  );
};

const DropdownMenuSection = (props: T.SectionProps) => {
  const { items, divider = false, onItemChoose } = props;

  return (
    <>
      {items.map((item, index) => (
        <DropdownMenuItem
          {...item}
          divider={!index && divider}
          key={index}
          onClick={() => {
            if (item.onChoose) item.onChoose(item, index);
            if (onItemChoose) onItemChoose(item, index);
          }}
        />
      ))}
    </>
  );
};

const DropdownMenuControlled = (props: T.Props) => {
  const {
    items,
    sections,
    attributes,
    children,
    onItemChoose,
    id,
    position = "bottom-start",
    triggerClassName,
    triggerType,
    navigationMode = "arrows",
    active,
    onOpen,
    onClose,
    triggerDisplay,
    disableAnimation,
  } = props;

  return (
    <Popover
      hideClose
      trapFocusMode="soft"
      triggerType={triggerType}
      navigationMode={navigationMode}
      position={position}
      id={id}
      size={position === "bottom-stretch" ? undefined : "small"}
      active={active || false}
      onOpen={onOpen}
      onClose={onClose}
      disableAnimation={disableAnimation}
      hideArrow
      forcePosition
      fill
    >
      <Popover.Trigger className={triggerClassName} display={triggerDisplay}>
        {children}
      </Popover.Trigger>
      <Popover.Content attributes={{ ...attributes, role: "menu" }}>
        <ul className={styles.items}>
          {items && (
            <DropdownMenuSection items={items} onItemChoose={onItemChoose} />
          )}

          {sections &&
            sections.map((section, index) => (
              <React.Fragment key={index}>
                <DropdownMenuSection
                  items={section.items}
                  divider={index > 0 || !!items}
                  onItemChoose={onItemChoose}
                />
              </React.Fragment>
            ))}
        </ul>
      </Popover.Content>
    </Popover>
  );
};

export default DropdownMenuControlled;
