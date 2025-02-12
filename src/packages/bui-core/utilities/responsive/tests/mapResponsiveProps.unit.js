import mapResponsiveProps from "../mapResponsiveProps";
describe("responsive/mapResponsiveProps", () => {
    it("maps correctly", () => {
        const result = mapResponsiveProps({
            s: "large",
            m: "small",
            xl: "medium",
        }, {
            small: "sm",
            medium: "md",
            large: "lg",
        });
        expect(result).toMatchObject({
            s: "lg",
            m: "sm",
            xl: "md",
        });
    });
});
