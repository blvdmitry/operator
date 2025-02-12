import getNormalizedDay from "./getNormalizedDay";
const getMonthDays = (date, firstWeekDay) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const weeks = [];
    const currentDate = new Date(year, month, 1);
    const firstDay = getNormalizedDay(currentDate, firstWeekDay);
    if (firstDay !== 0)
        weeks.push(new Array(firstDay).fill({}));
    while (month === currentDate.getMonth()) {
        const day = getNormalizedDay(currentDate, firstWeekDay);
        if (day === 0 || !weeks.length)
            weeks.push([]);
        weeks[weeks.length - 1].push({ date: new Date(currentDate) });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    const lastDay = getNormalizedDay(currentDate, firstWeekDay);
    if (lastDay !== 0) {
        weeks[weeks.length - 1].push(...new Array(7 - lastDay).fill({}));
    }
    return weeks;
};
export default getMonthDays;
