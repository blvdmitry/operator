import type { IconSVG } from "components/Icon";
import type * as TBox from "components/Box/Box.types";
import type * as G from "types/global";
import type { GeneratedImageRemoteSet } from "@bookingcom/bui-assets-react";
import type { Responsive, Mixin } from "@bookingcom/bui-core/types";

export type Size = "small" | "medium" | "large" | "larger" | "largest";

export type FlagAsset = Extract<
  GeneratedImageRemoteSet,
  { setName: "images-flags" }
>;

export type Props = {
  src?: string;
  countryCode?: Lowercase<FlagAsset["assetName"]>;
  size?: Responsive<Size>;
  text?: string;
  icon?: IconSVG;
  color?: "destructive" | "callout" | "accent" | "constructive" | "inherit";
  outline?: "white" | "accent" | "destructive" | "constructive" | "callout";
  backgroundPosition?: string;
  backgroundSize?: string;
  ariaLabel?: string;
  className?: string;
  attributes?: G.Attributes<"div">;
  mixin?: Mixin<{ width: false; height: false }, TBox.Props["mixin"]>;
};
