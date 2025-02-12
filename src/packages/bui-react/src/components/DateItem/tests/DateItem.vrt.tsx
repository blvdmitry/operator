import React from "react";
import env from "@bookingcom/bui-env-react";
import DateItem from "components/DateItem";

env.test.vrt({
  simplified: <DateItem title="23" subtitle="Nov" datetime="23-11" />,
  detailed: (
    <DateItem
      variant="detailed"
      title="Mon, 23 Nov 2016"
      subtitle="from 13:00 to 16:00"
      label="Check-in"
      originalTitle="Mon, 22 Nov 2016"
    />
  ),
  actionable: (
    <DateItem
      variant="detailed"
      title="Mon, 23 Nov 2016"
      subtitle="from 13:00 to 16:00"
      onClick={() => {}}
    />
  ),
});
