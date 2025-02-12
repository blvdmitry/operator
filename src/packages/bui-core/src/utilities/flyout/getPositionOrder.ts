import { FlyoutPosition, FlyoutOrderKey } from "./types";

const topPos: FlyoutPosition[] = ["top-start", "top", "top-end"];
const bottomPos: FlyoutPosition[] = ["bottom-start", "bottom", "bottom-end"];
const startPos: FlyoutPosition[] = ["start"];
const endPos: FlyoutPosition[] = ["end"];
const order: Record<FlyoutOrderKey, FlyoutPosition[]> = {
  top: [...topPos, ...bottomPos, ...endPos, ...startPos],
  bottom: [...bottomPos, ...topPos, ...endPos, ...startPos],
  start: [...startPos, ...endPos, ...topPos, ...bottomPos],
  end: [...endPos, ...startPos, ...topPos, ...bottomPos],
};

/**
 * Get an order of positions to try to fit popover on the screen based on its starting position
 */
const getPositionOrder = (position: FlyoutPosition) => {
  const types: Array<FlyoutOrderKey> = ["top", "bottom", "start", "end"];
  const type = types.find((type) => position.startsWith(type)) ?? "bottom";
  return order[type];
};

export default getPositionOrder;
