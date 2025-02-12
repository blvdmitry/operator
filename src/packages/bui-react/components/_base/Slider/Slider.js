import React from "react";
import { getElementParentOffset, setElementScroll, } from "@bookingcom/bui-core/utilities/scroll";
import useId from "../../../hooks/useId.js";
import usePrevious from "../../../hooks/usePrevious.js";
import useExperiment from "../../../hooks/useExperiment.js";
import SliderContext from "./SliderContext.js";
import SliderControl from "./SliderControl.js";
import SliderContainer from "./SliderContainer.js";
import SliderItem from "./SliderItem.js";
import * as util from "./Slider.util.js";
const SliderBase = (props, ref) => {
    const [state, setState] = React.useState({
        scrollValue: 0,
        startGhostsCount: 0,
        endGhostsCount: 0,
    });
    const [scrollingState, setScrollingState] = React.useState("idle");
    const previousState = usePrevious({
        ...state,
    });
    const { children, infinite, isScrollEnabled = true, defaultActiveIndex = 0, } = props;
    const isExperiment = useExperiment("slider_container_animation_duration");
    const { scrollValue, startGhostsCount, endGhostsCount } = state;
    const containerRef = React.useRef(null);
    const nextControlRef = React.useRef(null);
    const previousControlRef = React.useRef(null);
    const scrollIdRef = React.useRef(null);
    const itemsRef = React.useRef([]);
    const realItemsRef = React.useRef([]);
    const [itemsCount, setItemsCount] = React.useState(0);
    const sliderId = useId();
    const getCurrentItem = () => {
        const containerEl = containerRef.current;
        if (!containerEl)
            return;
        return util.getCurrentItem(containerEl, itemsRef.current);
    };
    const scrollToSlide = React.useCallback((slideEl, options = {}) => {
        const { delta = 0 } = options;
        const customScrollDuration = isExperiment() ? 350 : undefined;
        if (customScrollDuration)
            setScrollingState("scrolling");
        const targetX = getElementParentOffset(slideEl, containerRef.current) + delta;
        const result = setElementScroll(containerRef.current, targetX, {
            ...options,
            duration: customScrollDuration,
        });
        scrollIdRef.current = result?.id || null;
        if (!result?.promise) {
            setScrollingState("idle");
        }
        else {
            result.promise.then((id) => {
                if (id !== scrollIdRef.current)
                    return;
                setScrollingState("idle");
                scrollIdRef.current = null;
            });
        }
    }, [isExperiment]);
    const navigate = React.useCallback((index, options = {}) => {
        const lastIndex = itemsRef.current.length - 1;
        const nextIndex = Math.max(0, Math.min(index, lastIndex));
        const nextItem = itemsRef.current[nextIndex];
        scrollToSlide(nextItem.el, options);
    }, [scrollToSlide]);
    /*
     * `navigateProgrammatic` resolves nextItem in a different way:
     * users pass realIndex of next slide and we need to exclude ghosts
     */
    const navigateProgrammatic = (index, options = {}) => {
        const nextItem = (infinite
            ? itemsRef.current.slice(startGhostsCount, -Math.abs(endGhostsCount))
            : itemsRef.current).find((item) => item.realIndex === index);
        if (!nextItem)
            return;
        scrollToSlide(nextItem.el, options);
    };
    const navigateForward = () => {
        const currentItem = getCurrentItem();
        if (!currentItem)
            return;
        navigate(currentItem.index + 1);
    };
    const navigateBack = () => {
        const currentItem = getCurrentItem();
        if (!currentItem)
            return;
        navigate(currentItem.index - 1);
    };
    const setSliderState = (nextState) => {
        setState((prev) => ({ ...prev, ...nextState }));
    };
    /**
     * The moment of rendering ghosts in SliderContainer and setting default
     * active slide are torn apart in time — ghosts rendering is delayed.
     * To address that, let's keep previousState and react to startGhostsCount change.
     */
    React.useEffect(() => {
        if (!infinite)
            return;
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
        if (infinite)
            return;
        navigate(defaultActiveIndex, { instant: true });
    }, [infinite, defaultActiveIndex, navigate]);
    React.useImperativeHandle(ref, () => ({
        navigate: (index) => navigateProgrammatic(index),
        navigateBack,
        navigateForward,
    }));
    return (React.createElement(SliderContext.Provider, { value: {
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
        } }, children));
};
const Slider = React.forwardRef(SliderBase);
Slider.Control = SliderControl;
Slider.Container = SliderContainer;
Slider.Item = SliderItem;
export default Slider;
