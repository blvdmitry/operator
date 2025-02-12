import React from "react";
import type * as T from "./Slider.types";

const Context = React.createContext<T.Context>({
  navigate: () => {},
  navigateBack: () => {},
  navigateForward: () => {},
  setSliderState: () => {},
  scrollValue: 0,
  isScrollEnabled: true,
  scrollingState: "idle",
  nextControlRef: React.createRef(),
  previousControlRef: React.createRef(),
  containerRef: React.createRef(),
  items: [],
  realItems: [],
  infinite: false,
  startGhostsCount: 0,
  endGhostsCount: 0,
  id: "",
  itemsCount: 0,
  setItemsCount: () => {},
});

export const useSlider = () => React.useContext(Context);

export default Context;
