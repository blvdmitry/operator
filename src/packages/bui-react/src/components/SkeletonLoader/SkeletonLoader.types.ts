import type { AspectRatioProps } from "components/AspectRatio";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";

type WithBoxVariant = {
  variant?: "box";
  aspectRatio?: AspectRatioProps["ratio"];
};

type WithTextVariant = {
  variant?: "title" | "one-line" | "two-lines" | "three-lines";
  aspectRatio?: never;
};

type WithVariant = WithBoxVariant | WithTextVariant;

type BaseProps = WithVariant & {
  color?: "neutral" | "inherit";
  width?: string;
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
  attributes?: G.Attributes<"div">;
  mixin?: Mixin<{ width: false; height: false }>;
};

export type Props = BaseProps;
