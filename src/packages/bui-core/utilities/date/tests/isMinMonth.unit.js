import isMinMonth from "../isMinMonth";
describe("date/isMinMonth", () => {
    it("works without minDate", () => {
        const date = new Date(2020, 0, 1);
        const result = isMinMonth(date);
        expect(result).toBe(false);
    });
    it("works with minDate month > date month", () => {
        const date = new Date(2021, 0, 1);
        const minDate = new Date(2021, 1, 1);
        const result = isMinMonth(date, minDate);
        expect(result).toBe(true);
    });
    it("works with minDate month < date month", () => {
        const date = new Date(2021, 1, 1);
        const minDate = new Date(2021, 0, 1);
        const result = isMinMonth(date, minDate);
        expect(result).toBe(false);
    });
    it("works with minDate month === date month", () => {
        const date = new Date(2021, 1, 15);
        const minDate = new Date(2021, 1, 10);
        const result = isMinMonth(date, minDate);
        expect(result).toBe(true);
    });
    it("works with minDate year > date year", () => {
        const date = new Date(2020, 0, 1);
        const minDate = new Date(2021, 0, 1);
        const result = isMinMonth(date, minDate);
        expect(result).toBe(true);
    });
    it("works with minDate year < date year", () => {
        const date = new Date(2020, 0, 1);
        const minDate = new Date(2019, 0, 1);
        const result = isMinMonth(date, minDate);
        expect(result).toBe(false);
    });
});
