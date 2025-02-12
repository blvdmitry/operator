import getPositionCompensation from "./getPositionCompensation";
import { SCREEN_OFFSET } from "./constants";
import centerBySize from "./centerBySize";
import isScreenSmall from "../helpers/isScreenSmall";
const rtlMap = {
    "start-top": "end-top",
    start: "end",
    "start-bottom": "end-bottom",
    "end-top": "start-top",
    end: "start",
    "end-bottom": "start-bottom",
    "top-start": "top-end",
    "top-end": "top-start",
    "bottom-end": "bottom-start",
    "bottom-start": "bottom-end",
};
/**
 * Calculate styles for the current position
 */
const calculatePosition = (originBounds, targetBounds, options) => {
    const { position: passedPosition, rtl, mobileFallback, zIndex, relative, originEl, arrowEl, } = options;
    const compensation = getPositionCompensation(passedPosition, originEl, arrowEl || null, rtl);
    let left = 0;
    let top = 0;
    const originLeft = relative ? 0 : originBounds.left;
    const originTop = relative ? 0 : originBounds.top;
    let position = passedPosition;
    if (rtl)
        position = rtlMap[position] || position;
    switch (position) {
        case "bottom":
        case "top":
            left = centerBySize(originBounds.width, targetBounds.width) + originLeft;
            break;
        case "start-top":
        case "start":
        case "start-bottom":
            left = originLeft - targetBounds.width;
            break;
        case "end-top":
        case "end":
        case "end-bottom":
            left = originLeft + originBounds.width;
            break;
        case "top-start":
        case "bottom-start":
        case "bottom-stretch":
            left = originLeft;
            break;
        case "top-end":
        case "bottom-end":
            left = originLeft + originBounds.width - targetBounds.width;
            break;
        default:
            break;
    }
    switch (position) {
        case "top-start":
        case "top":
        case "top-end":
            top = originTop - targetBounds.height;
            break;
        case "bottom-start":
        case "bottom":
        case "bottom-end":
        case "bottom-stretch":
            top = originTop + originBounds.height;
            break;
        case "start-top":
        case "end-top":
            top = originTop;
            break;
        case "start-bottom":
        case "end-bottom":
            top = originTop + originBounds.height - targetBounds.height;
            break;
        case "start":
        case "end":
            top = centerBySize(originBounds.height, targetBounds.height) + originTop;
            break;
        default:
            break;
    }
    let scrollTop = 0;
    let scrollLeft = 0;
    if (!relative) {
        if (options.container === document.body) {
            // In case body is a container,
            // it's still possible for either html or body be the scrollview
            // so we need to additionally check which is actual scrollview
            const style = window.getComputedStyle(document.body);
            const overflowY = style?.overflowY;
            const overflowX = style?.overflowX;
            const isScrollable = overflowY?.includes("scroll") || overflowX?.includes("scroll");
            const element = isScrollable ? document.body : document.documentElement;
            scrollTop = element.scrollTop;
            scrollLeft = element.scrollLeft;
        }
        else {
            scrollTop = options.container.scrollTop;
            scrollLeft = options.container.scrollLeft;
        }
    }
    top = Math.round(top + scrollTop + (compensation?.y || 0));
    left = Math.round(left + scrollLeft + (compensation?.x || 0));
    const containerWidth = options.container.clientWidth;
    let widthStyle = Math.ceil(targetBounds.width);
    const height = Math.ceil(targetBounds.height);
    const isFallback = mobileFallback &&
        isScreenSmall() &&
        (targetBounds.left < SCREEN_OFFSET ||
            targetBounds.right > containerWidth - SCREEN_OFFSET);
    if (position === "bottom-stretch") {
        widthStyle = originBounds.width;
    }
    else if (isFallback) {
        left = SCREEN_OFFSET - (relative ? originBounds.left : 0);
        widthStyle = containerWidth - SCREEN_OFFSET * 2;
    }
    const styles = {
        left,
        top,
        width: widthStyle,
        height,
        zIndex: zIndex,
    };
    return {
        styles,
        position,
        bounds: {
            left: styles.left + (relative ? originBounds.left : 0),
            top: styles.top + (relative ? originBounds.top : 0),
            width: styles.width,
            height: styles.height,
        },
    };
};
export default calculatePosition;
