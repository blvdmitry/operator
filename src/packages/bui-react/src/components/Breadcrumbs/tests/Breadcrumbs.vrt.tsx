import React from "react";
import env from "@bookingcom/bui-env-react";
import Breadcrumbs from "components/Breadcrumbs";

const items = [
  {
    text: "Countries",
    href: "#",
  },
  {
    text: "Netherlands",
    onClick: () => {},
  },
  {
    text: "Amsterdam",
  },
];

const backItem = [
  {
    text: "Back to list",
    href: "#",
  },
];

env.test.vrt({
  items: <Breadcrumbs items={items} ariaLabel="Navigation" />,
  itemsAndBack: <Breadcrumbs back items={backItem} />,
});
