import changeDate from "../changeDate";
describe("date/changeDate", () => {
    it("changes day to the passed positive value", () => {
        const date = new Date(2020, 0, 1);
        const expectedDate = new Date(2020, 0, 2);
        const updatedDate = changeDate(date, 1);
        expect(updatedDate.toString()).toBe(expectedDate.toString());
    });
    it("changes day to the passed negative value", () => {
        const date = new Date(2020, 0, 1);
        const expectedDate = new Date(2019, 11, 31);
        const updatedDate = changeDate(date, -1);
        expect(updatedDate.toString()).toBe(expectedDate.toString());
    });
});
