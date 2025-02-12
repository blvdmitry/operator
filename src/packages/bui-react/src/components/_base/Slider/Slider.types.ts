import React from "react";
import type * as G from "types/global";

export enum ControlType {
  previous = "previous",
  next = "next",
}

export type NavigationData = {
  index: number;
};

export type NavigationOptions =
  | {
      delta?: number;
      instant?: boolean;
      duration?: never;
      direction?: "horizontal" | "vertical";
    }
  | {
      delta?: number;
      instant?: boolean;
      duration?: number;
      direction?: "horizontal" | "vertical";
    };

export type Props = {
  infinite?: boolean;
  isScrollEnabled?: boolean;
  children: React.ReactNode;
  defaultActiveIndex?: number;
};

export type RefProps = {
  navigate: (
    index: number,
    options?: NavigationOptions
  ) => Promise<void> | void;
  navigateBack: () => void;
  navigateForward: () => void;
};
export type Ref = React.Ref<RefProps>;

export type State = {
  scrollValue: number;
  startGhostsCount: number;
  endGhostsCount: number;
};

export type ScrollingState = "scrolling" | "idle";

export type ContextItem = {
  el: HTMLLIElement;
  index: number;
  realIndex: number;
};

export type Context = {
  navigateBack: () => void;
  navigateForward: () => void;
  navigate: (index: number, options: NavigationOptions) => void;
  setSliderState: (nextState: { [key in keyof State]?: number }) => void;
  scrollValue: number;
  isScrollEnabled: boolean;
  scrollingState: ScrollingState;
  nextControlRef: React.RefObject<HTMLButtonElement>;
  previousControlRef: React.RefObject<HTMLButtonElement>;
  containerRef: React.RefObject<HTMLUListElement>;
  items: ContextItem[];
  realItems: ContextItem[];
  infinite: boolean;
  startGhostsCount: number;
  endGhostsCount: number;
  id: string;
  itemsCount: number;
  setItemsCount: (newValue: number) => void;
};

export type ContainerProps = {
  className?: string;
  children?: React.ReactNode;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  onAfterNavigate?: (data: NavigationData) => void;
};

export type ItemProps = {
  index: number;
  realIndex: number;
  ghost?: boolean;
  className?: string;
  attributes?: G.Attributes<"li">;
  children?: React.ReactNode;
};

export type ControlProps = {
  type: ControlType;
  className?: string;
  attributes: G.Attributes<"button">;
  onNavigationControlClick?: (
    e: React.KeyboardEvent | React.MouseEvent
  ) => void;
};

export type Compound = React.ForwardRefExoticComponent<
  Props & { ref?: Ref }
> & {
  Control: React.ComponentType<ControlProps>;
  Container: React.ComponentType<ContainerProps>;
  Item: React.ComponentType<ItemProps>;
};
