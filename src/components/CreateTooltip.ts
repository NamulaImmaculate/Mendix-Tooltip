import { Component, createElement } from "react";
import * as ReactTooltip from "react-tooltip";
import { ContainerProps, ContainerState } from "./TooltipContainer";

export default class CreateTooltip extends Component<ContainerProps, ContainerState> {

    private createLinkTooltip() {
        return createElement("div", { className: "widget" },
            createElement("a", {
                "data-tip": this.state.tooltipText,
                "data-place": this.props.tooltipPosition,
                "data-type": this.props.bootstrapStyle,
                "data-effect": this.props.bootstrapEffect,
                "class": "linktext"
            }, this.state.linkText),
            createElement(ReactTooltip, { className: "toolTip" })
        );
    }

    private createImageTooltip() {
        return createElement("div", { className: "widget" },
            createElement("img", {
                "data-tip": this.state.imageTooltip,
                "data-place": this.props.tooltipPosition,
                "data-type": this.props.bootstrapStyle,
                "data-effect": this.props.bootstrapEffect,
                "class": "linktext",
                "src": this.state.imageUrl
            }),
            createElement(ReactTooltip, {})
        );
    }

    private createWebsiteTooltip() {
        return createElement("div", { className: "widget" },
            createElement("a", { href: this.state.websiteURL }, this.state.reference),
            createElement("div", { className: "box" },
                createElement("iframe", { src: this.state.websiteURL, className: "iFrame" })
            ),
            createElement(ReactTooltip, {})
        );
    }

    createTooltipByType() {
        if (this.props.tooltipType === "linkTooltip") {
            return this.createLinkTooltip();
        } else if (this.props.tooltipType === "imageTooltip") {
            return this.createImageTooltip();
        } else if (this.props.tooltipType === "webpageTooltip") {
            return this.createWebsiteTooltip();
        } else {
            return null;
        }
    }
}
