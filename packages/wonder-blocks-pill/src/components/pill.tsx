import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {StyleDeclaration} from "aphrodite";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import Color, {mix} from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, LabelXSmall} from "@khanacademy/wonder-blocks-typography";
import type {StyleType, AriaProps} from "@khanacademy/wonder-blocks-core";
import type {ClickableRole} from "@khanacademy/wonder-blocks-clickable";
import type {Typography} from "@khanacademy/wonder-blocks-typography";

type Props = AriaProps & {
    /**
     * The unique identifier for the pill.
     */
    id?: string;
    /**
     * The text to display within the pill.
     */
    children: string | React.ReactElement<React.ComponentProps<Typography>>;
    /**
     * Determines the color of the pill. Defaults to "neutral".
     * Neutral pills are gray, accent pills are blue.
     */
    kind?: "neutral" | "accent";
    /**
     * The size of the pill. Defaults to "small".
     * Size of pill. A small pill has more of a classic “badge”
     * look and fully fits within a line of body text inline,
     * whereas a large pill contains normal body font size.
     */
    size?: "small" | "large";
    /**
     * The role the pill should have depending on its behavior.
     * By default, it has none. If pill is Clickable, this is automatically
     * set to “button".
     *
     * Role should be set according to the pill's behavior. For example,
     * if the pill is used as a tab in a tabbed panel, set its role to "tab".
     * If pills are being selected or deselected from a list, they should
     * probably have a role of "checkbox".
     */
    role?: ClickableRole;
    /**
     * Called when the pill is clicked.
     */
    onClick?: () => unknown;
    /**
     * Custom styles to add to this pill component.
     */
    style?: StyleType;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
};

const PillInner = (props: {
    children: string | React.ReactElement<React.ComponentProps<Typography>>;
    size: "small" | "large";
}) => {
    const {children, size} = props;

    if (typeof children !== "string") {
        return children;
    }

    if (size === "small") {
        return <LabelXSmall>{props.children}</LabelXSmall>;
    }

    return <Body>{children}</Body>;
};

/**
 * A Pill component displays text in a rounded, colored container.
 * This is usually used to add label tags or indicate a status.
 *
 * ### Usage
 *
 * ```jsx
 * import Pill from "@khanacademy/wonder-blocks-pill";
 *
 * <Pill text="Hello, world!" />
 * ```
 */
const Pill = React.forwardRef(function Pill(
    props: Props,
    ref: React.ForwardedRef<HTMLElement | HTMLButtonElement>,
) {
    const {
        id,
        children,
        kind = "neutral",
        size = "small",
        role,
        onClick,
        style,
        testId,
    } = props;

    const wrapperSizeStyle =
        size === "small" ? pillStyles.wrapperSmall : pillStyles.wrapperLarge;
    const colorStyles = _generateColorStyles(!!onClick, kind, size);

    const defaultStyles = [
        pillStyles.wrapper,
        colorStyles.pill,
        wrapperSizeStyle,
    ];

    if (onClick) {
        return (
            <Clickable
                id={id}
                role={role}
                onClick={onClick}
                style={[defaultStyles, colorStyles.clickableWrapper, style]}
                testId={testId}
                ref={ref as React.ForwardedRef<HTMLButtonElement>}
            >
                {() => <PillInner size={size}>{children}</PillInner>}
            </Clickable>
        );
    }

    return (
        <View
            id={id}
            role={role}
            style={[defaultStyles, style]}
            testId={testId}
            ref={ref as React.ForwardedRef<HTMLElement>}
        >
            <PillInner size={size}>{children}</PillInner>
        </View>
    );
});

const styles: Record<string, any> = {};

const pillStyles = StyleSheet.create({
    wrapper: {
        display: "inline-flex",
        width: "fit-content",
    },
    wrapperSmall: {
        paddingLeft: Spacing.xSmall_8,
        paddingRight: Spacing.xSmall_8,
        borderRadius: Spacing.xxSmall_6,
    },
    wrapperLarge: {
        paddingLeft: Spacing.small_12,
        paddingRight: Spacing.small_12,
        paddingTop: Spacing.xxSmall_6,
        paddingBottom: Spacing.xxSmall_6,
        borderRadius: Spacing.large_24,
    },
});

const _generateColorStyles = (
    clickable: boolean,
    kind: "neutral" | "accent",
    size: "small" | "large",
) => {
    const pillType = `${kind}-${clickable.toString()}-${size.toString()}`;
    if (styles[pillType]) {
        return styles[pillType];
    }

    const activeAccentColor = mix(Color.offBlack32, Color.blue);

    const currentBackgroundColor =
        kind === "accent" ? Color.blue : Color.offBlack8;
    const currentTextColor = kind === "accent" ? Color.white : Color.offBlack;
    const currentActiveColor =
        kind === "accent" ? activeAccentColor : Color.offBlack16;

    const colorStyles: StyleDeclaration = {
        pill: {
            backgroundColor: currentBackgroundColor,
            color: currentTextColor,
        },
        clickableWrapper: {
            outline: "none",

            ":hover": {
                outline: `2px solid ${Color.blue}`,
                outlineOffset: Spacing.xxxxSmall_2,
            },
            ":active": {
                backgroundColor: currentActiveColor,
                outline: `2px solid ${activeAccentColor}`,
                outlineOffset: Spacing.xxxxSmall_2,
            },
            ":focus-visible": {
                outline: `2px solid ${Color.blue}`,
                outlineOffset: Spacing.xxxxSmall_2,
            },
        },
    };

    styles[pillType] = StyleSheet.create(colorStyles);
    return styles[pillType];
};

export default Pill;
