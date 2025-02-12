import type { Mixin } from "@bookingcom/bui-core/types";
import type * as TInputSelect from "components/InputSelect/InputSelect.types";
import type { CardProps } from "components/Card";
import type * as G from "types/global";

export type BaseProps = {
  select?: TInputSelect.Props;
  infoLabel?: string;
  onPageChange?: (pageData: ChangeArgs) => void;
  className?: string;
  attributes?: G.Attributes<"div">;
  mixin?: Mixin<{ padding: false; height: false }, CardProps["mixin"]>;
};

type ConditionalProps =
  // Prev / next pagination
  | {
      previousLabel: string;
      nextLabel: string;
      pageLabelPrefix: string;
      isLastPage?: boolean;
      ariaPreviousLabel?: string;
      ariaNextLabel?: string;
      showFirstPageButton?: never;
      firstPageButtonLabel?: never;
      ariaPageLabelPrefix?: never;
      totalPages?: never;
    }
  // Prev / next pagination with first-page-button
  | {
      previousLabel: string;
      nextLabel: string;
      pageLabelPrefix: string;
      isLastPage?: boolean;
      showFirstPageButton: boolean;
      firstPageButtonLabel: string;
      ariaPreviousLabel?: string;
      ariaNextLabel?: string;
      ariaPageLabelPrefix?: never;
      totalPages?: never;
    }
  // Pagination with page number links
  | {
      totalPages: number;
      ariaPageLabelPrefix: string;
      ariaPreviousLabel: string;
      ariaNextLabel: string;
      showFirstPageButton?: never;
      firstPageButtonLabel?: never;
      isLastPage?: never;
      previousLabel?: never;
      nextLabel?: never;
      pageLabelPrefix?: never;
    };
export type Props = {
  currentPage: number;
} & BaseProps &
  ConditionalProps;

export type ChangeArgs = {
  page: number;
};
