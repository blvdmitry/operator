import isMaxMonth from "../isMaxMonth";

describe("date/isMaxMonth", () => {
  it("works without maxDate", () => {
    const date = new Date(2020, 0, 1);
    const result = isMaxMonth(date);

    expect(result).toBe(false);
  });

  it("works with maxDate month > date month", () => {
    const date = new Date(2021, 0, 1);
    const maxDate = new Date(2021, 1, 1);
    const result = isMaxMonth(date, maxDate);

    expect(result).toBe(false);
  });

  it("works with minDate month === date month", () => {
    const date = new Date(2021, 1, 10);
    const minDate = new Date(2021, 1, 15);
    const result = isMaxMonth(date, minDate);

    expect(result).toBe(true);
  });

  it("works with maxDate month < date month", () => {
    const date = new Date(2021, 1, 1);
    const maxDate = new Date(2021, 0, 1);
    const result = isMaxMonth(date, maxDate);

    expect(result).toBe(true);
  });

  it("works with maxDate year > date year", () => {
    const date = new Date(2020, 0, 1);
    const maxDate = new Date(2021, 0, 1);
    const result = isMaxMonth(date, maxDate);

    expect(result).toBe(false);
  });

  it("works with maxDate year < date year", () => {
    const date = new Date(2020, 0, 1);
    const maxDate = new Date(2019, 0, 1);
    const result = isMaxMonth(date, maxDate);

    expect(result).toBe(true);
  });
});
