import { /*CSSProperties,*/ Component, createElement } from "react";

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
}

export default class TooltipContainer extends Component<WrapperProps> {
    render() {
        return createElement("div", { className: "tooltip" }, this.props.linktext,
            createElement("span", { className: "tooltiptext" }, this.props.tooltipText)
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
