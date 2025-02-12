import range from "../range";
describe("helpers/range", () => {
    it("range 0 to 5(excluded)", () => {
        const expected = [0, 1, 2, 3, 4];
        const actual = range(0, 5);
        expect(expected).toEqual(actual);
    });
    it("range 5 to 10(excluded)", () => {
        const expected = [5, 6, 7, 8, 9];
        const actual = range(5, 10);
        expect(expected).toEqual(actual);
    });
    it("range 100 to 103(excluded)", () => {
        const expected = [100, 101, 102];
        const actual = range(100, 103);
        expect(expected).toEqual(actual);
    });
});
