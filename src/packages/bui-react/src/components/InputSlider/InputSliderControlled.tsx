import React from "react";
import FormControl from "components/FormControl";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { isRTL } from "@bookingcom/bui-core/utilities/helpers";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useDebouncedCallback from "hooks/useDebouncedCallback";
import InputSliderControl from "./InputSliderControl";
import { Provider, useInputSlider } from "./InputSlider.context";
import type * as T from "./InputSlider.types";
import styles from "@bookingcom/bui-core/css/InputSlider.module.css";

const InputSliderControlled = () => {
  const {
    minId,
    maxId,
    getPercentValue,
    getBoundaries,
    dragId,
    setDragId,
    setMergedTooltipDelta,
    props,
    valueVisibility,
    // normalized values
    minValue,
    maxValue,
  } = useInputSlider();
  const {
    className,
    label,
    ariaLabel,
    minAriaLabel,
    maxAriaLabel,
    renderValue,
    range,
    attributes,
    min,
    max,
    disabled,
    interval,
    name,
    onChange,
    onChangeCommit,
    mixin,
  } = props;

  const rtl = isRTL();
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const minRef = React.useRef<HTMLDivElement | null>(null);
  const minTooltipRef = React.useRef<HTMLSpanElement | null>(null);
  const maxRef = React.useRef<HTMLDivElement | null>(null);
  const maxTooltipRef = React.useRef<HTMLSpanElement | null>(null);
  const mergedTooltipRef = React.useRef<HTMLSpanElement | null>(null);
  const updatedValueRef = React.useRef<{ value: number; id: string } | null>(
    null
  );
  const rootClassName = classNames(
    styles.root,
    valueVisibility === "tooltip" && styles["root--tooltip"],
    className
  );
  const barRole = range ? "group" : undefined;

  /**
   * Get mouse x coordinate within the slider
   */
  const getMouseX = (event: MouseEvent | TouchEvent) => {
    if (event instanceof MouseEvent && event.pageX) return event.pageX;
    if (
      event instanceof TouchEvent &&
      event.changedTouches &&
      event.changedTouches.length === 1
    ) {
      return event.changedTouches[0].pageX;
    }

    return (event as MouseEvent).screenX;
  };

  /**
   * Get value based on x coordinate
   */
  const getPositionValue = (mouseX: number) => {
    const rootWidth = rootRef.current!.clientWidth;
    const positionX = mouseX - rootRef.current!.getBoundingClientRect().left;

    let percentage = positionX / rootWidth;
    if (rtl) percentage = 1 - percentage;

    let value = (max - min) * percentage + min;
    value = Math.round(value / interval) * interval;

    return value;
  };

  /**
   * Get left/right style position for the slider bar
   */
  const getSelectedAreaPosition = () => {
    const positiveDirection = rtl ? "left" : "right";
    const negativeDirection = rtl ? "right" : "left";
    const result: { right?: string; left?: string } = {};

    if (range) {
      const minPercentValue = getPercentValue(minValue);
      const maxPercentValue = getPercentValue(maxValue);
      result[positiveDirection] = `${(1 - maxPercentValue) * 100}%`;
      result[negativeDirection] = `${minPercentValue * 100}%`;
    } else {
      const percentValue = getPercentValue(minValue);
      result[positiveDirection] = `${(1 - percentValue) * 100}%`;
    }

    return result;
  };

  /**
   * Update merged tooltip position delta to center it relatively to both handles
   */
  const updateMergedTooltipDelta = React.useCallback(() => {
    if (!minTooltipRef.current || !maxTooltipRef.current) return;
    const minRect = minTooltipRef.current.getBoundingClientRect();
    const maxRect = maxTooltipRef.current.getBoundingClientRect();
    const isMerged = rtl
      ? minRect.left <= maxRect.right
      : minRect.right >= maxRect.left;
    const tooltipDelta =
      minRef.current && maxRef.current && isMerged
        ? (maxRef.current.offsetLeft - minRef.current.offsetLeft) / 2
        : 0;

    setMergedTooltipDelta(Math.round(tooltipDelta));
  }, [minTooltipRef, maxTooltipRef, minRef, maxRef, rtl]);

  /**
   * Single change event method to handle all value change scenarios
   */
  const changeValue = React.useCallback(
    (value: number, id: string, options?: { commit?: boolean }) => {
      const { commit } = options || {};
      const boundaries = getBoundaries(id);
      const crossedMin = value < boundaries.min;
      const crossedMax = value > boundaries.max;
      const isValid = !crossedMin && !crossedMax;

      if (!isValid) {
        if (crossedMin && value > min && dragId) return setDragId(minId);
        if (crossedMax && value < max && dragId) return setDragId(maxId);
      }

      let nextValue = value;
      if (crossedMin) nextValue = boundaries.min;
      if (crossedMax) nextValue = boundaries.max;

      if (range) {
        const valueKey = id === minId ? "minValue" : "maxValue";
        const args = { [valueKey]: nextValue, name };

        if (onChange && !commit) (onChange as any)(args);
        if (onChangeCommit && commit) (onChangeCommit as any)(args);
      } else {
        if (onChange && !commit) (onChange as any)({ value: nextValue, name });
        if (onChangeCommit && commit)
          (onChangeCommit as any)({ value: nextValue, name });
      }

      updatedValueRef.current = { value: nextValue, id };
    },
    [
      range,
      min,
      max,
      minId,
      maxId,
      updatedValueRef,
      minTooltipRef,
      maxTooltipRef,
      getBoundaries,
      updateMergedTooltipDelta,
    ]
  );

  /**
   * Commit is debounced to handle its call when holding keyboard arrow keys,
   * so we call commit on each change as there is no "end" event there
   */
  const commitValue = useDebouncedCallback(
    (value: number, id: string) => {
      return changeValue(value, id, { commit: true });
    },
    250,
    [changeValue]
  );

  /**
   * Event handlers
   */
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const value = +event.target.value;
    changeValue(value, id);
    commitValue(value, id, { commit: true });
  };

  const handleDragStart = (dragId: string) => {
    if (disabled) return;
    setDragId(dragId);
  };

  const handleDragEnd = React.useCallback(() => {
    if (!dragId) return;
    setDragId(null);

    if (!updatedValueRef.current) return;
    commitValue(updatedValueRef.current.value, updatedValueRef.current.id);
  }, [commitValue, updatedValueRef, dragId]);

  const handleDrag = React.useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (disabled || !dragId) return;

      const xCurrent = getMouseX(e);
      const nextValue = getPositionValue(xCurrent);

      changeValue(nextValue, dragId);
    },
    [disabled, dragId]
  );

  const handleBarMouseDown = ({ nativeEvent }: React.MouseEvent) => {
    if (disabled) return;

    let minDistance: number;
    let closestId = null;
    const mouseX = getMouseX(nativeEvent);
    const items = [
      { ref: minRef, id: minId },
      { ref: maxRef, id: maxId },
    ];

    items.forEach((item) => {
      if (!item.ref.current) return;
      const el = item.ref.current;
      const distance = Math.abs(el.getBoundingClientRect().left - mouseX);

      if (minDistance === undefined || distance <= minDistance) {
        minDistance = distance;
        closestId = item.id;
      }
    });

    if (!closestId) return;
    changeValue(getPositionValue(mouseX), closestId);
    setDragId(closestId);
  };

  /**
   * Check tooltip merged delta on mount in case it has to be already adjusted
   */
  useIsomorphicLayoutEffect(() => {
    updateMergedTooltipDelta();
  }, [updateMergedTooltipDelta, minValue, maxValue]);

  React.useEffect(() => {
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);

    return () => {
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("touchend", handleDragEnd);
      document.removeEventListener("touchmove", handleDrag);
    };
  }, [handleDragEnd, handleDrag]);

  const renderDisplay = () => {
    if (valueVisibility === "hidden" || valueVisibility === "tooltip")
      return null;

    if (renderValue) {
      const displayedValue = range
        ? renderValue(minValue, maxValue)
        : (renderValue as any)(minValue);

      if (!displayedValue) return null;

      return (
        <span role="status">
          <span className={styles.display}>{displayedValue}</span>
        </span>
      );
    }

    return (
      <span aria-hidden="true">
        <span className={styles.display}>{minValue}</span>

        {range && (
          <>
            <span> - </span>
            <span className={styles.display}>{maxValue}</span>
          </>
        )}
      </span>
    );
  };

  return (
    <FormControl
      label={label}
      attributes={attributes}
      className={rootClassName}
      ref={rootRef}
      mixin={mixin}
    >
      {() => (
        <>
          {renderDisplay()}

          {/* eslint-disable-next-line */}
          <div
            className={styles.bar}
            onMouseDown={handleBarMouseDown}
            // @ts-ignore
            onTouchStart={handleBarMouseDown}
            role={barRole}
          >
            <InputSliderControl
              ariaLabel={range ? minAriaLabel : ariaLabel}
              id={minId}
              onChange={(event) => handleChange(event, minId)}
              onDragStart={handleDragStart}
              ref={minRef}
              tooltipRef={minTooltipRef}
              mergedTooltipRef={mergedTooltipRef}
              rootRef={rootRef}
              range={range}
            />

            {range && (
              <InputSliderControl
                ariaLabel={maxAriaLabel}
                id={maxId}
                onChange={(event) => handleChange(event, maxId)}
                onDragStart={handleDragStart}
                ref={maxRef}
                tooltipRef={maxTooltipRef}
                mergedTooltipRef={mergedTooltipRef}
                rootRef={rootRef}
                range={range}
              />
            )}

            <div
              className={styles["selected-area"]}
              style={getSelectedAreaPosition()}
            />
          </div>
        </>
      )}
    </FormControl>
  );
};

const InputSliderControlledWrapper = (props: T.DefaultControlledProps) => {
  return (
    <Provider props={props}>
      <InputSliderControlled />
    </Provider>
  );
};

export default InputSliderControlledWrapper;
