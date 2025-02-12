import React from "react";
import env from "@bookingcom/bui-env-react";
import Placeholder from "components/Placeholder";
import InputCheckboxCard from "components/InputCheckboxCard";

const Title = () => <Placeholder height="40px" />;
const Content = () => <Placeholder />;

env.test.vrt({
  unchecked: (
    <InputCheckboxCard name="rate">
      <Title />
    </InputCheckboxCard>
  ),
  uncheckedWithError: (
    <InputCheckboxCard name="rate" error>
      <Title />
    </InputCheckboxCard>
  ),
  uncheckedDisabled: (
    <InputCheckboxCard name="rate" disabled>
      <Title />
    </InputCheckboxCard>
  ),
  uncheckedDisabledWithError: (
    <InputCheckboxCard name="rate" disabled error>
      <Title />
    </InputCheckboxCard>
  ),
  uncheckedElevated: (
    <InputCheckboxCard name="rate" elevated>
      <Title />
    </InputCheckboxCard>
  ),
  uncheckedElevatedWithError: (
    <InputCheckboxCard name="rate" error elevated>
      <Title />
    </InputCheckboxCard>
  ),
  uncheckedDisabledElevated: (
    <InputCheckboxCard name="rate" disabled elevated>
      <Title />
    </InputCheckboxCard>
  ),
  uncheckedWithContent: (
    <InputCheckboxCard name="rate" additionalContent={<Content />}>
      <Title />
    </InputCheckboxCard>
  ),
  checked: (
    <InputCheckboxCard name="rate" checked>
      <Title />
    </InputCheckboxCard>
  ),
  checkedWithError: (
    <InputCheckboxCard name="rate" checked error>
      <Title />
    </InputCheckboxCard>
  ),
  checkedDisabled: (
    <InputCheckboxCard name="rate" checked disabled>
      <Title />
    </InputCheckboxCard>
  ),
  checkedDisabledWithError: (
    <InputCheckboxCard name="rate" checked disabled error>
      <Title />
    </InputCheckboxCard>
  ),
  checkedElevated: (
    <InputCheckboxCard name="rate" checked elevated>
      <Title />
    </InputCheckboxCard>
  ),
  checkedElevatedWithError: (
    <InputCheckboxCard name="rate" checked error elevated>
      <Title />
    </InputCheckboxCard>
  ),
  checkedDisabledElevated: (
    <InputCheckboxCard name="rate" checked disabled elevated>
      <Title />
    </InputCheckboxCard>
  ),
  checkedWithContent: (
    <InputCheckboxCard name="rate" checked additionalContent={<Content />}>
      <Title />
    </InputCheckboxCard>
  ),
  alignCenter: (
    <InputCheckboxCard name="rate" inputElementVerticalAlignment="center">
      <Title />
    </InputCheckboxCard>
  ),
});
