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
    tooltipForm?: string;
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

    private createImageTooltip() {
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

    private createWebsiteTooltip() {
        return createElement("div", { className: "widget-tooltip" },
            createElement("a", { href: this.props.websiteURL }, this.props.reference),
            createElement("div", { className: "box" },
                createElement("iframe", { src: this.props.websiteURL, className: "iFrame" })
            ),
            createElement(ReactTooltip, {})
        );
    }

    private createFormTooltip() {
        return createElement("div", { className: "widget-tooltip" },
            createElement("a", {  onMouseOver: this.props.handleHover, className: "formName" }, this.props.formText),
            createElement(ReactTooltip, {})
        );
    }
}
