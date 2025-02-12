import React from "react";
import env from "@bookingcom/bui-env-react";
import { CircleIcon } from "@bookingcom/bui-assets-react/streamline";
import Badge from "components/Badge";
import Stack from "components/Stack";

env.test.vrt({
  default: (
    <Stack direction="row">
      <Badge text="Bestseller" />
      <Badge text="Promoted" variant="outline" />
      <Badge text="Hotel" variant="brand-primary" />
      <Badge text="Genius" variant="brand-genius-primary" />
      <Badge text="Free breakfast" variant="constructive" />
      <Badge text="Filling Fast" variant="accent" />
      <Badge text="Value Deal" variant="callout" />
      <Badge text="Cancelled" variant="destructive" />
    </Stack>
  ),
  defaultWithIcon: (
    <Stack direction="row">
      <Badge text="Bestseller" icon={CircleIcon} />
      <Badge text="Promoted" variant="outline" icon={CircleIcon} />
      <Badge text="Hotel" variant="brand-primary" icon={CircleIcon} />
      <Badge text="Genius" variant="brand-genius-primary" icon={CircleIcon} />
      <Badge text="Free breakfast" variant="constructive" icon={CircleIcon} />
      <Badge text="Filling Fast" variant="accent" icon={CircleIcon} />
      <Badge text="Value Deal" variant="callout" icon={CircleIcon} />
      <Badge text="Cancelled" variant="destructive" icon={CircleIcon} />
    </Stack>
  ),
  defaultOnlyIcon: (
    <Stack direction="row">
      <Badge ariaLabel="Bestseller" icon={CircleIcon} />
      <Badge ariaLabel="Promoted" variant="outline" icon={CircleIcon} />
      <Badge ariaLabel="Hotel" variant="brand-primary" icon={CircleIcon} />
      <Badge
        ariaLabel="Genius"
        variant="brand-genius-primary"
        icon={CircleIcon}
      />
      <Badge
        ariaLabel="Free breakfast"
        variant="constructive"
        icon={CircleIcon}
      />
      <Badge ariaLabel="Filling Fast" variant="accent" icon={CircleIcon} />
      <Badge ariaLabel="Value Deal" variant="callout" icon={CircleIcon} />
      <Badge ariaLabel="Cancelled" variant="destructive" icon={CircleIcon} />
    </Stack>
  ),
  defaultWithClose: (
    <Stack direction="row">
      <Badge text="Bestseller" onAfterClose={() => {}} closeAriaLabel="close" />
      <Badge
        text="Hotel"
        variant="brand-primary"
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Genius"
        variant="brand-genius-primary"
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Free breakfast"
        variant="constructive"
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Filling Fast"
        variant="accent"
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Value Deal"
        variant="callout"
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Cancelled"
        variant="destructive"
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
    </Stack>
  ),
  defaultWithIconAndClose: (
    <Stack direction="row">
      <Badge
        text="Bestseller"
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Promoted"
        variant="outline"
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Hotel"
        variant="brand-primary"
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Genius"
        variant="brand-genius-primary"
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Free breakfast"
        variant="constructive"
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Filling Fast"
        variant="accent"
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Value Deal"
        variant="callout"
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Cancelled"
        variant="destructive"
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
    </Stack>
  ),
  alternative: (
    <Stack direction="row">
      <Badge text="Bestseller" alternative />
      <Badge text="Promoted" variant="outline" alternative />
      <Badge text="Hotel" variant="brand-primary" alternative />
      <Badge text="Genius" variant="brand-genius-primary" alternative />
      <Badge text="Free breakfast" variant="constructive" alternative />
      <Badge text="Filling Fast" variant="accent" alternative />
      <Badge text="Value Deal" variant="callout" alternative />
      <Badge text="Cancelled" variant="destructive" alternative />
    </Stack>
  ),
  alternativeWithIcon: (
    <Stack direction="row">
      <Badge text="Bestseller" alternative icon={CircleIcon} />
      <Badge text="Promoted" variant="outline" alternative icon={CircleIcon} />
      <Badge
        text="Hotel"
        variant="brand-primary"
        alternative
        icon={CircleIcon}
      />
      <Badge
        text="Genius"
        variant="brand-genius-primary"
        alternative
        icon={CircleIcon}
      />
      <Badge
        text="Free breakfast"
        variant="constructive"
        alternative
        icon={CircleIcon}
      />
      <Badge
        text="Filling Fast"
        variant="accent"
        alternative
        icon={CircleIcon}
      />
      <Badge
        text="Value Deal"
        variant="callout"
        alternative
        icon={CircleIcon}
      />
      <Badge
        text="Cancelled"
        variant="destructive"
        alternative
        icon={CircleIcon}
      />
    </Stack>
  ),
  alternativeOnlyIcon: (
    <Stack direction="row">
      <Badge ariaLabel="Bestseller" alternative icon={CircleIcon} />
      <Badge
        ariaLabel="Promoted"
        variant="outline"
        alternative
        icon={CircleIcon}
      />
      <Badge
        ariaLabel="Hotel"
        variant="brand-primary"
        alternative
        icon={CircleIcon}
      />
      <Badge
        ariaLabel="Genius"
        variant="brand-genius-primary"
        alternative
        icon={CircleIcon}
      />
      <Badge
        ariaLabel="Free breakfast"
        variant="constructive"
        alternative
        icon={CircleIcon}
      />
      <Badge
        ariaLabel="Filling Fast"
        variant="accent"
        alternative
        icon={CircleIcon}
      />
      <Badge
        ariaLabel="Value Deal"
        variant="callout"
        alternative
        icon={CircleIcon}
      />
      <Badge
        ariaLabel="Cancelled"
        variant="destructive"
        alternative
        icon={CircleIcon}
      />
    </Stack>
  ),
  alternativeWithCLose: (
    <Stack direction="row">
      <Badge
        text="Bestseller"
        alternative
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Promoted"
        variant="outline"
        alternative
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Hotel"
        variant="brand-primary"
        alternative
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Genius"
        variant="brand-genius-primary"
        alternative
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Free breakfast"
        variant="constructive"
        alternative
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Filling Fast"
        variant="accent"
        alternative
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Value Deal"
        variant="callout"
        alternative
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Cancelled"
        variant="destructive"
        alternative
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
    </Stack>
  ),
  alternativeWithIconAndClose: (
    <Stack direction="row">
      <Badge
        text="Bestseller"
        alternative
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Promoted"
        variant="outline"
        alternative
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Hotel"
        variant="brand-primary"
        alternative
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Genius"
        variant="brand-genius-primary"
        alternative
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Free breakfast"
        variant="constructive"
        alternative
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Filling Fast"
        variant="accent"
        alternative
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Value Deal"
        variant="callout"
        alternative
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
      <Badge
        text="Cancelled"
        variant="destructive"
        alternative
        icon={CircleIcon}
        onAfterClose={() => {}}
        closeAriaLabel="close"
      />
    </Stack>
  ),
});
