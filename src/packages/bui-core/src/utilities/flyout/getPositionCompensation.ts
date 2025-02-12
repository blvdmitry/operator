import { FlyoutPositionCompensation, FlyoutPosition } from "./types";

const getPositionCompensation = (
  position: FlyoutPosition,
  triggerEl: HTMLElement | null,
  arrowEl: HTMLElement | null
) => {
  if (!triggerEl || !arrowEl) return;

  const arrowSide = arrowEl.clientWidth;
  const arrowDiagonal = Math.sqrt(arrowSide * arrowSide * 2);
  const arrowOffsetValue = [
    "bottom-start",
    "bottom-end",
    "top-start",
    "top-end",
  ].includes(position)
    ? Math.min(
        arrowEl.offsetLeft,
        (arrowEl.offsetParent?.clientWidth || 0) -
          arrowEl.offsetLeft -
          arrowSide
      )
    : Math.min(
        arrowEl.offsetTop,
        (arrowEl.offsetParent?.clientHeight || 0) -
          arrowEl.offsetTop -
          arrowSide
      );
  const compensation: FlyoutPositionCompensation = { x: 0, y: 0 };
  const shouldCompensateX =
    triggerEl.clientWidth < arrowOffsetValue * 2 + arrowDiagonal;
  const shouldCompensateY =
    triggerEl.clientHeight < arrowOffsetValue * 2 + arrowDiagonal;
  const fullOffset = arrowOffsetValue * 2 + arrowDiagonal;

  if (shouldCompensateX && position) {
    if (["bottom-start", "top-start"].includes(position)) {
      compensation.x = (fullOffset / 2 - triggerEl.clientWidth / 2) * -1;
    } else if (["bottom-end", "top-end"].includes(position)) {
      compensation.x = fullOffset / 2 - triggerEl.clientWidth / 2;
    }
  }

  if (shouldCompensateY && position) {
    if (["start-top", "end-top"].includes(position)) {
      compensation.y = (fullOffset / 2 - triggerEl.clientHeight / 2) * -1;
    } else if (["end-bottom", "start-bottom"].includes(position)) {
      compensation.y = fullOffset / 2 - triggerEl.clientHeight / 2;
    }
  }

  return compensation;
};

export default getPositionCompensation;
