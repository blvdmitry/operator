import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";
import type { StackProps } from "components/Stack";

export type Props = {
  score: string;
  scoreAriaLabel?: string;
  reviewCount?: string;
  rating?: string;
  ratingReviewAriaLabel?: string;
  variant?: "outline" | "text" | "inverse";
  size?: "smaller" | "small" | "medium";
  inline?: boolean;
  alignment?: "start" | "end";
  className?: string;
  attributes?: G.Attributes<"div">;
  mixin?: Mixin<{ width: false; height: false }, StackProps["mixin"]>;
};
