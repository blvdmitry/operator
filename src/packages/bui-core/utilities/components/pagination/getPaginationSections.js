import { range } from "../../helpers";
export default function getPaginationSections(currentPage, totalPages, mobile) {
    const sections = [];
    let maxBodyLength = mobile ? 3 : 5; // max length of the body when having tail/head
    const maxSideLength = Math.floor(maxBodyLength / 2) + 1; // ${num of pages shown} + ${separator}
    const maxTotalLength = maxSideLength * 2 + maxBodyLength; // number of pages shown together with separators
    const hasHead = totalPages > maxTotalLength && currentPage > maxBodyLength + 1;
    if (hasHead) {
        sections.push(range(1, maxSideLength));
    }
    const hasTail = totalPages > maxTotalLength && currentPage < totalPages - maxBodyLength;
    if (!hasHead)
        maxBodyLength += maxSideLength;
    if (!hasTail)
        maxBodyLength += maxSideLength;
    const bodyStart = hasHead
        ? hasTail
            ? currentPage - Math.floor(maxBodyLength / 2)
            : totalPages + 1 - maxBodyLength
        : 1;
    const bodyEnd = Math.min(bodyStart + maxBodyLength, totalPages + 1);
    sections.push(range(bodyStart, bodyEnd));
    if (hasTail) {
        sections.push(range(totalPages - maxSideLength + 2, totalPages + 1));
    }
    return sections;
}
