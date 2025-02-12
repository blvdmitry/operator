import React from "react";
import env from "@bookingcom/bui-env-react";
import InputPassword from "components/InputPassword";

env.test.vrt({
  password: (
    <InputPassword
      label="Password"
      name="password"
      showPasswordAriaLabel="Show password"
    />
  ),
});
