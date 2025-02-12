import React from "react";
import { BedIcon } from "@bookingcom/bui-assets-react/streamline";
import env from "@bookingcom/bui-env-react";
import Chip from "components/Chip";
import Stack from "components/Stack";

env.test.vrt({
  default: <Chip label="Flexible rate" name="rate" />,
  disabled: <Chip disabled label="Flexible rate" name="rate" />,
  uncontrolledChecked: (
    <Chip label="Flexible rate" name="rate" defaultChecked />
  ),
  controlledChecked: <Chip label="Flexible rate" name="rate" checked />,
  icon: <Chip label="Flexible rate" name="rate" icon={BedIcon} />,
  dismissible: (
    <Chip label="Flexible rate" name="rate" icon={BedIcon} dismissible />
  ),
  elevated: <Chip label="Flexible rate" name="rate" icon={BedIcon} elevated />,
  variantAction: (
    <Chip
      variant="action"
      label="Flexible rate"
      icon={BedIcon}
      bubble={{ text: 5, ariaLabel: "bubble label" }}
      selected={false}
    />
  ),
  variantActionDisabled: (
    <Chip
      variant="action"
      label="Flexible rate"
      icon={BedIcon}
      bubble={{ text: 5, ariaLabel: "bubble label" }}
      selected={false}
      disabled
    />
  ),
  variantActionSelected: (
    <Chip
      variant="action"
      label="Flexible rate"
      icon={BedIcon}
      bubble={{ text: 5, ariaLabel: "bubble label" }}
      selected
    />
  ),
  wide: (
    <Stack alignItems="start">
      <Chip
        variant="action"
        label="Wide Action Chip"
        icon={BedIcon}
        bubble={{ text: 5, ariaLabel: "bubble label" }}
        selected
        wide
      />
      <Chip variant="toggle" label="Wide Toggle Chip" icon={BedIcon} wide />
    </Stack>
  ),
  multiline: (
    <Stack direction="row">
      {[
        "5 звезд (50)",
        "Удобства для гостей с ограниченными физическими возможностями (90)",
        "Парковка (105)",
        "Отели (200)",
      ].map((label) => (
        <Stack.Item shrink>
          <Chip label={label} name="facility" />
        </Stack.Item>
      ))}
    </Stack>
  ),
  horizontalScroll: (
    <Stack direction="row" wrap="nowrap">
      {[
        "5 звезд (50)",
        "Удобства для гостей с ограниченными физическими возможностями (90)",
        "Парковка (105)",
        "Отели (200)",
      ].map((label) => (
        <Chip label={label} name="facility" />
      ))}
    </Stack>
  ),
});
