declare const isDateDisabled: ({ isoDate, maxDate, minDate, disabledDates, enabledDates, maxSelectionLength, startDate, endDate, }: {
    isoDate: string;
    maxDate?: Date | undefined;
    minDate?: Date | undefined;
    disabledDates?: Date[] | undefined;
    enabledDates?: Date[] | undefined;
    maxSelectionLength?: number | undefined;
    startDate?: Date | null | undefined;
    endDate?: Date | null | undefined;
}) => boolean;
export default isDateDisabled;
