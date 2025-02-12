import applyClassName from "../applyClassName";
describe("classNames/applyClassName", () => {
    describe("Default viewport", () => {
        it("applies true className", () => {
            const result = applyClassName("test", true);
            expect(result).toBe("test-true");
        });
        it("applies false className", () => {
            const result = applyClassName("test", false);
            expect(result).toBe("test-false");
        });
        it("applies string className", () => {
            const result = applyClassName("test", "primary");
            expect(result).toBe("test-primary");
        });
        it("applies number className", () => {
            const result = applyClassName("test", 2);
            expect(result).toBe("test-2");
        });
        it("doesn't apply undefined className", () => {
            const result = applyClassName("test", undefined);
            expect(result).toBe(null);
        });
    });
    describe("Custom viewport", () => {
        it("applies true className", () => {
            const result = applyClassName("test", true, { viewport: "m" });
            expect(result).toBe("test-true--m");
        });
        it("applies false className", () => {
            const result = applyClassName("test", false, { viewport: "m" });
            expect(result).toBe("test-false--m");
        });
        it("applies string className", () => {
            const result = applyClassName("test", "primary", { viewport: "m" });
            expect(result).toBe("test-primary--m");
        });
        it("applies number className", () => {
            const result = applyClassName("test", 2, { viewport: "m" });
            expect(result).toBe("test-2--m");
        });
        it("doesn't apply undefined className", () => {
            const result = applyClassName("test", undefined, { viewport: "m" });
            expect(result).toBe(null);
        });
    });
});
