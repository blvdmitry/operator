import React from "react";
import env from "@bookingcom/bui-env-react";
import Bubble from "components/Bubble";

env.test.vrt({
  variantNeutralEmpty: <Bubble />,
  variantNeutralWithSingleChar: <Bubble text="1" />,
  variantNeutralWithText: <Bubble text="10" />,
  variantDestructiveEmpty: <Bubble variant="destructive" />,
  variantDestructiveWithSingleChar: <Bubble variant="destructive" text="1" />,
  variantDestructiveWithText: <Bubble variant="destructive" text="10" />,
  variantActionEmpty: <Bubble variant="action" />,
  variantActionWithSingleChar: <Bubble variant="action" text="1" />,
  variantActionWithText: <Bubble variant="action" text="10" />,
  defaultMaxValueWithTextAsString: <Bubble text="100" />,
  defaultMaxValueWithTextAsNumber: <Bubble text={100} />,
  textGreaterThanMaxValue: <Bubble maxValue={9} text={10} />,
});
