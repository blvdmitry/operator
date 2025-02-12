import getMonthDiff from "../getMonthDiff";
describe("date/getMonthDiff", () => {
    it("returns correct positive diff", () => {
        const dateFrom = new Date(2020, 1, 1);
        const dateTo = new Date(2020, 3, 1);
        const result = getMonthDiff(dateFrom, dateTo);
        expect(result).toBe(2);
    });
    it("returns correct negative diff", () => {
        const dateFrom = new Date(2020, 3, 1);
        const dateTo = new Date(2020, 1, 1);
        const result = getMonthDiff(dateFrom, dateTo);
        expect(result).toBe(-2);
    });
});
