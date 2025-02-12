import mixinStyles from "../mixinStyles";

describe("styles/mixinStyles", () => {
  it("resolves mixin", () => {
    const result = mixinStyles({
      height: {
        s: 4,
        l: 8,
      },
      position: "relative",
      insetBlockStart: 20,
    });

    expect(result).toMatchSnapshot();
  });
});
