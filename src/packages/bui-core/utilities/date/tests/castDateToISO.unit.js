import castDateToISO from "../castDateToISO";
describe("date/castDateToISO", () => {
    it("converts the date correctly", () => {
        const date = new Date(2020, 0, 1);
        const result = castDateToISO(date);
        expect(result).toBe("2020-01-01");
    });
});
