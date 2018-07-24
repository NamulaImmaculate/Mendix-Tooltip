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
    callNanoflow?: string;
    tooltipPosition: "top" | "right" | "bottom" | "left" ;
}

export default class TooltipContainer extends Component<WrapperProps> {
    render() {
<<<<<<< HEAD
       return createElement("div", {},
<<<<<<< HEAD
                createElement("p", { "data-tip": this.props.tooltipText, "data-place": this.props.tooltipPosition }, this.props.linktext),
=======
                createElement("p", { "data-tip": this.props.tooltipText }, this.props.linktext),
=======
       return createElement("div", { className: "tooltipContainer" },
                createElement("p", { "data-tip": "voiillaaa it worked", "data-type": "warning" }, "hover over me"),
>>>>>>> commit before a pull
>>>>>>> commit before a pull
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
