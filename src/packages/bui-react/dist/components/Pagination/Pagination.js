import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { isScreenSmall } from "@bookingcom/bui-core/utilities/helpers";
import { getPaginationSections } from "@bookingcom/bui-core/utilities/components/pagination";
import ArrowNavLeftIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavLeftIcon";
import ArrowNavRightIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavRightIcon";
import ArrowNavFirstPageIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavFirstPageIcon";
import Actionable from "../Actionable/index.js";
import Button from "../Button/index.js";
import Hidden from "../Hidden/index.js";
import Card from "../Card/index.js";
import InputSelect from "../InputSelect/index.js";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect.js";
import styles from "@bookingcom/bui-core/css/Pagination.module.css";
const Pagination = (props) => {
    const { totalPages, nextLabel, previousLabel, isLastPage, currentPage = 1, showFirstPageButton = false, firstPageButtonLabel, pageLabelPrefix, ariaPageLabelPrefix, ariaPreviousLabel, ariaNextLabel, select, infoLabel, onPageChange, attributes, className, mixin, } = props;
    const [mobile, setMobile] = React.useState(true);
    const rootClassName = classNames(styles.root, className);
    const handlePageChange = (page) => {
        const isValidPage = page > 0 && (!totalPages || page <= totalPages);
        if (onPageChange && isValidPage)
            onPageChange({ page });
    };
    const handlePreviousClick = (e) => {
        e.preventDefault();
        handlePageChange(currentPage - 1);
    };
    const handleNextClick = (e) => {
        e.preventDefault();
        handlePageChange(currentPage + 1);
    };
    const handleFirstPageClick = (e) => {
        e.preventDefault();
        handlePageChange(1);
    };
    const handlePageClick = (e, page) => {
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
    const renderArrow = (type) => {
        // totalPages == falsy is a discriminator for Numbered/Simplified model
        const isPrevious = type === "previous";
        const isNext = type === "next";
        const isLast = !totalPages ? isLastPage : currentPage === totalPages;
        const isDisabled = (isPrevious && (currentPage === 1 || !currentPage)) || (isNext && isLast);
        const className = classNames(styles.item, isPrevious ? styles.prevArrow : styles.nextArrow, isDisabled && styles["item--disabled"]);
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
        return (React.createElement("div", { className: className },
            React.createElement(Button, { attributes: { "aria-label": ariaLabel }, disabled: isDisabled, onClick: handler, variant: "tertiary", icon: icon, className: styles.navButton, ...buttonProps })));
    };
    const renderItem = (page) => {
        const isCurrent = page === currentPage;
        const itemClassName = classNames(styles.item, isCurrent && styles["item--active"]);
        return (React.createElement("li", { className: itemClassName, key: page },
            React.createElement(Actionable, { className: styles.link, attributes: {
                    "aria-label": `${ariaPageLabelPrefix} ${page}`,
                    ...(isCurrent ? { "aria-current": "page" } : {}),
                }, onClick: (e) => handlePageClick(e, page) }, page)));
    };
    const renderFirstPageButton = () => {
        if (totalPages || !showFirstPageButton || currentPage < 3) {
            return null;
        }
        return (React.createElement(Button, { attributes: { "aria-label": firstPageButtonLabel }, variant: "tertiary", icon: ArrowNavFirstPageIcon, className: styles.navButton, onClick: handleFirstPageClick }));
    };
    const renderSimplifiedNavigation = () => {
        return (React.createElement("div", { className: styles.list },
            renderFirstPageButton(),
            renderArrow("previous"),
            React.createElement("div", { className: styles.currentPage },
                pageLabelPrefix,
                " ",
                currentPage),
            renderArrow("next")));
    };
    const renderEllipsis = () => {
        return (React.createElement("li", { className: styles.item, "aria-hidden": "true" },
            React.createElement("span", { className: styles.separator }, "\u2026")));
    };
    const renderNavigation = () => {
        if (!totalPages || currentPage > totalPages)
            return null;
        const sections = getPaginationSections(currentPage, totalPages, mobile);
        return (React.createElement("div", null, totalPages && totalPages >= 1 && (React.createElement("div", { className: styles.list },
            renderArrow("previous"),
            React.createElement("div", { className: styles.pages },
                React.createElement("ol", { className: styles.list }, sections.map((section, index) => (React.createElement(React.Fragment, { key: section[0] },
                    index > 0 && renderEllipsis(),
                    section.map((page) => renderItem(page))))))),
            renderArrow("next")))));
    };
    const renderControls = () => {
        return (React.createElement(Hidden, { hide: { s: true, l: false } },
            React.createElement("div", { className: styles.controls },
                infoLabel && (React.createElement("span", { className: styles["controls-info-label"] }, infoLabel)),
                infoLabel && select && (React.createElement("div", { className: styles["controls-separator"] })),
                select && (React.createElement(InputSelect, { ...select, inputClassName: styles.control, className: styles.select })))));
    };
    return (React.createElement(Card, { attributes: { ...attributes, role: "navigation" }, fill: true, className: rootClassName, mixin: mixin },
        React.createElement("div", { className: styles.nav }, !totalPages ? renderSimplifiedNavigation() : renderNavigation()),
        renderControls()));
};
export default Pagination;
