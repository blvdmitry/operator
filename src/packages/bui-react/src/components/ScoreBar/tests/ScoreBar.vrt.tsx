import React from "react";
import env from "@bookingcom/bui-env-react";
import Stack from "components/Stack";
import ScoreBar from "components/ScoreBar";

const fixtures = {
  className: "test-className",
  testId: "test-bui-score-bar",
  labelStart: "Start Label",
  labelEnd: "End Label",
  ariaLabel: "test-bui-score-bar-aria-label",
  value: 0.45,
};

env.test.vrt({
  labels: (
    <ScoreBar
      value={0.45}
      labelStart={fixtures.labelStart}
      labelEnd={fixtures.labelEnd}
    />
  ),
  labelStart: (
    <ScoreBar
      value={0.88}
      variant="callout"
      labelStart={fixtures.labelStart}
      labelEnd={fixtures.labelEnd}
    />
  ),
  noLabels: <ScoreBar value={0} ariaLabel={fixtures.ariaLabel} />,
  variants: (
    <Stack direction="column" gap={4}>
      <ScoreBar value={0.7} ariaLabel={fixtures.ariaLabel} />
      <ScoreBar
        variant="brand_primary"
        value={0.7}
        ariaLabel={fixtures.ariaLabel}
      />
      <ScoreBar
        variant="constructive"
        value={0.7}
        ariaLabel={fixtures.ariaLabel}
      />
      <ScoreBar variant="accent" value={0.7} ariaLabel={fixtures.ariaLabel} />
      <ScoreBar variant="callout" value={0.7} ariaLabel={fixtures.ariaLabel} />
      <ScoreBar
        variant="destructive"
        value={0.7}
        ariaLabel={fixtures.ariaLabel}
      />
      <ScoreBar variant="action" value={0.7} ariaLabel={fixtures.ariaLabel} />
    </Stack>
  ),
});
