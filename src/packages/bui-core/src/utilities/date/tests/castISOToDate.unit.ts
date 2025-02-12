import castISOToDate from "../castISOToDate";

describe("date/castISOToDate", () => {
  it("converts the date correctly", () => {
    const date = new Date(2020, 0, 1).toString();
    const result = castISOToDate("2020-01-01").toString();

    expect(result).toBe(date);
  });
});
