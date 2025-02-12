import React from "react";
import {
  MagnifyingGlassIcon,
  CheckmarkIcon,
} from "@bookingcom/bui-assets-react/streamline";
import env from "@bookingcom/bui-env-react";
import InputText from "components/InputText";
import Icon from "components/Icon";

env.test.vrt({
  default: <InputText label="Destination" name="destination" />,
  error: (
    <InputText
      label="Destination"
      name="destination"
      error="This is a required field."
    />
  ),
  disabled: <InputText disabled label="Destination" name="destination" />,
  prefix: <InputText label="Price" name="price" prefix="EUR" />,
  suffix: <InputText label="Size" name="size" suffix="m2" />,
  startIcon: (
    <InputText
      label="Search"
      name="search"
      startSlot={<Icon svg={MagnifyingGlassIcon} />}
    />
  ),
  endIcon: (
    <InputText
      label="Search"
      name="search"
      endSlot={<Icon svg={CheckmarkIcon} color="constructive" />}
    />
  ),
  maximumLength: (
    <InputText
      label="Search"
      name="search"
      startSlot={<Icon svg={MagnifyingGlassIcon} />}
      placeholder="Max Length is 15"
      maximumLength={15}
    />
  ),
  lengthCounter: (
    <InputText
      label="Search"
      name="search"
      startSlot={<Icon svg={MagnifyingGlassIcon} />}
      placeholder="Max Length is 15"
      maximumLength={15}
      showLengthCounter
    />
  ),
  clearButton: (
    <InputText
      label="Search"
      name="search"
      startSlot={<Icon svg={MagnifyingGlassIcon} />}
      placeholder="Search destinations"
      value="Amsterdam"
      clearButtonVisibility="always"
    />
  ),
  optional: (
    <div>
      <InputText
        label="Middle Name"
        name="middleName"
        placeholder="Your middle name"
        subLabel="(optional)"
      />
      <br />
      <InputText
        label="Middle Name"
        name="middleNameWithCounter"
        placeholder="Your middle name"
        subLabel="(optional)"
        maximumLength={40}
        showLengthCounter
      />
    </div>
  ),
  required: (
    <div>
      <InputText
        label="Last Name"
        name="lastName"
        placeholder="Your last name"
        required
      />
      <br />
      <InputText
        label="Last Name"
        name="lastNameWithCounter"
        placeholder="Your last name"
        required
        maximumLength={40}
        showLengthCounter
      />
    </div>
  ),
});
