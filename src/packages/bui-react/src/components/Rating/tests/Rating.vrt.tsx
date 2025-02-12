import React from "react";
import env from "@bookingcom/bui-env-react";
import Rating from "components/Rating";

env.test.vrt({
  starsWithFloatingValue: <Rating value={3.5} ariaLabel="Rating in start" />,
  diamondsWithFloatingValue: (
    <Rating value={3.5} variant="diamonds" ariaLabel="Rating in diamonds" />
  ),
  circlesWithFloatingValue: (
    <Rating value={3.5} variant="circles" ariaLabel="Rating in circles" />
  ),
  squaresWithFloatingValue: (
    <Rating value={3.5} variant="squares" ariaLabel="Rating in circles" />
  ),
});
