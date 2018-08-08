import { Component, /*createElement */createElement } from "react";
import * as ReactTooltip from "react-tooltip";
import "../ui/Tooltip.scss";
import Tooltip from "./Tooltip";

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
    tooltipPosition: "top" | "right" | "bottom" | "left";
    bootstrapStyle: "dark" | "success" | "warning" | "error" | "info" | "light";
    bootstrapEffect: "float" | "solid";
    imageAttribute: string;
    tooltipType: "linkTooltip" | "imageTooltip" | "webpageTooltip" | "formTooltip";
    openPageAs: "modal" | "popup";
    imageUrl: string;
    imageTooltip: string;
    reference: string;
    websiteURL: string;
    tooltipForm: string;
    formText: string;
    imageSourceType: string;
}

export interface ContainerState {
    linkText?: string;
    tooltipText?: string;
    imageUrl?: string;
    imageTooltip?: string;
    websiteURL?: string;
    imageU?: string;
    reference?: string;
    formText?: string;
    tooltipForm?: string;
}

export default class TooltipContainer extends Component<ContainerProps, ContainerState> {

    readonly state: ContainerState = {
        linkText: "",
        tooltipText: "",
        imageUrl: "",
        imageTooltip: "",
        websiteURL: "",
        reference: "",
        formText: "",
        tooltipForm: ""
    };

    render() {
        return createElement(Tooltip,
            {
                tooltipType: this.props.tooltipType,
                tooltipText: this.state.tooltipText,
                tooltipPosition: this.props.tooltipPosition,
                bootstrapStyle: this.props.bootstrapStyle,
                bootstrapEffect: this.props.bootstrapEffect,
                linkText: this.state.linkText,
                imageTooltip: this.state.imageTooltip,
                imageUrl: this.state.imageUrl,
                websiteURL: this.state.websiteURL,
                reference: this.state.reference,
                formText: this.state.formText,
                handleHover: this.handleHover
            }
        );
    }

    componentWillReceiveProps(newProps: ContainerProps) {
        ReactTooltip.rebuild();
        this.fetchProps(newProps);
    }

    private fetchProps(newProps: ContainerProps) {
        let imageSource = "";
        const { mxObject } = newProps;
        if (this.props.imageSourceType === "localDatabase") {
            imageSource = mx.data.getDocumentUrl(mxObject.getGuid(), mxObject.get("changedDate") as number, true);
        } else if (this.props.imageSourceType === "OnlineURL") {
            imageSource = mxObject.get(this.props.imageUrl) as string;
        }

        const linkText = mxObject.get(this.props.linktext) as string;
        const tooltipText = mxObject.get(this.props.tooltipText) as string;
        const imageUrl = imageSource;
        const imageTooltip = mxObject.get(this.props.imageTooltip) as string;
        const websiteURL = mxObject.get(this.props.websiteURL) as string;
        const reference = mxObject.get(this.props.reference) as string;
        const formText = mxObject.get(this.props.formText) as string;
        const tooltipForm = mxObject.get(this.props.tooltipForm) as string;

        if (mxObject) {
            this.setState(
                {
                    linkText,
                    tooltipText,
                    imageUrl,
                    imageTooltip,
                    websiteURL,
                    reference,
                    formText,
                    tooltipForm
                }
            );
        }
    }

    private handleHover = () => {
        window.mx.ui.openForm(this.props.tooltipForm, {
            location: this.props.openPageAs,
            error: error => window.mx.ui.error(
                `An error occurred while opening form ${this.props.tooltipForm} : ${error.message}`)
        });
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
