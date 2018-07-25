import { /*CSSProperties,*/ Component, createElement } from "react";
<<<<<<< HEAD
import { findDOMNode } from "react-dom";

import ReactTooltip from "react-tooltip";

=======
import * as ReactTooltip from "react-tooltip";
// import Tooltip from "rc-tooltip";
>>>>>>> 60de683175998a0628df388ea43ca5aeff43964d
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
    private meme: Element[] = [];
    render() {
<<<<<<< HEAD
        return createElement("div", {},
        createElement("p", { ref: "foo", dataTip: "tooltip" }, "Hello toolTip"),
        createElement("button", {
            onClick: () => { ReactTooltip.show(findDOMNode(this.refs.foo) as Element); }
        }));
    }

    componentDidMount() {
        this.meme.push(document.getElementsByClassName("dj_webkit dj_chrome dj_contentbox")[0] as Element);
=======
       return createElement("div", {},
                createElement("p", { "data-tip": this.props.tooltipText }, this.props.linktext),
                createElement(ReactTooltip, {})
        );
>>>>>>> 60de683175998a0628df388ea43ca5aeff43964d
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
