import toKebabCase from "../toKebabCase";
describe("helpers/toKebabCase", () => {
    describe("returns kebab-case", () => {
        test("if input is camel case", () => {
            expect(toKebabCase("ariaLabel")).toBe("aria-label");
        });
        test("if input is pascal case", () => {
            expect(toKebabCase("AriaLabel")).toBe("aria-label");
        });
        test("if input is kebab case", () => {
            expect(toKebabCase("aria-label")).toBe("aria-label");
        });
    });
    describe("returns empty string", () => {
        test("if there is no input", () => {
            expect(toKebabCase()).toBe("");
        });
    });
});
