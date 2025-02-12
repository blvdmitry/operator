import getNormalizedDay from "../getNormalizedDay";

describe("date/getNormalizedDay", () => {
  it("returns correct default", () => {
    const date = new Date(2020, 3, 1);
    const result = getNormalizedDay(date);

    expect(result).toBe(2);
  });

  it("returns correct overriddes", () => {
    const date = new Date(2020, 3, 1);

    expect(getNormalizedDay(date, 0)).toBe(3);
    expect(getNormalizedDay(date, 2)).toBe(1);
    expect(getNormalizedDay(date, 3)).toBe(0);
    expect(getNormalizedDay(date, 4)).toBe(6);
    expect(getNormalizedDay(date, 5)).toBe(5);
    expect(getNormalizedDay(date, 6)).toBe(4);
  });

  it("normalises the values larger than week duration", () => {
    const date = new Date(2020, 3, 1);

    expect(getNormalizedDay(date, 10)).toBe(0);
  });
});
