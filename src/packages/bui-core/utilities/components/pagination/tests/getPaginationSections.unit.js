import { getPaginationSections } from "../index";
const consequetiveArrayChecker = (section, sectionIndex, sectionsArray) => {
    return section.every((page, index, pagesArray) => {
        if (index > 0) {
            return page - 1 === pagesArray[index - 1];
        }
        return sectionIndex > 0
            ? page - 3 === [...sectionsArray[sectionIndex - 1]].pop()
            : true;
    });
};
describe("utilities/components/pagination", () => {
    describe("getPaginationSections", () => {
        test("desktop head & tail logic", () => {
            const noHeadAndTailSections = getPaginationSections(1, 11, false);
            expect(noHeadAndTailSections.length).toBe(1); // single section
            expect(noHeadAndTailSections[0].length).toBe(11); // section is body
            expect(noHeadAndTailSections.every(consequetiveArrayChecker)).toBe(true);
            const withTailSections = getPaginationSections(6, 12, false);
            expect(withTailSections.length).toBe(2); // two sections
            expect(withTailSections[0].length).toBe(8); // first section is body
            expect(withTailSections[1].length).toBe(2); // second section is tail
            expect(withTailSections.every(consequetiveArrayChecker)).toBe(true);
            const withHeadSections = getPaginationSections(7, 12, false);
            expect(withHeadSections.length).toBe(2); // two sections
            expect(withHeadSections[0].length).toBe(2); // first section is head
            expect(withHeadSections[1].length).toBe(8); // second section is body
            expect(withHeadSections.every(consequetiveArrayChecker)).toBe(true);
            const withHeadAndTailSections = getPaginationSections(7, 13, false);
            expect(withHeadAndTailSections.length).toBe(3); // three sections
            expect(withHeadAndTailSections[0].length).toBe(2); // first section is head
            expect(withHeadAndTailSections[1].length).toBe(5); // second section is body
            expect(withHeadAndTailSections[2].length).toBe(2); // second section is tail
            expect(withHeadAndTailSections.every(consequetiveArrayChecker)).toBe(true);
        });
        test("mobile head & tail logic", () => {
            const noHeadAndTailSections = getPaginationSections(1, 7, true);
            expect(noHeadAndTailSections.length).toBe(1); // single section
            expect(noHeadAndTailSections[0].length).toBe(7); // section is body
            expect(noHeadAndTailSections.every(consequetiveArrayChecker)).toBe(true);
            const withTailSections = getPaginationSections(4, 8, true);
            expect(withTailSections.length).toBe(2); // two sections
            expect(withTailSections[0].length).toBe(5); // first section is body
            expect(withTailSections[1].length).toBe(1); // second section is tail
            expect(noHeadAndTailSections.every(consequetiveArrayChecker)).toBe(true);
            const withHeadSections = getPaginationSections(5, 8, true);
            expect(withHeadSections.length).toBe(2); // two sections
            expect(withHeadSections[0].length).toBe(1); // first section is head
            expect(withHeadSections[1].length).toBe(5); // second section is body
            expect(withHeadSections.every(consequetiveArrayChecker)).toBe(true);
            const withHeadAndTailSections = getPaginationSections(5, 9, true);
            expect(withHeadAndTailSections.length).toBe(3); // three sections
            expect(withHeadAndTailSections[0].length).toBe(1); // first section is head
            expect(withHeadAndTailSections[1].length).toBe(3); // second section is body
            expect(withHeadAndTailSections[2].length).toBe(1); // second section is tail
            expect(withHeadAndTailSections.every(consequetiveArrayChecker)).toBe(true);
        });
    });
});
