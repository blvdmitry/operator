import React from "react";
import type { ViewportName } from "@bookingcom/bui-core/types";

export type Props = {
  above?: ViewportName;
  below?: ViewportName;
  children: React.ReactNode | ((props: { className: string }) => void);
};
