import zeroify from "../zeroify";
describe("helpers/zeroify", () => {
    it("zeroify x <= 9", () => {
        expect(zeroify(0)).toEqual("00");
        expect(zeroify(5)).toEqual("05");
        expect(zeroify(9)).toEqual("09");
    });
    it("zeroify x > 9", () => {
        expect(zeroify(10)).toEqual("10");
        expect(zeroify(15)).toEqual("15");
        expect(zeroify(100)).toEqual("100");
        expect(zeroify(99999)).toEqual("99999");
    });
    it("zeroify x < 0", () => {
        expect(zeroify(-1)).toEqual("-1");
        expect(zeroify(-5)).toEqual("-5");
        expect(zeroify(-9)).toEqual("-9");
        expect(zeroify(-10)).toEqual("-10");
        expect(zeroify(-1000)).toEqual("-1000");
    });
});
