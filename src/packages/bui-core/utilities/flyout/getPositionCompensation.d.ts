import { FlyoutPositionCompensation, FlyoutPosition } from "./types";
declare const getPositionCompensation: (position: FlyoutPosition, triggerEl: HTMLElement | null, arrowEl: HTMLElement | null, isRtl: boolean) => FlyoutPositionCompensation | undefined;
export default getPositionCompensation;
