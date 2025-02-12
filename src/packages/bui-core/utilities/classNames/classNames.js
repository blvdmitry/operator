const classNames = (...args) => {
    return args.reduce((acc, cur) => {
        if (!acc && cur)
            return cur;
        if (cur)
            return `${acc} ${cur}`;
        return acc;
    }, "");
};
export default classNames;
