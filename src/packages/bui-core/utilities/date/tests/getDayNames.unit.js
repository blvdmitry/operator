import getDayNames from "../getDayNames";
const dayNames = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
};
describe("date/getDayNames", () => {
    it("returns day names in regular order", () => {
        const result = getDayNames(dayNames, 1);
        expect(result).toStrictEqual([
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ]);
    });
    it("returns day names in shifted order", () => {
        const result = getDayNames(dayNames, 3);
        expect(result).toStrictEqual([
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
        ]);
    });
});
