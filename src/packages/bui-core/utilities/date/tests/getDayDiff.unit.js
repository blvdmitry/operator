import getDayDiff from "../getDayDiff";
describe("date/getDayDiff", () => {
    it("returns correct positive diff", () => {
        const dateFrom = new Date(2020, 3, 1);
        const dateTo = new Date(2020, 3, 3);
        const result = getDayDiff(dateFrom, dateTo);
        expect(result).toBe(2);
    });
    it("returns correct negative diff", () => {
        const dateFrom = new Date(2020, 3, 3);
        const dateTo = new Date(2020, 3, 1);
        const result = getDayDiff(dateFrom, dateTo);
        expect(result).toBe(-2);
    });
});
