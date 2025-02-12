import React from "react";
import { screen, within } from "@testing-library/react";
import { setup } from "tools/jest";
import Calendar from "components/Calendar";

const startDateNumber = "04";
const endDateNumber = "15";
const dateMonth = "05";
const dateYear = "2022";

const fixtures = {
  baseDate: new Date(`${dateYear}-${dateMonth}-${startDateNumber}`),
  startDate: new Date(`${dateYear}-${dateMonth}-${startDateNumber}`),
  endDate: new Date(`${dateYear}-${dateMonth}-${endDateNumber}`),
  dayNames: {
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
    sunday: "Sun",
  },
  monthNames: {
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
  },
  previousAriaLabel: "Previous month",
  nextAriaLabel: "Next month",
};

describe("Calendar", () => {
  test("renders calendar", () => {
    setup(
      <Calendar
        baseDate={fixtures.baseDate}
        monthNames={fixtures.monthNames}
        dayNames={fixtures.dayNames}
        previousAriaLabel={fixtures.previousAriaLabel}
        nextAriaLabel={fixtures.nextAriaLabel}
      />
    );

    const monthHeaderEl = screen.getByText(
      `${fixtures.monthNames.may} ${fixtures.baseDate.getFullYear()}`
    );
    const previousMonthControlEl = screen.getByLabelText(
      fixtures.previousAriaLabel
    );
    const nextMonthControlEl = screen.getByLabelText(fixtures.nextAriaLabel);

    expect(monthHeaderEl).toBeInTheDocument();
    expect(previousMonthControlEl).toBeInTheDocument();
    expect(nextMonthControlEl).toBeInTheDocument();

    Object.values(fixtures.dayNames).forEach((dayName) => {
      const weekdayEl = screen.getByText(dayName);
      expect(weekdayEl).toBeInTheDocument();
    });

    Array.from(Array(10).keys()).forEach((index) => {
      const dayEl = screen.getByText(index + 1);

      expect(dayEl).toBeInTheDocument();
    });

    const actionEls = screen.getAllByRole("checkbox");

    expect(actionEls).toHaveLength(31);

    actionEls.forEach((actionEl, index) => {
      const dateNumber = index + 1;
      const textEl = within(actionEl).getByText(dateNumber);

      expect(actionEl).toHaveAttribute(
        "aria-label",
        `${dateNumber} ${
          fixtures.monthNames.may
        } ${fixtures.baseDate.getFullYear()}`
      );
      expect(actionEl).toHaveAttribute("aria-checked", "false");
      expect(textEl).toBeInTheDocument();
    });
  });

  test("works as uncontrolled", async () => {
    const handleDateChange = jest.fn();
    const { user } = setup(
      <Calendar
        baseDate={fixtures.baseDate}
        defaultStartDate={fixtures.startDate}
        defaultEndDate={fixtures.endDate}
        monthNames={fixtures.monthNames}
        dayNames={fixtures.dayNames}
        previousAriaLabel={fixtures.previousAriaLabel}
        nextAriaLabel={fixtures.nextAriaLabel}
        onDateChange={handleDateChange}
      />
    );

    const actionEls = screen.getAllByRole("checkbox");
    const startActionEl = actionEls[Number(startDateNumber) - 1];
    const endActionEl = actionEls[Number(endDateNumber) - 1];

    expect(startActionEl).toHaveAttribute("aria-checked", "true");
    expect(endActionEl).toHaveAttribute("aria-checked", "true");

    const updatedStartDate = new Date(`${dateYear}-${dateMonth}-01`);
    const updatedEndDate = new Date(`${dateYear}-${dateMonth}-03`);

    await user.click(actionEls[0]);

    expect(handleDateChange).toBeCalledTimes(1);
    expect(handleDateChange).toBeCalledWith({
      startDate: updatedStartDate,
      // End date resets because we had the range already selected
      endDate: null,
      changedDate: updatedStartDate,
    });

    await user.click(actionEls[2]);

    expect(handleDateChange).toBeCalledTimes(2);
    expect(handleDateChange).toBeCalledWith({
      startDate: updatedStartDate,
      endDate: updatedEndDate,
      changedDate: updatedEndDate,
    });

    const updatedStartActionEl = actionEls[0];
    const updatedEndActionEl = actionEls[2];

    expect(startActionEl).toHaveAttribute("aria-checked", "false");
    expect(endActionEl).toHaveAttribute("aria-checked", "false");
    expect(updatedStartActionEl).toHaveAttribute("aria-checked", "true");
    expect(updatedEndActionEl).toHaveAttribute("aria-checked", "true");
  });

  test("works as controlled", async () => {
    const handleDateChange = jest.fn();
    const { user } = setup(
      <Calendar
        baseDate={fixtures.baseDate}
        startDate={fixtures.startDate}
        endDate={fixtures.endDate}
        monthNames={fixtures.monthNames}
        dayNames={fixtures.dayNames}
        previousAriaLabel={fixtures.previousAriaLabel}
        nextAriaLabel={fixtures.nextAriaLabel}
        onDateChange={handleDateChange}
      />
    );

    const actionEls = screen.getAllByRole("checkbox");
    const startActionEl = actionEls[Number(startDateNumber) - 1];
    const endActionEl = actionEls[Number(endDateNumber) - 1];

    expect(startActionEl).toHaveAttribute("aria-checked", "true");
    expect(endActionEl).toHaveAttribute("aria-checked", "true");

    const firstClickDate = new Date(`${dateYear}-${dateMonth}-01`);
    const secondClickDate = new Date(`${dateYear}-${dateMonth}-03`);

    await user.click(actionEls[0]);
    expect(handleDateChange).toBeCalledTimes(1);
    expect(handleDateChange).toBeCalledWith({
      startDate: firstClickDate,
      // End date resets because we had the range already selected
      endDate: null,
      changedDate: firstClickDate,
    });
    await user.click(actionEls[2]);
    expect(handleDateChange).toBeCalledTimes(2);
    expect(handleDateChange).toBeCalledWith({
      startDate: secondClickDate,
      // Selection hasn't changed since last click because of controlled mode
      // Clicking second time changes the start date again
      endDate: null,
      changedDate: secondClickDate,
    });

    const updatedStartActionEl = actionEls[0];
    const updatedEndActionEl = actionEls[2];

    expect(startActionEl).toHaveAttribute("aria-checked", "true");
    expect(endActionEl).toHaveAttribute("aria-checked", "true");
    expect(updatedStartActionEl).toHaveAttribute("aria-checked", "false");
    expect(updatedEndActionEl).toHaveAttribute("aria-checked", "false");
  });

  test("works as uncontrolled with a single date", async () => {
    const handleDateChange = jest.fn();
    const { user } = setup(
      <Calendar
        singleDate
        baseDate={fixtures.baseDate}
        defaultStartDate={fixtures.startDate}
        monthNames={fixtures.monthNames}
        dayNames={fixtures.dayNames}
        previousAriaLabel={fixtures.previousAriaLabel}
        nextAriaLabel={fixtures.nextAriaLabel}
        onDateChange={handleDateChange}
      />
    );

    const actionEls = screen.getAllByRole("checkbox");
    const startActionEl = actionEls[Number(startDateNumber) - 1];

    expect(startActionEl).toHaveAttribute("aria-checked", "true");

    const updatedStartDate = new Date(`${dateYear}-${dateMonth}-01`);

    await user.click(actionEls[0]);
    expect(handleDateChange).toBeCalledTimes(1);
    expect(handleDateChange).toBeCalledWith({
      startDate: updatedStartDate,
      endDate: updatedStartDate,
      changedDate: updatedStartDate,
    });

    const updatedStartActionEl = actionEls[0];

    expect(startActionEl).toHaveAttribute("aria-checked", "false");
    expect(updatedStartActionEl).toHaveAttribute("aria-checked", "true");
  });

  test("ignores disabled dates", async () => {
    const handleDateChange = jest.fn();
    const { user } = setup(
      <Calendar
        baseDate={fixtures.baseDate}
        minDate={fixtures.startDate}
        maxDate={fixtures.endDate}
        maxSelectionLength={3}
        monthNames={fixtures.monthNames}
        dayNames={fixtures.dayNames}
        previousAriaLabel={fixtures.previousAriaLabel}
        nextAriaLabel={fixtures.nextAriaLabel}
        onDateChange={handleDateChange}
      />
    );

    const actionEls = screen.getAllByRole("checkbox");
    const startIndex = Number(startDateNumber) - 1;
    const endIndex = Number(endDateNumber) - 1;
    const minClickEl = actionEls[startIndex - 1];
    const maxClickEl = actionEls[endIndex + 1];
    const validClickEl = actionEls[startIndex];
    const outOfRangeClickEl = actionEls[startIndex + 4];

    await user.click(minClickEl);
    expect(minClickEl).toHaveAttribute("aria-checked", "false");
    expect(handleDateChange).toBeCalledTimes(0);

    await user.click(maxClickEl);
    expect(maxClickEl).toHaveAttribute("aria-checked", "false");
    expect(handleDateChange).toBeCalledTimes(0);

    await user.click(validClickEl);
    expect(validClickEl).toHaveAttribute("aria-checked", "true");
    expect(handleDateChange).toBeCalledTimes(1);

    await user.click(outOfRangeClickEl);
    expect(outOfRangeClickEl).toHaveAttribute("aria-checked", "false");
    expect(handleDateChange).toBeCalledTimes(1);
  });

  test("renders two months", () => {
    setup(
      <Calendar
        mode="double"
        baseDate={fixtures.baseDate}
        monthNames={fixtures.monthNames}
        dayNames={fixtures.dayNames}
        previousAriaLabel={fixtures.previousAriaLabel}
        nextAriaLabel={fixtures.nextAriaLabel}
      />
    );

    const cellEls = screen.getAllByRole("gridcell");

    expect(cellEls).toHaveLength(61);
  });

  test("renders attachments", () => {});

  test("applies classNames and attributes", () => {
    const { output } = setup(
      <Calendar
        className="test-classname"
        monthLabelClassName="test-id"
        dayClassName="test-day-classname"
        selectedDayClassName="test-selected-day-classname"
        disabledDayClassName="test-disabled-day-classname"
        attributes={{ id: "test-id" }}
        baseDate={fixtures.baseDate}
        startDate={fixtures.startDate}
        endDate={fixtures.endDate}
        minDate={fixtures.startDate}
        monthNames={fixtures.monthNames}
        dayNames={fixtures.dayNames}
        previousAriaLabel={fixtures.previousAriaLabel}
        nextAriaLabel={fixtures.nextAriaLabel}
      />
    );

    const dayEls = output.container.querySelectorAll(".test-day-classname");
    const selectedDayEls = output.container.querySelectorAll(
      ".test-selected-day-classname"
    );
    const disabledDayEls = output.container.querySelectorAll(
      ".test-disabled-day-classname"
    );

    expect(output.container.firstChild).toHaveClass("test-classname");
    expect(output.container.firstChild).toHaveAttribute("id", "test-id");
    expect(dayEls).toHaveLength(31);
    expect(selectedDayEls).toHaveLength(2);
    expect(disabledDayEls).toHaveLength(3);
  });

  test("calls onBaseMonthChange handler on month change", async () => {
    const onBaseMonthChange = jest.fn();

    const { user } = setup(
      <Calendar
        monthLabelClassName="test-id"
        attributes={{ id: "test-id" }}
        baseDate={fixtures.baseDate}
        startDate={fixtures.startDate}
        endDate={fixtures.endDate}
        monthNames={fixtures.monthNames}
        dayNames={fixtures.dayNames}
        previousAriaLabel={fixtures.previousAriaLabel}
        nextAriaLabel={fixtures.nextAriaLabel}
        onBaseMonthChange={onBaseMonthChange}
      />
    );

    const previousMonthControlEl = screen.getByLabelText(
      fixtures.previousAriaLabel
    );
    const nextMonthControlEl = screen.getByLabelText(fixtures.nextAriaLabel);

    await user.click(nextMonthControlEl);
    expect(onBaseMonthChange).toBeCalledTimes(1);
    await user.click(previousMonthControlEl);
    expect(onBaseMonthChange).toBeCalledTimes(2);
  });

  test("calls onDayHover handler on hovering a day", async () => {
    const onDayHover = jest.fn();

    const { user } = setup(
      <Calendar
        baseDate={fixtures.baseDate}
        monthNames={fixtures.monthNames}
        dayNames={fixtures.dayNames}
        previousAriaLabel={fixtures.previousAriaLabel}
        nextAriaLabel={fixtures.nextAriaLabel}
        onDayHover={onDayHover}
      />
    );

    const dayEl = screen.getByText(endDateNumber);

    await user.hover(dayEl);
    expect(onDayHover).toBeCalledTimes(1);
  });

  test("renders Calendar.Month", () => {
    setup(
      <Calendar.Month
        month={parseInt(dateMonth, 10) - 1}
        year={parseInt(dateYear, 10)}
        firstWeekDay={1}
        monthNames={fixtures.monthNames}
        dayNames={fixtures.dayNames}
      />
    );

    const monthHeaderEl = screen.getByText(
      `${fixtures.monthNames.may} ${fixtures.baseDate.getFullYear()}`
    );

    expect(monthHeaderEl).toBeInTheDocument();

    Object.values(fixtures.dayNames).forEach((dayName) => {
      const weekdayEl = screen.getByText(dayName);
      expect(weekdayEl).toBeInTheDocument();
    });

    Array.from(Array(10).keys()).forEach((index) => {
      const dayEl = screen.getByText(index + 1);

      expect(dayEl).toBeInTheDocument();
    });

    const actionEls = screen.getAllByRole("checkbox");

    expect(actionEls).toHaveLength(31);

    actionEls.forEach((actionEl, index) => {
      const dateNumber = index + 1;
      const textEl = within(actionEl).getByText(dateNumber);

      expect(actionEl).toHaveAttribute(
        "aria-label",
        `${dateNumber} ${
          fixtures.monthNames.may
        } ${fixtures.baseDate.getFullYear()}`
      );
      expect(actionEl).toHaveAttribute("aria-checked", "false");
      expect(textEl).toBeInTheDocument();
    });
  });
});
