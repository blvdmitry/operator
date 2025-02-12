import responsiveClassNames from "../responsiveClassNames";
const cssModulesStyles = {
    root: "root",
    "root-true": "root-true",
    "root-false": "root-false",
    "root-primary": "root-primary",
    "root-secondary--m": "root-secondary--m",
    "root-false--m": "root-false--m",
    "root-true--m": "root-true--m",
    "root-2": "root-2",
    "root-3--m": "root-3--m",
};
describe("classNames/responsiveClassNames", () => {
    it("resolves non-responsive value", () => {
        const result = responsiveClassNames(cssModulesStyles, "root", true);
        expect(result).toBe("root-true");
    });
    it("resolves boolean values, true -> false", () => {
        const result = responsiveClassNames(cssModulesStyles, "root", {
            s: true,
            m: false,
        });
        expect(result).toBe("root-true root-false--m");
    });
    it("resolves boolean values, false -> true", () => {
        const result = responsiveClassNames(cssModulesStyles, "root", {
            s: false,
            m: true,
        });
        expect(result).toBe("root-false root-true--m");
    });
    it("resolves number values", () => {
        const result = responsiveClassNames(cssModulesStyles, "root", {
            s: 2,
            m: 3,
        });
        expect(result).toBe("root-2 root-3--m");
    });
    it("resolves string values", () => {
        const result = responsiveClassNames(cssModulesStyles, "root", {
            s: "primary",
            m: "secondary",
        });
        expect(result).toBe("root-primary root-secondary--m");
    });
});
