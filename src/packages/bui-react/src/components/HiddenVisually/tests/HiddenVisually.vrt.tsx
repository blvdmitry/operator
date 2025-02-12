import React from "react";
import env from "@bookingcom/bui-env-react";
import HiddenVisually from "components/HiddenVisually";

env.test.vrt({
  default: <HiddenVisually>This content is hidden visually</HiddenVisually>,
});
