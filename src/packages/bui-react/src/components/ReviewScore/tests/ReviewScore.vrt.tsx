import React from "react";
import env from "@bookingcom/bui-env-react";
import ReviewScore from "components/ReviewScore";

const fixtures = {
  score: "9.0",
  scoreAriaLabel: "Scored 9.0",
  rating: "Fabulous",
  reviewCount: "1,234 reviews",
  ratingReviewAriaLabel: "Rated fabulous from 1,234 reviews",
};

env.test.vrt({
  default: {
    component: <ReviewScore {...fixtures} />,
  },
  outline: {
    component: <ReviewScore {...fixtures} variant="outline" />,
  },
  text: {
    component: <ReviewScore {...fixtures} variant="text" />,
  },
  inline: {
    component: <ReviewScore {...fixtures} inline />,
  },
  alignmentEnd: {
    component: <ReviewScore {...fixtures} alignment="end" />,
  },
  inverse: {
    component: (
      <div style={{ background: "#333", padding: 8 }}>
        <ReviewScore {...fixtures} variant="inverse" />
      </div>
    ),
  },
  badge: {
    component: <ReviewScore score="9.0" scoreAriaLabel="Scored 9.0" />,
  },
});
