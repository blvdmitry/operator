import isDateDisabled from "../isDateDisabled";
describe("date/isDateDisabled", () => {
    it("checks if date is disabled based on the maxDate", () => {
        const disabledResult = isDateDisabled({
            isoDate: "2020-01-01",
            maxDate: new Date(2019, 0, 1),
        });
        const enabledResult = isDateDisabled({
            isoDate: "2020-01-01",
            maxDate: new Date(2021, 0, 1),
        });
        expect(disabledResult).toBe(true);
        expect(enabledResult).toBe(false);
    });
    it("checks if date is disabled based on the minDate", () => {
        const enabledResult = isDateDisabled({
            isoDate: "2020-01-01",
            minDate: new Date(2019, 0, 1),
        });
        const disabledResult = isDateDisabled({
            isoDate: "2020-01-01",
            minDate: new Date(2021, 0, 1),
        });
        expect(disabledResult).toBe(true);
        expect(enabledResult).toBe(false);
    });
    it("checks if date is disabled based on the disabledDates", () => {
        const disabledResult = isDateDisabled({
            isoDate: "2020-01-01",
            disabledDates: [new Date(2020, 0, 1)],
        });
        const enabledResult = isDateDisabled({
            isoDate: "2020-01-01",
            disabledDates: [new Date(2020, 0, 2)],
        });
        expect(disabledResult).toBe(true);
        expect(enabledResult).toBe(false);
    });
    it("checks if date is disabled based on the enabledDates", () => {
        const enabledResult = isDateDisabled({
            isoDate: "2020-01-01",
            enabledDates: [new Date(2020, 0, 1)],
        });
        const disabledResult = isDateDisabled({
            isoDate: "2020-01-01",
            enabledDates: [new Date(2020, 0, 2)],
        });
        expect(disabledResult).toBe(true);
        expect(enabledResult).toBe(false);
    });
});
