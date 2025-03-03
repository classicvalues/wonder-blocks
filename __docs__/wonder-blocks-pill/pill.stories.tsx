import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {expect} from "@storybook/jest";

import {within, userEvent} from "@storybook/testing-library";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import Pill from "@khanacademy/wonder-blocks-pill";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {Body, BodySerif} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-search-field/package.json";

import PillArgtypes from "./pill.argtypes";

export default {
    component: Pill,
    title: "Pill",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: PillArgtypes,
} as Meta<typeof Pill>;

type StoryComponentType = StoryObj<typeof Pill>;

export const Default: StoryComponentType = {
    args: {children: "This is some text!", kind: "neutral"},
};

export const Clickable: StoryComponentType = () => (
    <View>
        <Pill
            kind="accent"
            size="large"
            onClick={() => {
                // eslint-disable-next-line no-alert
                alert("Click!");
            }}
        >
            With onClick
        </Pill>
    </View>
);

Clickable.parameters = {
    docs: {
        description: {
            story: `Pills can be made clickable by specifying the \`onClick\`
                prop. In this example, the pill has an \`onClick\`
                prop that triggers a window alert. Note that clickable
                pills also have an outline style on hover/click, whereas
                non-clickable pills do not.`,
        },
    },
};

export const Inline: StoryComponentType = () => (
    <View>
        <Body>
            Hello! This pill is{" "}
            <Pill kind="neutral" size="small">
                inline
            </Pill>
        </Body>
        <Strut size={Spacing.small_12} />
        <Body>
            This pill is also{" "}
            <Pill kind="neutral" size="small" onClick={() => {}}>
                inline (clickable)
            </Pill>
        </Body>
    </View>
);

Inline.parameters = {
    docs: {
        description: {
            story: `Pills can be used inline. Note that while both small and
                large pills can be used inline, it is recommended to use small
                pills when inline with body text since they fit within the
                line height whereas large pills do not.`,
        },
    },
};

export const Variants: StoryComponentType = () => {
    return (
        <View style={{flexDirection: "row"}}>
            {/* Non-clickable variants */}
            <View>
                <Pill
                    kind="neutral"
                    size="small"
                    testId="neutral-small-test-id"
                >
                    Neutral, small
                </Pill>
                <Strut size={Spacing.small_12} />
                <Pill kind="accent" size="small" testId="accent-small-test-id">
                    Accent, small
                </Pill>
                <Strut size={Spacing.small_12} />
                <Pill
                    kind="neutral"
                    size="large"
                    testId="neutral-large-test-id"
                >
                    Neutral, large
                </Pill>
                <Strut size={Spacing.small_12} />
                <Pill kind="accent" size="large" testId="accent-large-test-id">
                    Accent, large
                </Pill>
            </View>
            <Strut size={Spacing.large_24} />
            {/* Clickable variants */}
            <View>
                <Pill
                    kind="neutral"
                    size="small"
                    onClick={() => {}}
                    testId="neutral-small-clickable-test-id"
                >
                    Neutral, small, clickable
                </Pill>
                <Strut size={Spacing.small_12} />
                <Pill
                    kind="accent"
                    size="small"
                    onClick={() => {}}
                    testId="accent-small-clickable-test-id"
                >
                    Accent, small, clickable
                </Pill>
                <Strut size={Spacing.small_12} />
                <Pill
                    kind="neutral"
                    size="large"
                    onClick={() => {}}
                    testId="neutral-large-clickable-test-id"
                >
                    Neutral, large, clickable
                </Pill>
                <Strut size={Spacing.small_12} />
                <Pill
                    kind="accent"
                    size="large"
                    onClick={() => {}}
                    testId="accent-large-clickable-test-id"
                >
                    Accent, large, clickable
                </Pill>
            </View>
        </View>
    );
};

Variants.parameters = {
    docs: {
        description: {
            story: `There are two kinds of pills: neutral and accent.
                This can be specified using the \`kind\` prop.
                Neutral pills are gray, accent pills are blue. Pills can
                also be of two different sizes: small and large. By default,
                Small pills use Wonder Blocks \`LabelXSmall\` typography,
                and large pills use Wonder Blocks \`Body\`.`,
        },
    },
};

