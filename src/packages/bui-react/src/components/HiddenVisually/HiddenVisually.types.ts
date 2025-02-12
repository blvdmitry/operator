import React from "react";

export type Props = {
  children: React.ReactNode | ((props: { className: string }) => void);
  tagName?: keyof JSX.IntrinsicElements;
};
