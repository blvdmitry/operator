import responsiveStyles from "../responsiveStyles";
const cssVariable = "component";
const cssProperty = "property";
const formatValue = (val) => `calc(${val} / 2)`;
const fixtures = {
    responsiveValue: {
        s: "auto",
        m: "100%",
        l: "100vw",
        xl: "100vh",
    },
};
describe("styles/responsiveStyles", () => {
    it("resolves non-responsive value", () => {
        const result = responsiveStyles("100%", cssVariable, cssProperty);
        expect(result).toStrictEqual({
            [`--bui_${cssVariable}_${cssProperty}--s`]: "100%",
        });
    });
    it("resolves responsive value", () => {
        const result = responsiveStyles(fixtures.responsiveValue, cssVariable, cssProperty);
        expect(result).toMatchSnapshot();
    });
    it("resolves responsive value with formatValue function", () => {
        const result = responsiveStyles(fixtures.responsiveValue, cssVariable, cssProperty, formatValue);
        expect(result).toMatchSnapshot();
    });
});
