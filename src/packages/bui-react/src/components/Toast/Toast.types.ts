import React from "react";
import type { ButtonProps } from "components/Button";
import type * as G from "types/global";

export type Timeout = "short" | "long" | number;
export type Context = {
  show: (props: Props, timeout?: Timeout) => void;
};

export type Props = {
  text: React.ReactNode;
  action?: Omit<ButtonProps, "variant" | "size" | "type" | "disabled">;
  layout?: "horizontal" | "vertical";
  className?: string;
  attributes?: G.Attributes<"div">;
};

export type ContainerProps = {
  toast: Props;
  id: string;
  active?: boolean;
  onRemove: (id: string) => void;
  timeout?: Timeout;
  attributes?: G.Attributes<"div">;
};

export type ProviderProps = {
  children: React.ReactNode;
};

export type ProviderQueue = Array<{
  props: Props;
  id: string;
  timeout?: Timeout;
}>;

type AddAction = { type: "add"; payload: ProviderQueue[0] };
type RemoveAction = { type: "remove"; payload: { id: string } };
type Action = AddAction | RemoveAction;
export type Reducer = (state: ProviderQueue, action: Action) => ProviderQueue;
