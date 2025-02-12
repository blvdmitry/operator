import mapResponsiveProps from "../mapResponsiveProps";

describe("responsive/mapResponsiveProps", () => {
  it("maps correctly", () => {
    type Size1 = "small" | "medium" | "large";
    type Size2 = "sm" | "md" | "lg";

    const result = mapResponsiveProps<Size1, Size2>(
      {
        s: "large",
        m: "small",
        xl: "medium",
      },
      {
        small: "sm",
        medium: "md",
        large: "lg",
      }
    );

    expect(result).toMatchObject({
      s: "lg",
      m: "sm",
      xl: "md",
    });
  });
});
