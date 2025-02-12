import getMonthsToShow from "../getMonthsToShow";
describe("date/getMonthsToShow", () => {
    it("returns number of months to display for regular display", () => {
        const result = getMonthsToShow({ monthsToShow: 1 });
        expect(result).toBe(1);
    });
    it("returns number of months to display for vertical display", () => {
        const result = getMonthsToShow({ monthsToShow: 1, vertical: true });
        // Comes from the calculations based on the vertical threshold constant
        expect(result).toBe(5);
    });
});
