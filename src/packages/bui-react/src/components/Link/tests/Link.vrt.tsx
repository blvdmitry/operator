import React from "react";
import { AlarmIcon } from "@bookingcom/bui-assets-react/streamline";
import env from "@bookingcom/bui-env-react";
import Link from "components/Link";

env.test.vrt({
  primary: <Link text="See available properties" icon={AlarmIcon} />,
  secondary: (
    <Link
      variant="secondary"
      text="Find out more about this feature"
      icon={AlarmIcon}
    />
  ),
  text: (
    <div>
      <p>
        Cancellation and prepayment policies vary according to room type. Please{" "}
        <Link text="check the room conditions" /> when selecting your room
        above.
      </p>
      <p>
        Secondary <Link text="links" variant="secondary" /> within paragraphs of
        text are automatically underlined.
      </p>
    </div>
  ),
  iconPosition: (
    <Link
      iconPosition="end"
      text="Find out more about this feature"
      icon={AlarmIcon}
    />
  ),
});
