import changeMonth from "../changeMonth";

describe("date/changeMonth", () => {
  it("changes month to the passed positive value", () => {
    const date = new Date(2020, 0, 1);
    const expectedDate = new Date(2020, 1, 1);
    const updatedDate = changeMonth(date, 1);

    expect(updatedDate.toString()).toBe(expectedDate.toString());
  });

  it("changes month to the passed negative value", () => {
    const date = new Date(2020, 0, 1);
    const expectedDate = new Date(2019, 11, 1);
    const updatedDate = changeMonth(date, -1);

    expect(updatedDate.toString()).toBe(expectedDate.toString());
  });
});
