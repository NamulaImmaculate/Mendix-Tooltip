import { Component, createElement } from "react";
import * as ReactTooltip from "react-tooltip";

export interface TooltipProps {
    tooltipType?: string;
    tooltipText?: string;
    tooltipPosition?: string;
    bootstrapStyle?: string;
    bootstrapEffect?: string;
    linkText?: string;
    imageTooltip?: string;
    imageUrl?: string;
    websiteURL?: string;
    reference?: string;
    formText?: string;
    handleHover?: () => void;
}

export default class Tooltip extends Component<TooltipProps> {
    render() {
        return this.createTooltipByType();
    }

    private createTooltipByType() {
        if (this.props.tooltipType === "linkTooltip") {
            return this.createLinkTooltip();
        } else if (this.props.tooltipType === "imageTooltip") {
            return this.createImageTooltip();
        } else if (this.props.tooltipType === "webpageTooltip") {
            return this.createWebsiteTooltip();
        } else if (this.props.tooltipType === "formTooltip") {
            return this.createFormTooltip();
        } else {
            return null;
        }
    }

    private createLinkTooltip() {
        if (this.props.tooltipText && this.props.linkText) {
            if (!this.props.tooltipText.trim()) {
                return createElement("div", { className: "error" }, "Please enter a valid tooltip text!");
            } else if (!this.props.linkText.trim()) {
                return createElement("div", { className: "error" }, "Please enter a valid text to display!");
            } else {
                return createElement("div", { className: "widget-tooltip" },
                    createElement("a", {
                        "data-tip": this.props.tooltipText,
                        "data-place": this.props.tooltipPosition,
                        "data-type": this.props.bootstrapStyle,
                        "data-effect": this.props.bootstrapEffect,
                        "class": "linktext"
                    }, this.props.linkText),
                    createElement(ReactTooltip, { className: "toolTip" })
                );
            }
        } else {
            return createElement("div", { className: "error" }, "Please select all attributes for the link tooltip!");
        }
    }

    private createImageTooltip() {
        if (this.props.imageTooltip && this.props.imageUrl) {
            if (!this.props.imageTooltip.trim()) {
                return createElement("div", { className: "error" }, "Please enter a valid tooltip text!");
            } else if (!this.props.imageUrl.trim()) {
                return createElement("div", { className: "error" }, "Please enter a valid image source!");
            } else {
                return createElement("div", { className: "widget-tooltip" },
                    createElement("img", {
                        "data-tip": this.props.imageTooltip,
                        "data-place": this.props.tooltipPosition,
                        "data-type": this.props.bootstrapStyle,
                        "data-effect": this.props.bootstrapEffect,
                        "class": "linktext",
                        "src": this.props.imageUrl
                    }),
                    createElement(ReactTooltip, {})
                );
            }
        } else {
            return createElement("div", { className: "error" }, "Please select all attributes for the image tooltip!");
        }
    }

    private createWebsiteTooltip() {
        if (this.props.websiteURL && this.props.reference) {
            if (!this.props.websiteURL.trim()) {
                return createElement("div", { className: "error" }, "Please enter a valid URL!");
            } else if (!this.props.reference.trim()) {
                return createElement("div", { className: "error" }, "Please enter a valid text to display!");
            } else {
                return createElement("div", { className: "widget-tooltip" },
                    createElement("a", { href: this.props.websiteURL }, this.props.reference),
                    createElement("div", { className: "box" },
                        createElement("iframe", { src: this.props.websiteURL, className: "iFrame" })
                    ),
                    createElement(ReactTooltip, {})
                );
            }
        } else {
            return createElement("div", { className: "error" }, "Please select all attributes for the website tooltip!");
        }
    }

    private createFormTooltip() {
        if (this.props.formText) {
            if (!this.props.formText.trim()) {
                return createElement("div", { className: "error" }, "Please enter a valid text to display!");
            } else {
                return createElement("div", { className: "widget-tooltip" },
                    createElement("a", { onMouseOver: this.props.handleHover, className: "formName" }, this.props.formText),
                    createElement(ReactTooltip, {})
                );
            }
        } else {
            return createElement("div", { className: "error" }, "Please fill in all fields for the form tooltip!");
        }
    }
}
