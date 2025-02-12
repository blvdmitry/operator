import React from "react";
import env from "@bookingcom/bui-env-react";
import Placeholder from "components/Placeholder";
import InputRadioCard from "components/InputRadioCard";

const Title = () => <Placeholder height="40px" />;
const Content = () => <Placeholder />;

env.test.vrt({
  unchecked: (
    <InputRadioCard name="rate">
      <Title />
    </InputRadioCard>
  ),
  uncheckedWithError: (
    <InputRadioCard name="rate" error>
      <Title />
    </InputRadioCard>
  ),
  uncheckedDisabled: (
    <InputRadioCard name="rate" disabled>
      <Title />
    </InputRadioCard>
  ),
  uncheckedDisabledWithError: (
    <InputRadioCard name="rate" disabled error>
      <Title />
    </InputRadioCard>
  ),
  uncheckedElevated: (
    <InputRadioCard name="rate" elevated>
      <Title />
    </InputRadioCard>
  ),
  uncheckedElevatedWithError: (
    <InputRadioCard name="rate" error elevated>
      <Title />
    </InputRadioCard>
  ),
  uncheckedDisabledElevated: (
    <InputRadioCard name="rate" disabled elevated>
      <Title />
    </InputRadioCard>
  ),
  uncheckedWithContent: (
    <InputRadioCard name="rate" additionalContent={<Content />}>
      <Title />
    </InputRadioCard>
  ),
  checked: (
    <InputRadioCard name="rate" checked>
      <Title />
    </InputRadioCard>
  ),
  checkedWithError: (
    <InputRadioCard name="rate" checked error>
      <Title />
    </InputRadioCard>
  ),
  checkedDisabled: (
    <InputRadioCard name="rate" checked disabled>
      <Title />
    </InputRadioCard>
  ),
  checkedDisabledWithError: (
    <InputRadioCard name="rate" checked disabled error>
      <Title />
    </InputRadioCard>
  ),
  checkedElevated: (
    <InputRadioCard name="rate" checked elevated>
      <Title />
    </InputRadioCard>
  ),
  checkedElevatedWithError: (
    <InputRadioCard name="rate" checked error elevated>
      <Title />
    </InputRadioCard>
  ),
  checkedDisabledElevated: (
    <InputRadioCard name="rate" checked disabled elevated>
      <Title />
    </InputRadioCard>
  ),
  checkedWithContent: (
    <InputRadioCard name="rate" checked additionalContent={<Content />}>
      <Title />
    </InputRadioCard>
  ),
  alignCenter: (
    <InputRadioCard name="rate" inputElementVerticalAlignment="center">
      <Title />
    </InputRadioCard>
  ),
});
