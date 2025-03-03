import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View, addStyle} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

const heights = {
    xsmall: 16,
    small: 24,
    medium: 48,
    large: 96,
} as const;

const paths = {
    xsmall: "M7.237.741C7.165.393 6.95.154 6.656.053A1.01 1.01 0 0 0 6.18.01c-.053.009-.053.009-.087.017C2.553.949 0 4.214 0 7.91 0 12.36 3.598 16 8 16c4.4 0 8-3.647 8-8.112a1.02 1.02 0 0 0-.118-.423.877.877 0 0 0-.808-.48.909.909 0 0 0-.81.46c-.09.151-.13.296-.146.455-.08 3.493-2.737 6.207-6.118 6.207-3.41 0-6.118-2.74-6.118-6.196 0-2.843 1.936-5.291 4.644-6.022.1-.028.224-.082.352-.177a.928.928 0 0 0 .36-.97z",
    small: "M10.598.943c-.093-.449-.362-.748-.732-.875a1.314 1.314 0 0 0-.723-.033C3.83 1.417 0 6.317 0 11.864 0 18.538 5.398 24 12 24c6.598 0 12-5.471 12-12.16a1.333 1.333 0 0 0-.154-.548c-.193-.368-.544-.606-1.023-.606-.472 0-.825.229-1.035.585-.117.2-.169.39-.189.582-.124 5.472-4.294 9.73-9.599 9.73-5.349 0-9.599-4.3-9.599-9.72 0-4.46 3.036-8.299 7.28-9.444.127-.036.291-.107.458-.232.373-.28.57-.711.46-1.244z",
    medium: "M44.19 23.455a1.91 1.91 0 1 1 3.801 0h.003c.004.18.006.363.006.545 0 13.255-10.745 24-24 24S0 37.255 0 24 10.745 0 24 0c.182 0 .364.002.545.006V.01a1.91 1.91 0 1 1 0 3.801v.015A20.564 20.564 0 0 0 24 3.818C12.854 3.818 3.818 12.854 3.818 24c0 11.146 9.036 20.182 20.182 20.182 11.146 0 20.182-9.036 20.182-20.182 0-.182-.003-.364-.007-.545h.015z",
    large: "M88.38 46.91a3.818 3.818 0 1 1 7.602 0h.006c.008.362.012.725.012 1.09 0 26.51-21.49 48-48 48S0 74.51 0 48 21.49 0 48 0c.365 0 .728.004 1.09.012v.005a3.818 3.818 0 1 1 0 7.602v.032c-.362-.01-.725-.015-1.09-.015C25.708 7.636 7.636 25.708 7.636 48c0 22.292 18.072 40.364 40.364 40.364 22.292 0 40.364-18.072 40.364-40.364 0-.365-.005-.728-.015-1.09h.032z",
} as const;

const colors = {
    light: Color.white,
    dark: Color.offBlack16,
} as const;

const StyledPath = addStyle("path");

type Props = AriaProps & {
    /**
     * The size of the spinner. (large = 96px, medium = 48px, small = 24px,
     * xsmall = 16px)
     */
    size: "xsmall" | "small" | "medium" | "large";
    /** Should a light version of the spinner be shown?
     * (To be used on a dark background.)
     */
    light: boolean;
    /** Any (optional) styling to apply to the spinner container. */
    style?: StyleType;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

type DefaultProps = {
    light: Props["light"];
    size: Props["size"];
};

/**
 * A circular progress spinner. Used for indicating loading progress. Should
 * be used by default in most places where a loading indicator is needed.
 *
 * ### Usage
 *
 * ```js
 * import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
 *
 * <CircularSpinner />
 * ```
 */
export default class CircularSpinner extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        size: "large",
        light: false,
    };

    render(): React.ReactNode {
        const {size, light, style, testId} = this.props;

        const height = heights[size];
        const path = paths[size];
        const color = light ? colors.light : colors.dark;

        const svg = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={height}
                height={height}
                viewBox={`0 0 ${height} ${height}`}
                data-test-id={testId}
            >
                <StyledPath
                    style={[styles.loadingSpinner, {fill: color}]}
                    fillRule="nonzero"
                    d={path}
                />
            </svg>
        );

        return <View style={[styles.spinnerContainer, style]}>{svg}</View>;
    }
}

const rotateKeyFrames = {
    "0%": {
        transform: "rotate(0deg)",
    },
    "50%": {
        transform: "rotate(180deg)",
    },
    "100%": {
        transform: "rotate(360deg)",
    },
} as const;

const styles = StyleSheet.create({
    spinnerContainer: {
        justifyContent: "center",
    },
    loadingSpinner: {
        transformOrigin: "50% 50%",
        // @ts-expect-error [FEI-5019]: `animationName` expects a string not an object.
        animationName: rotateKeyFrames,
        animationDuration: "1.1s",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
    },
});
