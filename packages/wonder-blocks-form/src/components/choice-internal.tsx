import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View, UniqueIDProvider} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import CheckboxCore from "./checkbox-core";
import RadioCore from "./radio-core";

type Props = AriaProps & {
    /** Whether this choice is checked. */
    checked: boolean | null | undefined;
    /** Whether this choice option is disabled. */
    disabled?: boolean;
    /** Whether this choice is in error mode. */
    error?: boolean;
    /** Returns the new checked state of the component. */
    onChange: (newCheckedState: boolean) => unknown;
    /**
     * Used for accessibility purposes, where the label id should match the
     * input id.
     */
    id?: string;
    /**
     * Optional additional styling.
     */
    style?: StyleType;
    /**
     * Adds CSS classes to the Button.
     */
    className?: string;
    /**
     * Optional id for testing purposes.
     */
    testId?: string;
    /**
     * Label for the field.
     */
    label?: React.ReactNode;
    /** Optional description for the field. */
    description?: React.ReactNode;
    /** Auto-populated by parent's groupName prop if in a group. */
    groupName?: string;
    /** Takes either "radio" or "checkbox" value. */
    variant: "radio" | "checkbox";
};

/**
 * This is a potentially labeled 🔘 or ☑️ item. This is an internal component
 * that's wrapped by Checkbox and Radio. Choice is a wrapper for Checkbox and
 * Radio with many of its props auto-populated, to be used with CheckboxGroup
 * and RadioGroup. This design allows for more explicit prop typing. For
 * example, we can make onChange a required prop on Checkbox but not on Choice
 * (because for Choice, that prop would be auto-populated by CheckboxGroup).
 */ const ChoiceInternal = React.forwardRef(function ChoiceInternal(
    props: Props,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const {
        checked,
        description,
        disabled = false,
        error = false,
        id,
        label,
        onChange,
        style,
        className,
        variant,
        ...coreProps
    } = props;

    const handleClick: () => void = () => {
        // Radio buttons cannot be unchecked
        if (variant === "radio" && checked) {
            return;
        }
        onChange(!checked);
    };

    const getChoiceCoreComponent = ():
        | typeof RadioCore
        | typeof CheckboxCore => {
        if (variant === "radio") {
            return RadioCore;
        } else {
            return CheckboxCore;
        }
    };

    const getLabel = (id: string): React.ReactNode => {
        return (
            <LabelMedium
                style={[styles.label, disabled && styles.disabledLabel]}
            >
                <label htmlFor={id}>{label}</label>
            </LabelMedium>
        );
    };

    const getDescription = (id?: string): React.ReactNode => {
        return (
            <LabelSmall style={styles.description} id={id}>
                {description}
            </LabelSmall>
        );
    };

    const ChoiceCore = getChoiceCoreComponent();

    return (
        <UniqueIDProvider mockOnFirstRender={true} scope="choice">
            {(ids) => {
                // A choice element should always have a unique ID set
                // so that the label can always refer to this element.
                // This guarantees that clicking on the label will
                // always click on the choice as well. If an ID is
                // passed in as a prop, use that one. Otherwise,
                // create a unique ID using the provider.
                const uniqueId = id || ids.get("main");

                // Create a unique ID for the description section to be
                // used by this element's `aria-describedby`.
                const descriptionId = description
                    ? ids.get("description")
                    : undefined;

                return (
                    <View style={style} className={className}>
                        <View
                            style={styles.wrapper}
                            // We are resetting the tabIndex=0 from handlers
                            // because the ChoiceCore component will receive
                            // focus on basis of it being an input element.
                            tabIndex={-1}
                        >
                            <ChoiceCore
                                {...coreProps}
                                id={uniqueId}
                                checked={checked}
                                aria-describedby={descriptionId}
                                onClick={handleClick}
                                disabled={disabled}
                                error={error}
                                ref={ref}
                            />
                            <Strut size={Spacing.xSmall_8} />
                            {label && getLabel(uniqueId)}
                        </View>
                        {description && getDescription(descriptionId)}
                    </View>
                );
            }}
        </UniqueIDProvider>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "flex-start",
        outline: "none",
    },
    label: {
        // NOTE: The checkbox/radio button (height 16px) should be center
        // aligned with the first line of the label. However, LabelMedium has a
        // declared line height of 20px, so we need to adjust the top to get the
        // desired alignment.
        marginTop: -2,
    },
    disabledLabel: {
        color: Color.offBlack32,
    },
    description: {
        // 16 for icon + 8 for spacing strut
        marginLeft: Spacing.medium_16 + Spacing.xSmall_8,
        marginTop: Spacing.xxxSmall_4,
        color: Color.offBlack64,
    },
});

export default ChoiceInternal;
