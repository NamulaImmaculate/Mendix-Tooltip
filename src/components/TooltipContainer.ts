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
    tooltipPosition: "top" | "right" | "bottom" | "left" ;
    bootstrapStyle: "dark" | "success" | "warning" | "error" | "info" | "light";
    bootstapEffect: "float" | "solid";
}

interface Nanoflow {
    nanoflow: any[];
    paramsSpec: {
        Progress: string;
    };
}

export default class TooltipContainer extends Component<WrapperProps> {
    render() {

       return createElement("div", {},
                createElement("p", {
                    "data-tip": this.props.tooltipText,
                    "data-place": this.props.tooltipPosition,
                    "data-type": this.props.bootstrapStyle,
                    "data-effect": this.props.bootstapEffect,
                    "onClick": this.handleChanges.bind(this)
                },
                this.props.linktext),
                createElement(ReactTooltip, {})
        );
    }

    private handleChanges(_event: Event) {
        const { mxform, callMicroflow, callNanoflow } = this.props;
        if (callMicroflow) {
            mx.data.action({
                params: {
                    applyto: "None",
                    actionname: callMicroflow
                },
                origin: mxform,
                callback: () => undefined,
                error: () => {
                    mx.ui.error("Microflow working (just testing)");
                }
            });
        }

        if (callNanoflow && callNanoflow.nanoflow && this.props.mxObject) {
            const context = new mendix.lib.MxContext();

            mx.data.callNanoflow({
            nanoflow: callNanoflow,
            origin: mxform,
            context,
            callback: () => undefined
            });
        }
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
