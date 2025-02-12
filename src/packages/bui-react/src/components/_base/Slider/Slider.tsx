import React from "react";
import {
  getElementParentOffset,
  setElementScroll,
} from "@bookingcom/bui-core/utilities/scroll";
import useId from "hooks/useId";
import usePrevious from "hooks/usePrevious";
import useExperiment from "hooks/useExperiment";
import SliderContext from "./SliderContext";
import SliderControl from "./SliderControl";
import SliderContainer from "./SliderContainer";
import SliderItem from "./SliderItem";
import * as util from "./Slider.util";
import type * as T from "./Slider.types";

const SliderBase = (props: T.Props, ref: T.Ref) => {
  const [state, setState] = React.useState<T.State>({
    scrollValue: 0,
    startGhostsCount: 0,
    endGhostsCount: 0,
  });
  const [scrollingState, setScrollingState] =
    React.useState<T.ScrollingState>("idle");
  const previousState = usePrevious<T.State>({
    ...state,
  });
  const {
    children,
    infinite,
    isScrollEnabled = true,
    defaultActiveIndex = 0,
  } = props;
  const isExperiment = useExperiment("slider_container_animation_duration");
  const { scrollValue, startGhostsCount, endGhostsCount } = state;
  const containerRef = React.useRef<HTMLUListElement | null>(null);
  const nextControlRef = React.useRef<HTMLButtonElement | null>(null);
  const previousControlRef = React.useRef<HTMLButtonElement | null>(null);
  const scrollIdRef = React.useRef<number | null>(null);
  const itemsRef = React.useRef<T.Context["items"]>([]);
  const realItemsRef = React.useRef<T.Context["realItems"]>([]);
  const [itemsCount, setItemsCount] = React.useState(0);
  const sliderId = useId();

  const getCurrentItem = () => {
    const containerEl = containerRef.current;

    if (!containerEl) return;
    return util.getCurrentItem(containerEl, itemsRef.current);
  };

  const scrollToSlide = React.useCallback(
    (slideEl: HTMLElement, options: T.NavigationOptions = {}) => {
      const { delta = 0 } = options;
      const customScrollDuration = isExperiment() ? 350 : undefined;

      if (customScrollDuration) setScrollingState("scrolling");

      const targetX =
        getElementParentOffset(slideEl, containerRef.current!) + delta;
      const result = setElementScroll(containerRef.current!, targetX, {
        ...options,
        duration: customScrollDuration,
      });

      scrollIdRef.current = result?.id || null;

      if (!result?.promise) {
        setScrollingState("idle");
      } else {
        result.promise.then((id) => {
          if (id !== scrollIdRef.current) return;
          setScrollingState("idle");
          scrollIdRef.current = null;
        });
      }
    },
    [isExperiment]
  );

  const navigate = React.useCallback(
    (index: number, options: T.NavigationOptions = {}) => {
      const lastIndex = itemsRef.current.length - 1;
      const nextIndex = Math.max(0, Math.min(index, lastIndex));
      const nextItem = itemsRef.current[nextIndex];

      scrollToSlide(nextItem.el, options);
    },
    [scrollToSlide]
  );

  /*
   * `navigateProgrammatic` resolves nextItem in a different way:
   * users pass realIndex of next slide and we need to exclude ghosts
   */
  const navigateProgrammatic = (
    index: number,
    options: T.NavigationOptions = {}
  ) => {
    const nextItem = (
      infinite
        ? itemsRef.current.slice(startGhostsCount, -Math.abs(endGhostsCount))
        : itemsRef.current
    ).find((item) => item.realIndex === index);

    if (!nextItem) return;
    scrollToSlide(nextItem.el, options);
  };

  const navigateForward = () => {
    const currentItem = getCurrentItem();
    if (!currentItem) return;

    navigate(currentItem.index + 1);
  };

  const navigateBack = () => {
    const currentItem = getCurrentItem();
    if (!currentItem) return;

    navigate(currentItem.index - 1);
  };

  const setSliderState = (nextState: Partial<T.State>) => {
    setState((prev) => ({ ...prev, ...nextState }));
  };

  /**
   * The moment of rendering ghosts in SliderContainer and setting default
   * active slide are torn apart in time — ghosts rendering is delayed.
   * To address that, let's keep previousState and react to startGhostsCount change.
   */
  React.useEffect(() => {
    if (!infinite) return;

    if (state.startGhostsCount !== previousState.startGhostsCount) {
      navigate(defaultActiveIndex + state.startGhostsCount, {
        instant: true,
      });
    }
  }, [state, infinite, previousState, defaultActiveIndex, navigate]);

  /**
   * For non-infinite Slider, when ghosts are not required,
   * and we can just navigate to defaultActiveIndex.
   */
  React.useEffect(() => {
    if (infinite) return;

    navigate(defaultActiveIndex, { instant: true });
  }, [infinite, defaultActiveIndex, navigate]);

  React.useImperativeHandle(ref, () => ({
    navigate: (index: number, options?: T.NavigationOptions) =>
      navigateProgrammatic(index, options),
    navigateBack,
    navigateForward,
  }));

  return (
    <SliderContext.Provider
      value={{
        navigateBack,
        navigateForward,
        navigate,
        containerRef,
        nextControlRef,
        previousControlRef,
        items: itemsRef.current,
        realItems: realItemsRef.current,
        setSliderState,
        scrollingState,
        scrollValue,
        isScrollEnabled,
        infinite: infinite || false,
        startGhostsCount,
        endGhostsCount,
        id: sliderId,
        itemsCount,
        setItemsCount,
      }}
    >
      {children}
    </SliderContext.Provider>
  );
};

const Slider = React.forwardRef(SliderBase) as T.Compound;
Slider.Control = SliderControl;
Slider.Container = SliderContainer;
Slider.Item = SliderItem;

export default Slider;