// Test visual styles
Variants.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const neutralSmall = canvas.getByTestId("neutral-small-test-id");
    const accentSmall = canvas.getByTestId("accent-small-test-id");
    const neutralLarge = canvas.getByTestId("neutral-large-test-id");
    const accentLarge = canvas.getByTestId("accent-large-test-id");

    // Clickable pills
    const neutralSmallClickable = canvas.getByTestId(
        "neutral-small-clickable-test-id",
    );
    const accentSmallClickable = canvas.getByTestId(
        "accent-small-clickable-test-id",
    );
    const neutralLargeClickable = canvas.getByTestId(
        "neutral-large-clickable-test-id",
    );
    const accentLargeClickable = canvas.getByTestId(
        "accent-large-clickable-test-id",
    );

    await expect(neutralSmall).toHaveStyle({
        backgroundColor: Color.offBlack8,
        color: Color.offBlack,
        fontSize: 12,
    });

    await expect(accentSmall).toHaveStyle({
        backgroundColor: Color.blue,
        color: Color.white,
        fontSize: 12,
    });

    await expect(neutralLarge).toHaveStyle({
        backgroundColor: Color.offBlack8,
        color: Color.offBlack,
        fontSize: 16,
    });

    await expect(accentLarge).toHaveStyle({
        backgroundColor: Color.blue,
        color: Color.white,
        fontSize: 16,
    });

    // Clickable styles
    await userEvent.tab();
    let computedStyle = getComputedStyle(neutralSmallClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(accentSmallClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(neutralLargeClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(accentLargeClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");
};

export const WithTypography: StoryComponentType = () => (
    <Pill size="large">
        <BodySerif>
            This is a {<Link href="#">link</Link>} inside the text of a pill.
        </BodySerif>
    </Pill>
);

WithTypography.parameters = {
    docs: {
        description: {
            story: `Pills can have Wonder Blocks Typography elements
                as children. In this example, the Pill has a Wonder Blocks
                Typography \`BodySerif\` component as its child.
                Note that this also allows you to include a link inside
                the text, as is shown here.`,
        },
    },
};

export const WithStyle: StoryComponentType = () => {
    const customStyle = {
        backgroundColor: Color.offBlack,
        color: Color.white,
        paddingLeft: Spacing.xxLarge_48,
        paddingRight: Spacing.xxLarge_48,

        ":hover": {
            outlineColor: Color.offBlack,
        },

        ":active": {
            outlineColor: Color.offBlack64,
            backgroundColor: Color.offBlack64,
        },
    };

    return (
        <Pill
            kind="neutral"
            size="small"
            style={customStyle}
            onClick={() => {}}
        >
            With Style
        </Pill>
    );
};

WithStyle.parameters = {
    docs: {
        description: {
            story: `The \`style\` prop can be used to customize the
                appearance of the pill. In this example, the pill has a
                custom background color, text color, and padding.
                In addition, this pill is clickable, and its hover
                and active styles have also been customized to match
                it new color.`,
        },
    },
};

export const InList: StoryComponentType = () => {
    const [selected, setSelected] = React.useState("Apple");
    const options = ["Apple", "Banana", "Orange"];

    return (
        <View>
            <View style={{flexDirection: "row"}}>
                {options.map((option) => (
                    <Pill
                        key={option}
                        size="large"
                        kind={option === selected ? "accent" : "neutral"}
                        onClick={() => setSelected(option)}
                        role="radio"
                        style={{marginRight: Spacing.xSmall_8}}
                    >
                        {option}
                    </Pill>
                ))}
            </View>
            <Strut size={Spacing.small_12} />
            <Body>You have selected: {selected}</Body>
        </View>
    );
};

InList.parameters = {
    docs: {
        description: {
            story: `This is an example of how pills may be used in a list.
                In this example, clicking on a pill selects it, and the
                selected pill is highlighted with an accent color. Also,
                the role has been set to \`"radio"\` to indicate that these
                pills are effectively behaving like a radio buttons.`,
        },
    },
};
