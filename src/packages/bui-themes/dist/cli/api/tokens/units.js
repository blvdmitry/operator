"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const transformUnits = (theme) => {
    const lineHeightUnitPrefix = "bui_line_height";
    const iconHeightUnitPrefix = "bui_icon_height";
    const units = (0, helpers_1.flattenTokenGroups)(theme.units.functional);
    // add 'px' to each value in units
    const resolvedUnits = Object.entries(units).reduce((unitsAcc, [unitName, unitByMediaSize]) => {
        // remove line_height and icon_height tokens from units
        if (unitName.includes(lineHeightUnitPrefix) ||
            unitName.includes(iconHeightUnitPrefix)) {
            return unitsAcc;
        }
        const newUnitValue = Object.entries(unitByMediaSize).reduce((unitByMediaSizeAcc, [mediaSize, value]) => ({
            ...unitByMediaSizeAcc,
            [mediaSize]: `${value}px`,
        }), {});
        return {
            ...unitsAcc,
            [unitName]: newUnitValue,
        };
    }, {});
    return (0, helpers_1.getTokensByViewport)(resolvedUnits);
};
exports.default = transformUnits;
