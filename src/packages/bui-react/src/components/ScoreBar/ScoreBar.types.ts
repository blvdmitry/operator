import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";
import type { StackProps } from "components/Stack";

export type BaseProps = {
  className?: string;
  attributes?: G.Attributes<"div">;
  mixin?: Mixin<{ height: false }, StackProps["mixin"]>;
};

export type ConditionalProps =
  | {
      ariaLabel: string;
      labelStart?: never;
      labelEnd?: never;
    }
  | {
      labelStart: string;
      labelEnd: string;
      ariaLabel?: never;
    };

export type Props = BaseProps &
  ConditionalProps & {
    variant?:
      | "brand_primary"
      | "constructive"
      | "accent"
      | "callout"
      | "destructive"
      | "action";
    /** Range of [0...1] */
    value: number;
  };
