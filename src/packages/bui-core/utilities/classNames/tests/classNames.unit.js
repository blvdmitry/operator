import classNames from "../classNames";
describe("classNames/classNames", () => {
    it("resolves multiple classNames", () => {
        const result = classNames("root", true && "root-true", "string" && "root-string", 2 && "root-2");
        expect(result).toBe("root root-true root-string root-2");
    });
});
