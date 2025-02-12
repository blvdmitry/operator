"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transformAnimations = (theme) => {
    const animations = theme.animations.functional;
    return Object.entries(animations).reduce((acc, [animationName, animationValues]) => {
        const { duration, timingCurve } = animationValues;
        const durationString = `${duration}s`;
        const timingValues = [
            timingCurve.cp1.x,
            timingCurve.cp1.y,
            timingCurve.cp2.x,
            timingCurve.cp2.y,
        ];
        const timingFunctionString = `cubic-bezier(${timingValues.join(", ")})`;
        const result = {
            ...acc,
            [animationName]: {
                duration: durationString,
                timingFunction: timingFunctionString,
            },
        };
        return result;
    }, {});
};
exports.default = transformAnimations;
