import getMonthNames from "../getMonthNames";
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
describe("date/getMonthNames", () => {
    it("returns month names as array", () => {
        const result = getMonthNames(monthNames);
        expect(result).toStrictEqual([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]);
    });
});
