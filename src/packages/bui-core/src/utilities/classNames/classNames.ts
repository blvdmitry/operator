import type { ClassName } from "./types";

const classNames = (...args: ClassName[]): string => {
  return args.reduce<string>((acc, cur) => {
    if (!acc && cur) return cur;
    if (cur) return `${acc} ${cur}`;
    return acc;
  }, "");
};

export default classNames;
