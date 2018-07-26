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
    callMicroflow?: string;
    callNanoflow?: Nanoflow;
    tooltipPosition: "top" | "right" | "bottom" | "left";
    bootstrapStyle: "dark" | "success" | "warning" | "error" | "info" | "light";
    bootstrapEffect: "float" | "solid";
    imageAttribute: string;
}

interface Nanoflow {
    nanoflow: any[];
    paramsSpec: {
        Progress: string;
    };
}

export default class TooltipContainer extends Component<WrapperProps> {
    render() {

        return createElement("div", { className: "widget" },
            createElement("a", {
                "data-tip": this.props.tooltipText,
                "data-place": this.props.tooltipPosition,
                "data-type": this.props.bootstrapStyle,
                "data-effect": this.props.bootstrapEffect,
                "class": "linktext"
            }, this.props.linktext),
            createElement(ReactTooltip, {}),
            createElement("a", { href: "https://www.betpawa.ug" }, "      Money is here"),
                createElement("div", { className: "box" },
                    createElement("iframe", { src: "https://www.betpawa.ug", className: "iFrame" })
            ),
                createElement("img", {
                    "src": this.getImageUrl(),
                    "alt": "My Car eyes",
                    "data-tip": "this is the image tooltip working"
                })
        );
    }

    private b64toBlob = (b64Data: any, contentType: string, sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    private getImageUrl = () => {
        const contentType = "image/png";
        const b64Data = "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";

        const blob = this.b64toBlob(b64Data, contentType);
        return URL.createObjectURL(blob);
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
