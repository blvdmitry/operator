import getBaseDate from "../getBaseDate";

describe("date/getBaseDate", () => {
  it("gets the current date", () => {
    const baseDate = getBaseDate({});
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(1);

    expect(baseDate.date.toString()).toBe(today.toString());
  });

  it("respects the passed baseDate, ignores max and min dates", () => {
    const baseDate = getBaseDate({
      baseDate: new Date(2020, 10, 1),
      maxDate: new Date(2020, 9, 1),
      minDate: new Date(2021, 1, 1),
    });
    const expectedDate = new Date(2020, 10, 1);
    expectedDate.setHours(0, 0, 0, 0);

    expect(baseDate.date.toString()).toBe(expectedDate.toString());
  });

  it("respects the maxDate if baseDate is not passed", () => {
    const baseDate = getBaseDate({ maxDate: new Date(2020, 9, 1) });
    const expectedDate = new Date(2020, 9, 1);
    expectedDate.setHours(0, 0, 0, 0);

    expect(baseDate.date.toString()).toBe(expectedDate.toString());
  });

  it("respects the maxDate if baseDate is not passed and monthsToShow is passed", () => {
    const baseDate = getBaseDate({
      maxDate: new Date(2020, 9, 1),
      monthsToShow: 2,
    });
    const expectedDate = new Date(2020, 8, 1);
    expectedDate.setHours(0, 0, 0, 0);

    expect(baseDate.date.toString()).toBe(expectedDate.toString());
  });

  it("respects the minDate if baseDate is not passed", () => {
    const nextYear = new Date().getFullYear() + 1;
    const baseDate = getBaseDate({ minDate: new Date(nextYear, 1, 1) });
    const expectedDate = new Date(nextYear, 1, 1);
    expectedDate.setHours(0, 0, 0, 0);

    expect(baseDate.date.toString()).toBe(expectedDate.toString());
  });

  it("respects the vertical flag", () => {
    const baseDate = getBaseDate({
      baseDate: new Date(2020, 10, 1),
      vertical: true,
    });
    const expectedDate = new Date(2020, 8, 1);
    expectedDate.setHours(0, 0, 0, 0);

    expect(baseDate.date.toString()).toBe(expectedDate.toString());
  });

  it("respects the vertical flag without baseDate and with minDate", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2020-08-01"));

    const baseDate = getBaseDate({
      minDate: new Date("2020-08-10"),
      vertical: true,
    });

    // Vertical diff adds 2 months from the past to enable scrolling
    // TODO: Revert this change after refactoring the calendar logic
    // https://gitlab.booking.com/design-systems/bui/bui-web/-/merge_requests/695/diffs#10f0956c0c9b2d515e116145088a40a24137741b
    const expectedDate = new Date("2020-06-01");
    expectedDate.setHours(0, 0, 0, 0);

    expect(baseDate.date.toString()).toBe(expectedDate.toString());
    jest.useRealTimers();
  });
});
