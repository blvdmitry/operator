export type ResponsiveOnly<T> = { s: T; m?: T; l?: T; xl?: T };
export type Responsive<T> = T | ResponsiveOnly<T>;
export type ViewportKey = "s" | "m" | "l" | "xl";
export type ViewportName = "small" | "medium" | "large" | "xlarge";

export type MixinUnits =
  | "%"
  | "em"
  | "and"
  | "ex"
  | "rem"
  | "lh"
  | "rlh"
  | "it"
  | "vw"
  | "vh"
  | "vmin"
  | "vmax"
  | "vb"
  | "vi"
  | "svw"
  | "svh"
  | "lvw"
  | "lvh"
  | "dvw"
  | "dvh"
  | "px";
export type MixinLiteralValue = `${number}${MixinUnits}`;

type MixinProperties = {
  height?: Responsive<number | MixinLiteralValue>;
  width?: Responsive<number | MixinLiteralValue>;
  position?: Responsive<"static" | "relative" | "absolute" | "fixed">;
  zIndex?: Responsive<0 | 1 | 2 | 3 | 4>;
  inset?: Responsive<number | "auto">;
  insetBlockStart?: Responsive<number | "auto">;
  insetBlockEnd?: Responsive<number | "auto">;
  insetInlineStart?: Responsive<number | "auto">;
  insetInlineEnd?: Responsive<number | "auto">;
  margin?: Responsive<number>;
  marginBlockStart?: Responsive<number>;
  marginBlockEnd?: Responsive<number>;
  marginInlineStart?: Responsive<number>;
  marginInlineEnd?: Responsive<number>;
  padding?: Responsive<number>;
  paddingBlockStart?: Responsive<number>;
  paddingBlockEnd?: Responsive<number>;
  paddingInlineStart?: Responsive<number>;
  paddingInlineEnd?: Responsive<number>;
};

type ExcludedProperties<
  Properties extends MixinProperties,
  Flag extends false | undefined,
  ExcludedKeys extends keyof MixinProperties
> = Flag extends false ? Omit<Properties, ExcludedKeys> : Properties;

export type Mixin<
  Flags extends {
    width?: false;
    height?: false;
    position?: false;
    inset?: false;
    margin?: false;
    padding?: false;
  } = {},
  Properties extends MixinProperties | undefined = MixinProperties,
  P extends MixinProperties = Properties extends undefined
    ? MixinProperties
    : Properties
> = ExcludedProperties<
  ExcludedProperties<
    ExcludedProperties<
      ExcludedProperties<
        ExcludedProperties<
          ExcludedProperties<
            P,
            Flags["margin"],
            | "margin"
            | "marginBlockStart"
            | "marginBlockEnd"
            | "marginInlineStart"
            | "marginInlineEnd"
          >,
          Flags["padding"],
          | "padding"
          | "paddingBlockStart"
          | "paddingBlockEnd"
          | "paddingInlineStart"
          | "paddingInlineEnd"
        >,
        Flags["inset"],
        | "inset"
        | "insetBlockStart"
        | "insetBlockEnd"
        | "insetInlineStart"
        | "insetInlineEnd"
      >,
      Flags["position"],
      "position" | "zIndex"
    >,
    Flags["height"],
    "height"
  >,
  Flags["width"],
  "width"
>;
