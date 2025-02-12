declare const getBaseDate: ({ baseDate, vertical, minDate, maxDate, monthsToShow, }: {
    baseDate?: Date | undefined;
    vertical?: boolean | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    monthsToShow?: number | undefined;
}) => {
    date: Date;
    diff: number;
};
export default getBaseDate;
