import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {
    getClickableBehavior,
    isClientSideUrl,
} from "@khanacademy/wonder-blocks-clickable";
import {addStyle} from "@khanacademy/wonder-blocks-core";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import {DROPDOWN_ITEM_HEIGHT} from "../util/constants";

const {blue, white, offBlack, offBlack32} = Color;

type ActionProps = {
    /**
     * Display text of the action item.
     */
    label: string;
    /**
     * Whether this action item is disabled.
     */
    disabled: boolean;
    /**
     * URL to navigate to.
     *
     * Note: Either href or onClick must be defined
     */
    href?: string;
    /**
     * Optional attribute to indicate to the Screen Reader which language the
     * item text is in.
     */
    lang?: string;
    /**
     * A target destination window for a link to open in.
     *
     * TODO(WB-1262): only allow this prop when `href` is also set.t
     */
    target?: "_blank";
    /**
     * Whether to avoid using client-side navigation.
     *
     * If the URL passed to href is local to the client-side, e.g.
     * /math/algebra/eval-exprs, then it tries to use react-router-dom's Link
     * component which handles the client-side navigation. You can set
     * `skipClientNav` to true avoid using client-side nav entirely.
     *
     * NOTE: All URLs containing a protocol are considered external, e.g.
     * https://khanacademy.org/math/algebra/eval-exprs will trigger a full
     * page reload.
     */
    skipClientNav?: boolean;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Function to call when button is clicked.
     *
     * This callback should be used for things like marking BigBingo
     * conversions. It should NOT be used to redirect to a different URL or to
     * prevent navigation via e.preventDefault(). The event passed to this
     * handler will have its preventDefault() and stopPropagation() methods
     * stubbed out.
     *
     * Note: onClick is optional if href is present, but must be defined if
     * href is not
     */
    onClick?: () => unknown;
    /**
     * Whether this item should be indented to have menu items left-align in
     * text when an ActionItem is used in the same menu as items that have
     * checks or checkboxes. Auto-populated by menu.
     * @ignore
     */
    indent: boolean;
    /**
     * Aria role to use, defaults to "menuitem".
     */
    role: "menuitem" | "option";
    /**
     * In case we use react-window, this needs to be added in order to inject
     * styles to calculate the position
     * @ignore
     */
    style?: StyleType;
};

type DefaultProps = {
    disabled: ActionProps["disabled"];
    indent: ActionProps["indent"];
    role: ActionProps["role"];
};

const StyledAnchor = addStyle("a");
const StyledButton = addStyle("button");
const StyledLink = addStyle(Link);

/**
 * The action item trigger actions, such as navigating to a different page or
 * opening a modal. Supply the href and/or onClick props. Used as a child of
 * ActionMenu.
 */
export default class ActionItem extends React.Component<ActionProps> {
    static isClassOf(instance: React.ReactElement<any>): boolean {
        // @ts-expect-error [FEI-5019] - TS2339 - Property '__IS_ACTION_ITEM__' does not exist on type 'string | JSXElementConstructor<any>'.
        return instance && instance.type && instance.type.__IS_ACTION_ITEM__;
    }
    static defaultProps: DefaultProps = {
        disabled: false,
        indent: false,
        role: "menuitem",
    };
    static __IS_ACTION_ITEM__ = true;

    renderClickableBehavior(router: any): React.ReactNode {
        const {
            skipClientNav,
            disabled,
            href,
            target,
            indent,
            label,
            lang,
            onClick,
            role,
            style,
            testId,
        } = this.props;

        const ClickableBehavior = getClickableBehavior(
            href,
            skipClientNav,
            router,
        );

        return (
            <ClickableBehavior
                disabled={disabled}
                onClick={onClick}
                href={href}
                role={role}
                target={target}
            >
                {(state, childrenProps) => {
                    const {pressed, hovered, focused} = state;

                    const defaultStyle = [
                        styles.shared,
                        disabled && styles.disabled,
                        !disabled &&
                            (pressed
                                ? styles.active
                                : (hovered || focused) && styles.focus),
                        // pass optional styles from react-window (if applies)
                        style,
                    ];

                    const props = {
                        "data-test-id": testId,
                        disabled,
                        role,
                        style: [defaultStyle],
                        ...childrenProps,
                    } as const;

                    const children = (
                        <React.Fragment>
                            <LabelMedium
                                lang={lang}
                                style={[indent && styles.indent, styles.label]}
                            >
                                {label}
                            </LabelMedium>
                        </React.Fragment>
                    );

                    if (href && !disabled) {
                        return router &&
                            !skipClientNav &&
                            isClientSideUrl(href) ? (
                            <StyledLink {...props} to={href}>
                                {children}
                            </StyledLink>
                        ) : (
                            <StyledAnchor
                                {...props}
                                href={href}
                                target={target}
                            >
                                {children}
                            </StyledAnchor>
                        );
                    } else {
                        return (
                            <StyledButton
                                type="button"
                                {...props}
                                disabled={disabled}
                            >
                                {children}
                            </StyledButton>
                        );
                    }
                }}
            </ClickableBehavior>
        );
    }

    render(): React.ReactNode {
        return (
            <__RouterContext.Consumer>
                {(router) => this.renderClickableBehavior(router)}
            </__RouterContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    shared: {
        background: white,
        color: offBlack,
        textDecoration: "none",
        border: "none",
        outline: "none",
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        height: DROPDOWN_ITEM_HEIGHT,
        minHeight: DROPDOWN_ITEM_HEIGHT,
        paddingLeft: Spacing.medium_16,
        paddingRight: Spacing.medium_16,
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
    },

    label: {
        whiteSpace: "nowrap",
        userSelect: "none",
    },

    indent: {
        marginLeft: Spacing.medium_16,
    },

    // hover and focus states
    focus: {
        color: white,
        background: blue,
    },

    // active and pressed states
    active: {
        color: mix(fade(blue, 0.32), white),
        background: mix(offBlack32, blue),
    },

    // disabled state
    disabled: {
        color: offBlack32,
        cursor: "default",
    },
});
