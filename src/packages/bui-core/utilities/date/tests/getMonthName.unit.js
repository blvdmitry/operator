import getMonthName from "../getMonthName";
const monthNames = {
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
};
describe("date/getMonthName", () => {
    it("returns month name for the passed date", () => {
        const date = new Date(2020, 0, 1);
        const result = getMonthName(monthNames, date);
        expect(result).toBe("January");
    });
});
