import React from "react";
import env from "@bookingcom/bui-env-react";
import DateRange from "components/DateRange";

env.test.vrt({
  simplified: (
    <DateRange
      from={{
        title: "23",
        subtitle: "Nov",
      }}
      to={{
        title: "24",
        subtitle: "Nov",
      }}
    />
  ),
  detailed: (
    <DateRange
      variant="detailed"
      from={{
        label: "Check-in",
        originalTitle: "Sun, 22 Nov 2016",
        title: "Mon, 23 Nov 2016",
        subtitle: "from 13:00 to 16:00",
      }}
      to={{
        label: "Check-out",
        originalTitle: "Mon, 23 Nov 2016",
        title: "Tue, 24 Nov 2016",
        subtitle: "until 10:00",
      }}
    />
  ),
  actionable: (
    <DateRange
      variant="detailed"
      from={{
        label: "Check-in",
        title: "Mon, 23 Nov 2016",
        subtitle: "from 13:00 to 16:00",
        onClick: () => {},
      }}
      to={{
        label: "Check-out",
        title: "Tue, 24 Nov 2016",
        subtitle: "until 10:00",
        onClick: () => {},
      }}
    />
  ),
});
