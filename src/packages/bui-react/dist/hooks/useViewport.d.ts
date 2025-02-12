import type { ViewportName } from "@bookingcom/bui-core/types";
declare const useViewport: (defaultSize?: ViewportName) => {
    isSmall: boolean;
    isMedium: boolean;
    isLarge: boolean;
};
export default useViewport;
