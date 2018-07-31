import { /*CSSProperties,*/ Component, createElement } from "react";
import * as ReactTooltip from "react-tooltip";
import "../ui/Tooltip.scss";

export interface WrapperProps {
    class: string;
    mxObject: mendix.lib.MxObject;
    mxform: mxui.lib.form._FormBase;
    style: string;
    readOnly: boolean;
    friendlyId: string;
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
}

// type PageLocation = "popup" | "modal" | "content";

interface Nanoflow {
    nanoflow: any[];
    paramsSpec: {
        Progress: string;
    };
}

export default class TooltipContainer extends Component<WrapperProps> {

    render() {
        return this.setTooltipType();
    }

    setTooltipType() {
        if (this.props.tooltipType === "linkTooltip" && this.props.tooltipText && this.props.linktext) {
            return createElement("div", { className: "widget" },
                createElement("a", {
                    "data-tip": this.props.tooltipText,
                    "data-place": this.props.tooltipPosition,
                    "data-type": this.props.bootstrapStyle,
                    "data-effect": this.props.bootstrapEffect,
                    "class": "linktext"
                    }, this.props.linktext),
                createElement(ReactTooltip, { className: "toolTip" })
            );
        } else if (this.props.tooltipType === "imageTooltip" && this.props.imageUrl && this.props.imageTooltip) {
            return createElement("div", { className: "widget" },
            createElement("img", {
                "data-tip": this.props.imageUrl,
                "data-place": this.props.tooltipPosition,
                "data-type": this.props.bootstrapStyle,
                "data-effect": this.props.bootstrapEffect,
                "class": "linktext",
                "src": this.props.imageUrl
                }),
            createElement(ReactTooltip, {})
        );
        } else if (this.props.tooltipType === "webpageTooltip" && this.props.reference && this.props.websiteURL) {
            return createElement("div", { className: "widget" },
                        createElement("a", { href: this.props.websiteURL }, this.props.reference),
                        createElement("div", { className: "box" },
                            createElement("iframe", { src: this.props.websiteURL, className: "iFrame" })
                        ),
                    createElement(ReactTooltip, {})
        );
        } else {
            return null;
        }
    }

    // private showPage() {
    //     // const context = this.getContext(this.props.formText);
    //     window.mx.ui.openForm(this.props.tooltipForm, {
    //     location: "popup",
    //     error: error => window.mx.ui.error(
    //         `An error occurred while opening form ${this.props.tooltipForm} : ${error.message}`
    //     )
    //     });
    // }

    public static parseStyle(style = ""): { [key: string]: string; } {
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
