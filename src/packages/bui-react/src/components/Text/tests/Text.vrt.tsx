import env from "@bookingcom/bui-env-react";
import Text from "components/Text";
import React from "react";
import type * as T from "components/Text/Text.types";

const variants: T.Props["variant"][] = [
  "display_1",
  "display_2",
  "display_3",
  "featured_1",
  "featured_2",
  "featured_3",
  "headline_1",
  "headline_2",
  "headline_3",
  "strong_1",
  "strong_2",
  "emphasized_1",
  "emphasized_2",
  "body_1",
  "body_2",
  "small_1",
  "small_2",
];

const colors: T.Props["color"][] = [
  "neutral",
  "neutral_alt",
  "action",
  "constructive",
  "destructive",
  "accent",
  "callout",
  "white",
  "disabled",
  "inherit",
  "brand_primary",
  "brand_genius_secondary",
];

env.test.vrt({
  variantAlignLeft: <Text align="left">Align left</Text>,
  variantAlignCenter: <Text align="center">Align center</Text>,
  variantAlignRight: <Text align="right">Align right</Text>,
  variantDecorationUnderline: (
    <Text decoration="underline">Decoration underline</Text>
  ),
  variantDecorationLineThrough: (
    <Text decoration="line-through">Decoration line through</Text>
  ),
  variants: (
    <div>
      {variants.map((variant) => (
        <Text variant={variant}>{variant}</Text>
      ))}
    </div>
  ),
  colors: (
    <div>
      {colors.map((color) => (
        <Text color={color}>{color}</Text>
      ))}
    </div>
  ),
  bidirectional: <Text bidirectional>8 on Oregon Boutique Lodge</Text>,
});
