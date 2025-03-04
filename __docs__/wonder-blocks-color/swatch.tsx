import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {
    Caption,
    LabelLarge,
    LabelSmall,
    LabelXSmall,
} from "@khanacademy/wonder-blocks-typography";

import Color from "@khanacademy/wonder-blocks-color";

type Segments = 1 | 2 | 3;

const UseType = {
    text: {
        content: "Aa",
        label: "Text & Icons",
    },
    icons: {
        content: <Icon icon={icons.hint} />,
        label: "Icons",
    },
} as const;

/**
 * Get the color swatch information for a given color and segment count.
 */
const getColorSegments = (segments: Segments, color: string, dark: boolean) => {
    switch (segments) {
        case 1:
            return [
                {
                    foreground: dark ? color : Color.white64,
                    background: dark ? Color.darkBlue : color,
                },
            ];
        case 2:
            return [
                {
                    foreground: color,
                    background: color,
                },
                {
                    foreground: color,
                    background: Color.darkBlue,
                },
            ];
        case 3:
        default:
            return [
                {
                    foreground: Color.white,
                    background: color,
                },
                {
                    foreground: color,
                    background: Color.offWhite,
                },
                {
                    foreground: color,
                    background: Color.white,
                },
            ];
    }
};

type Props = {
    color: string;
    name: string;
    description: string;
    use?: "text" | "icons" | null;
    segments: Segments;
    dark: boolean;
    displayColor: boolean;
};

export const Swatch = ({
    name,
    color,
    use,
    description,
    segments = 3,
    dark = false,
    displayColor = false,
}: Props): React.ReactElement => {
    const maybeRenderUseLabel = () => {
        if (!use) {
            return null;
        }
        return (
            <LabelSmall style={styles.usage}>
                Use in: <strong>{UseType[use].label}</strong>
            </LabelSmall>
        );
    };

    const renderSegments = () => {
        return getColorSegments(segments, color, dark).map((color, index) => (
            <View
                key={index}
                style={[
                    styles.swatchItem,
                    {
                        color: color.foreground,
                        backgroundColor: color.background,
                    },
                ]}
            >
                {use ? <LabelLarge>{UseType[use]?.content}</LabelLarge> : null}
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <LabelLarge>{name}</LabelLarge>
                <LabelXSmall style={styles.tag}>{color}</LabelXSmall>
                <Caption>{description}</Caption>
                {maybeRenderUseLabel()}
            </View>
            <View style={styles.swatch}>{renderSegments()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        color: Color.offBlack,
        flexDirection: "row",
        marginBottom: Spacing.xLarge_32,
    },
    info: {
        alignItems: "flex-start",
        flexBasis: "30%",
    },
    tag: {
        background: Color.offWhite,
        border: `solid 1px ${Color.offBlack8}`,
        borderRadius: Spacing.xxxxSmall_2,
        margin: `${Spacing.xxxSmall_4}px 0`,
        padding: `0 ${Spacing.xxxSmall_4}px`,
    },
    usage: {
        color: Color.offBlack64,
    },
    swatch: {
        flexDirection: "row",
        flexBasis: "70%",
        borderRadius: Spacing.xxxSmall_4,
        background: Color.white,
        boxShadow: `0 1px ${Spacing.xxxSmall_4}px 0 ${Color.offBlack8}`,
        border: `1px solid ${Color.offBlack16}`,
        overflow: "hidden",
        height: Spacing.xxxLarge_64,
    },
    swatchItem: {
        gap: Spacing.medium_16,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: Spacing.medium_16,
    },
});
