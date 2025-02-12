import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { range, isScreenSmall } from "@bookingcom/bui-core/utilities/helpers";
import ArrowNavLeftIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavLeftIcon";
import ArrowNavRightIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavRightIcon";
import ArrowNavFirstPageIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavFirstPageIcon";
import Actionable from "components/Actionable";
import Button from "components/Button";
import Hidden from "components/Hidden";
import Card from "components/Card";
import InputSelect from "components/InputSelect";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import type * as T from "./Pagination.types";
import styles from "@bookingcom/bui-core/css/Pagination.module.css";

const Pagination = (props: T.Props) => {
  const {
    totalPages,
    nextLabel,
    previousLabel,
    isLastPage,
    currentPage = 1,
    showFirstPageButton = false,
    firstPageButtonLabel,
    pageLabelPrefix,
    ariaPageLabelPrefix,
    ariaPreviousLabel,
    ariaNextLabel,
    select,
    infoLabel,
    onPageChange,
    attributes,
    className,
    mixin,
  } = props;

  const [mobile, setMobile] = React.useState(true);
  const rootClassName = classNames(styles.root, className);

  const handlePageChange = (page: number) => {
    const isValidPage = page > 0 && (!totalPages || page <= totalPages);
    if (onPageChange && isValidPage) onPageChange({ page });
  };

  const handlePreviousClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    handlePageChange(currentPage - 1);
  };

  const handleNextClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    handlePageChange(currentPage + 1);
  };

  const handleFirstPageClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    handlePageChange(1);
  };

  const handlePageClick = (
    e: React.MouseEvent | React.KeyboardEvent,
    page: number
  ) => {
    e.preventDefault();
    handlePageChange(page);
  };

  const handleResize = () => setMobile(isScreenSmall());

  useIsomorphicLayoutEffect(() => {
    handleResize();
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  });

  const renderArrow = (type: "previous" | "next") => {
    // totalPages == falsy is a discriminator for Numbered/Simplified model
    const isPrevious = type === "previous";
    const isNext = type === "next";
    const isLast = !totalPages ? isLastPage : currentPage === totalPages;
    const isDisabled =
      (isPrevious && (currentPage === 1 || !currentPage)) || (isNext && isLast);

    const className = classNames(
      styles.item,
      isPrevious ? styles.prevArrow : styles.nextArrow,
      isDisabled && styles["item--disabled"]
    );
    const ariaLabel = type === "previous" ? ariaPreviousLabel : ariaNextLabel;
    const handler = isPrevious ? handlePreviousClick : handleNextClick;
    const icon = isPrevious ? ArrowNavLeftIcon : ArrowNavRightIcon;
    const buttonProps = !totalPages
      ? {
          ...(isNext
            ? { text: nextLabel, iconPosition: "end" }
            : { text: previousLabel }),
        }
      : {};

    return (
      <div className={className}>
        <Button
          attributes={{ "aria-label": ariaLabel }}
          disabled={isDisabled}
          onClick={handler}
          variant="tertiary"
          icon={icon}
          className={styles.navButton}
          {...buttonProps}
        />
      </div>
    );
  };

  const renderItem = (page: number) => {
    const isCurrent = page === currentPage;
    const itemClassName = classNames(
      styles.item,
      isCurrent && styles["item--active"]
    );

    return (
      <li className={itemClassName} key={page}>
        <Actionable
          className={styles.link}
          attributes={{
            "aria-label": `${ariaPageLabelPrefix} ${page}`,
            ...(isCurrent ? { "aria-current": "page" } : {}),
          }}
          onClick={(e) => handlePageClick(e, page)}
        >
          {page}
        </Actionable>
      </li>
    );
  };

  const renderFirstPageButton = () => {
    if (totalPages || !showFirstPageButton || currentPage < 3) {
      return null;
    }

    return (
      <Button
        attributes={{ "aria-label": firstPageButtonLabel }}
        variant="tertiary"
        icon={ArrowNavFirstPageIcon}
        className={styles.navButton}
        onClick={handleFirstPageClick}
      />
    );
  };

  const renderSimplifiedNavigation = () => {
    return (
      <div className={styles.list}>
        {renderFirstPageButton()}
        {renderArrow("previous")}

        <div className={styles.currentPage}>
          {pageLabelPrefix} {currentPage}
        </div>

        {renderArrow("next")}
      </div>
    );
  };

  const renderEllipsis = () => {
    return (
      <li className={styles.item} aria-hidden="true">
        <span className={styles.separator}>&hellip;</span>
      </li>
    );
  };

  const renderNavigation = () => {
    if (!totalPages || currentPage > totalPages) return null;

    const sections = [];
    const maxLength = {
      body: mobile ? 3 : 7,
      side: mobile ? 1 : 2,
    };

    const bodyOffset = (maxLength.body - 1) / 2;
    // side + half of the body excluding current page + ellipsis minimum count
    // ellipsis is not shown just for 1 collapsed page
    const minEllipsisOffset = maxLength.side + bodyOffset + 2;
    const hasHead = currentPage > minEllipsisOffset;
    const hasTail = totalPages - currentPage + 1 > minEllipsisOffset;

    if (hasHead) sections.push(range(1, maxLength.side + 1));
    sections.push(
      range(
        !hasHead ? 1 : currentPage - bodyOffset,
        (!hasTail ? totalPages : currentPage + bodyOffset) + 1
      )
    );
    if (hasTail) {
      sections.push(range(totalPages - maxLength.side + 1, totalPages + 1));
    }

    return (
      <div>
        {totalPages && totalPages >= 1 && (
          <div className={styles.list}>
            {renderArrow("previous")}

            <div className={styles.pages}>
              <ol className={styles.list}>
                {sections.map((section, index) => (
                  <React.Fragment key={section[0]}>
                    {index > 0 && renderEllipsis()}
                    {section.map((page) => renderItem(page))}
                  </React.Fragment>
                ))}
              </ol>
            </div>

            {renderArrow("next")}
          </div>
        )}
      </div>
    );
  };

  const renderControls = () => {
    return (
      <Hidden below="large">
        <div className={styles.controls}>
          {infoLabel && (
            <span className={styles["controls-info-label"]}>{infoLabel}</span>
          )}
          {infoLabel && select && (
            <div className={styles["controls-separator"]} />
          )}
          {select && (
            <InputSelect
              {...select}
              inputClassName={styles.control}
              className={styles.select}
            />
          )}
        </div>
      </Hidden>
    );
  };

  return (
    <Card
      attributes={{ ...attributes, role: "navigation" }}
      fill
      className={rootClassName}
      mixin={mixin}
    >
      <div className={styles.nav}>
        {!totalPages ? renderSimplifiedNavigation() : renderNavigation()}
      </div>
      {renderControls()}
    </Card>
  );
};

export default Pagination;
