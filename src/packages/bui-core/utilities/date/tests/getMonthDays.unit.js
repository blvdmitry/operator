import getMonthDays from "../getMonthDays";
describe("date/getMonthDays", () => {
    it("returns month days for the passed date", () => {
        const date = new Date(2020, 0, 1);
        const result = getMonthDays(date, 1);
        expect(result).toMatchSnapshot();
    });
});
