import { Component, createElement } from "react";
import * as ReactTooltip from "react-tooltip";
import "../ui/Tooltip.scss";

export interface WrapperProps {
    class: string;
    mxObject: mendix.lib.MxObject;
    mxform: mxui.lib.form._FormBase;
    style: string;
    readOnly: boolean;
    friendlyId: string;
}
export interface ContainerProps extends WrapperProps {
    tooltipText: string;
    linktext: string;
    url: string;
    callMicroflow?: string;
    callNanoflow?: Nanoflow;
    tooltipPosition: "top" | "right" | "bottom" | "left";
    bootstrapStyle: "dark" | "success" | "warning" | "error" | "info" | "light";
    bootstrapEffect: "float" | "solid";
    imageAttribute: string;
    tooltipType: "linkTooltip" | "imageTooltip" | "webpageTooltip";
    imageUrl: string;
    imageTooltip: string;
    reference: string;
    websiteURL: string;
    tooltipForm: mxui.lib.form._FormBase;
    formText: string;
    imageSourceType: string;
}

interface Nanoflow {
    nanoflow: any[];
    paramsSpec: {
        Progress: string;
    };
}

interface ContainerState {
    linkText?: string;
    tooltipText?: string;
    imageUrl?: string;
    imageTooltip?: string;
    websiteURL?: string;
    imageU?: string;
    reference?: string;
}

export default class TooltipContainer extends Component<ContainerProps, ContainerState> {

    readonly state: ContainerState = {
        linkText: "",
        tooltipText: "",
        imageUrl: "",
        imageTooltip: "",
        websiteURL: "",
        reference: ""
    };

    render() {
        return this.createTooltipByType();
    }

    componentWillReceiveProps(newProps: ContainerProps) {
        ReactTooltip.rebuild();
        this.fetchProps(newProps);
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

    private fetchProps(newProps: ContainerProps) {
        let imageSource = "";
        const { mxObject } = newProps;
        if (this.props.imageSourceType === "localDatabase") {
            imageSource = mx.data.getDocumentUrl(mxObject.getGuid(), mxObject.get("changedDate") as number, true);
        } else if (this.props.imageSourceType === "OnlineURL") {
            imageSource = mxObject.get(this.props.imageUrl) as string;
        }

        if (mxObject) {
            this.setState(
                {
                    linkText: mxObject.get(this.props.linktext) as string,
                    tooltipText: mxObject.get(this.props.tooltipText) as string,
                    imageUrl: imageSource,
                    imageTooltip: mxObject.get(this.props.imageTooltip) as string,
                    websiteURL: mxObject.get(this.props.websiteURL) as string,
                    reference: mxObject.get(this.props.reference) as string
                }
            );
        }
    }

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

    public static parseStyle(style = ""): { [key: string]: string } {
        try {
            return style.split(";").reduce<{ [key: string]: string }>((styleObject, line) => {
                const pair = line.split(":");
                if (pair.length === 2) {
                    const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                    styleObject[name] = pair[1].trim();
                }
                return styleObject;
            }, {});
        } catch (error) {
            TooltipContainer.logError("Failed to parse style", style, error);
        }

        return {};
    }

    public static logError(message: string, style?: string, error?: any) {
        // tslint:disable-next-line:no-console
        window.logger ? window.logger.error(message) : console.log(message, style, error);
    }
}
