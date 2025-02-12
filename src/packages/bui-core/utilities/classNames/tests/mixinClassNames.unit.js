import mixinClassNames from "../mixinClassNames";
describe("classNames/mixinClassNames", () => {
    it("resolves mixin", () => {
        const result = mixinClassNames({
            height: {
                s: "100px",
                l: "500px",
            },
            position: "relative",
            insetBlockStart: 20,
            insetInlineEnd: 0,
            zIndex: {
                s: 0,
                l: 2,
            },
        });
        expect(result).toMatchSnapshot();
    });
});
