import hasSmoothScroll from "./hasSmoothScroll";
import mirrorScrollLeft from "./mirrorScrollLeft";
// We're using this counter to handle smooth scrolling promise resolving in case user has initiated it multiple times
let scrollId = 0;
export const smoothScrollTo = (el, distance, { duration = 400, offset = 0, direction = "horizontal", } = {}) => {
    const easeOutCubic = (t) => {
        const r = t - 1;
        return r * r * r + 1;
    };
    const scrollAxisProperty = direction === "horizontal" ? "scrollLeft" : "scrollTop";
    const startDistance = el[scrollAxisProperty];
    const difference = distance - startDistance;
    const startTime = performance.now();
    if (distance === startDistance + offset) {
        return { promise: Promise.resolve(), id: scrollId };
    }
    const result = {
        id: scrollId++,
        promise: new Promise((resolve) => {
            const step = () => {
                const progress = (performance.now() - startTime) / duration;
                const amount = easeOutCubic(progress);
                // eslint-disable-next-line no-param-reassign
                el[scrollAxisProperty] = startDistance + amount * difference - offset;
                if (progress < 0.99) {
                    window.requestAnimationFrame(step);
                }
                else {
                    resolve(result.id);
                }
            };
            step();
        }),
    };
    return result;
};
const setElementScroll = (el, scrollValue, options = {
    instant: false,
    direction: "horizontal",
}) => {
    const { instant } = options;
    const denormalizedValue = mirrorScrollLeft(el, scrollValue);
    const supportsSmoothScrolling = hasSmoothScroll();
    if ((!options.duration || options.instant) && supportsSmoothScrolling) {
        el.scrollTo({
            left: denormalizedValue,
            behavior: !instant ? "smooth" : undefined,
        });
        return;
    }
    if (options?.duration !== undefined && !options.instant) {
        return smoothScrollTo(el, denormalizedValue, 
        // Durations less that 100 give unpredictable results
        { duration: Math.max(100, options.duration) });
    }
    /* eslint-disable-next-line no-param-reassign */
    el.scrollLeft = denormalizedValue;
};
export default setElementScroll;
