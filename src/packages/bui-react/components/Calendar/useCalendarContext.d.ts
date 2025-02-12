declare const useCalendarContext: () => import("./Calendar.types").BaseProps & {
    startDate: Date | null;
    endDate?: Date | null | undefined;
    defaultStartDate?: undefined;
    defaultEndDate?: undefined;
} & import("./Calendar.types").DefaultProps & {
    hoveredDateISO: string | null;
    startDateISO: string | null;
    endDateISO: string | null;
    setHoveredDateISO: (dateISO: string | null) => void;
    isStandaloneMonthView?: boolean | undefined;
};
export default useCalendarContext;
