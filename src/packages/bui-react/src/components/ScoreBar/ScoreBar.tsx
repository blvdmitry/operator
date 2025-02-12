import React from "react";
import Stack from "components/Stack";
import Text from "components/Text";
import useId from "hooks/useId";
import ScoreBarProgress from "./ScoreBarProgress";
import type * as T from "./ScoreBar.types";

const ScoreBar = (props: T.Props) => {
  const {
    variant,
    value,
    labelStart,
    labelEnd,
    ariaLabel,
    className,
    attributes,
    mixin,
  } = props;
  const id = useId();

  const labelId = labelStart ? `${id}-label` : undefined;
  const labeledBy = labelId ? `${id} ${labelId}` : `${id}`;

  return (
    <Stack
      gap={1}
      direction="column"
      className={className}
      attributes={attributes}
      mixin={mixin}
    >
      {labelStart && labelEnd && (
        <Stack
          alignItems="end"
          justifyContent="space-between"
          direction="row"
          gap={2}
          wrap="nowrap"
        >
          <Stack.Item shrink>
            <Text variant="emphasized_2" attributes={{ id }}>
              {labelStart}
            </Text>
          </Stack.Item>
          <Stack.Item shrink>
            <Text
              variant="emphasized_2"
              align="right"
              attributes={{ id: labelId }}
            >
              {labelEnd}
            </Text>
          </Stack.Item>
        </Stack>
      )}
      <ScoreBarProgress
        value={value}
        role="meter"
        minValue={0}
        maxValue={1}
        color={variant}
        attributes={{
          "aria-labelledby": labeledBy,
          "aria-label": ariaLabel,
        }}
      />
    </Stack>
  );
};

export default ScoreBar;
