declare const useCalendarDay: (date: Date) => {
    handleMouseIn: () => void;
    handleMouseOut: () => false | void;
    handleClick: () => void;
    dateISO: string;
    isToday: boolean;
    isInRange: boolean;
    isSelected: boolean;
    isSelectionStart: boolean;
    isSelectionEnd: boolean | undefined;
    isDisabled: boolean;
    accessibilityHint: string | undefined;
    className: string;
};
export default useCalendarDay;
