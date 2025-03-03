import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View, Text as _Text} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Button from "@khanacademy/wonder-blocks-button";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

import {TextField} from "@khanacademy/wonder-blocks-form";
import packageConfig from "../../packages/wonder-blocks-form/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import TextFieldArgTypes from "./text-field.argtypes";

export default {
    title: "Form / TextField",
    component: TextField,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: TextFieldArgTypes,
} as Meta<typeof TextField>;

type StoryComponentType = StoryObj<typeof TextField>;

export const Default: StoryComponentType = {
    args: {
        id: "some-id",
        type: "text",
        value: "",
        disabled: false,
        placeholder: "",
        required: false,
        light: false,
        testId: "",
        readOnly: false,
        autoComplete: "off",
        validate: () => undefined,
        onValidate: () => {},
        onChange: () => {},
        onKeyDown: () => {},
        onFocus: () => {},
        onBlur: () => {},
    },
};

export const Text: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <TextField
            id="tf-1"
            type="text"
            value={value}
            placeholder="Text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

Text.parameters = {
    docs: {
        storyDescription:
            "An input field with type `text` takes all kinds of characters.",
    },
};

export const Required: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <TextField
            id="tf-2"
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required={true}
        />
    );
};

Required.parameters = {
    docs: {
        description: {
            story: `A required field will have error styling if the
        field is left blank. To observe this, type something into the
        field, backspace all the way, and then shift focus out of the field.`,
        },
    },
    chromatic: {
        // Disabling snapshot because it doesn't show the error style
        // until after the user interacts with this field.
        disableSnapshot: true,
    },
};

export const Number: StoryComponentType = () => {
    const [value, setValue] = React.useState("12345");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <TextField
            id="tf-3"
            type="number"
            value={value}
            placeholder="Number"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

Number.parameters = {
    docs: {
        description: {
            story: "An input field with type `number` will only take numeric characters as input.",
        },
    },
};

export const Password: StoryComponentType = () => {
    const [value, setValue] = React.useState("Password123");
    const [errorMessage, setErrorMessage] = React.useState<any>();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const validate = (value: string) => {
        if (value.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/\d/.test(value)) {
            return "Password must contain a numeric value";
        }
    };

    const handleValidate = (errorMessage?: string | null) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <View>
            <TextField
                id="tf-4"
                type="password"
                value={value}
                placeholder="Password"
                validate={validate}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>
            )}
        </View>
    );
};

Password.parameters = {
    docs: {
        description: {
            story: `An input field with type \`password\` will
        obscure the input value. It also often contains validation.
        In this example, the password must be over 8 characters long and
        must contain a numeric value.`,
        },
    },
};

export const Email: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan@khanacademy.org");
    const [errorMessage, setErrorMessage] = React.useState<any>();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const validate = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleValidate = (errorMessage?: string | null) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <View>
            <TextField
                id="tf-5"
                type="email"
                value={value}
                placeholder="Email"
                validate={validate}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>
            )}
        </View>
    );
};

Email.parameters = {
    docs: {
        description: {
            story: `An input field with type \`email\` will automatically
        validate an input on submit to ensure it's either formatted properly
        or blank. \`TextField\` will run validation on blur if the
        \`validate\` prop is passed in, as in this example.`,
        },
    },
};

export const Telephone: StoryComponentType = () => {
    const [value, setValue] = React.useState("123-456-7890");
    const [errorMessage, setErrorMessage] = React.useState<any>();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const validate = (value: string) => {
        const telRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!telRegex.test(value)) {
            return "Invalid US telephone number";
        }
    };

    const handleValidate = (errorMessage?: string | null) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <View>
            <TextField
                id="tf-6"
                type="tel"
                value={value}
                placeholder="Telephone"
                validate={validate}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>
            )}
        </View>
    );
};

Telephone.parameters = {
    docs: {
        description: {
            story: `An input field with type \`tel\` will NOT
        validate an input on submit by default as telephone numbers
        can vary considerably. \`TextField\` will run validation on blur
        if the \`validate\` prop is passed in, as in this example.`,
        },
    },
};

export const Error: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan");
    const [errorMessage, setErrorMessage] = React.useState<any>();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const validate = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleValidate = (errorMessage?: string | null) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <View>
            <TextField
                id="tf-7"
                type="email"
                value={value}
                placeholder="Email"
                validate={validate}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>
            )}
        </View>
    );
};

Error.parameters = {
    docs: {
        description: {
            story: `If an input value fails validation,
        \`TextField\` will have error styling.`,
        },
    },
};

export const Light: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan@khanacademy.org");
    const [errorMessage, setErrorMessage] = React.useState<any>();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const validate = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleValidate = (errorMessage?: string | null) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <View style={styles.darkBackground}>
            <TextField
                id="tf-9"
                type="email"
                value={value}
                placeholder="Email"
                light={true}
                validate={validate}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessageLight}>
                        {errorMessage}
                    </_Text>
                </View>
            )}
        </View>
    );
};

Light.parameters = {
    docs: {
        description: {
            story: `If the \`light\` prop is set to true,
        \`TextField\` will have light styling. This is intended to be used
        on a dark background. There is also a specific light styling for the
        error state, as seen in the \`ErrorLight\` story.`,
        },
    },
};

export const ErrorLight: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan");
    const [errorMessage, setErrorMessage] = React.useState<any>();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const validate = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleValidate = (errorMessage?: string | null) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <View style={styles.darkBackground}>
            <TextField
                id="tf-7"
                type="email"
                value={value}
                placeholder="Email"
                light={true}
                validate={validate}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>
            )}
        </View>
    );
};

ErrorLight.parameters = {
    docs: {
        description: {
            story: `If an input value fails validation and the
        \`light\` prop is true, \`TextField\` will have light error styling.`,
        },
    },
};

export const Disabled: StoryComponentType = () => (
    <TextField
        id="tf-8"
        value=""
        placeholder="This field is disabled."
        onChange={() => {}}
        disabled={true}
    />
);

Disabled.parameters = {
    docs: {
        description: {
            story: `If the \`disabled\` prop is set to true,
        \`TextField\` will have disabled styling and will not be interactable.`,
        },
    },
};

export const CustomStyle: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <TextField
            id="tf-10"
            style={styles.customField}
            type="text"
            value={value}
            placeholder="Text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

CustomStyle.parameters = {
    docs: {
        description: {
            story: `\`TextField\` can take in custom styles that
        override the default styles. This example has custom styles for the
        \`backgroundColor\`, \`color\`, \`border\`, \`maxWidth\`, and
        placeholder \`color\` properties.`,
        },
    },
};

export const Ref: StoryComponentType = () => {
    const [value, setValue] = React.useState("");
    const inputRef: React.RefObject<HTMLInputElement> = React.createRef();

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleSubmit = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <View>
            <TextField
                id="tf-11"
                type="text"
                value={value}
                placeholder="Text"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
            <Strut size={Spacing.medium_16} />
            <Button style={styles.button} onClick={handleSubmit}>
                Focus Input
            </Button>
        </View>
    );
};

Ref.parameters = {
    docs: {
        description: {
            story: `If you need to save a reference to the input
        field, you can do so by using the \`ref\` prop. In this example,
        we want the input field to receive focus when the button is
        pressed. We can do this by creating a React ref of type
        \`HTMLInputElement\` and passing it into \`TextField\`'s \`ref\` prop.
        Now we can use the ref variable in the \`handleSubmit\` function to
        shift focus to the field.`,
        },
        chromatic: {
            // Disabling snapshot because this is testing interaction,
            // not visuals.
            disableSnapshot: true,
        },
    },
};

export const ReadOnly: StoryComponentType = () => {
    const [value, setValue] = React.useState("Khan");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <TextField
            id="tf-12"
            type="text"
            value={value}
            placeholder="Text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            readOnly={true}
        />
    );
};

ReadOnly.parameters = {
    docs: {
        description: {
            story: `An input field with the prop \`readOnly\` set
        to true is not interactable. It looks the same as if it were not
        read only, and it can still receive focus, but the interaction
        point will not appear and the input will not change.`,
        },
        chromatic: {
            // Disabling snapshot because this is testing interaction,
            // not visuals.
            disableSnapshot: true,
        },
    },
};

export const WithAutofocus: StoryComponentType = () => {
    const [value, setValue] = React.useState("");
    const [showDemo, setShowDemo] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleShowDemo = () => {
        setShowDemo(!showDemo);
    };

    const AutoFocusDemo = () => (
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}}>Some other focusable element</Button>
            <TextField
                id="tf-13"
                value={value}
                placeholder="Placeholder"
                autoFocus={true}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{flexGrow: 1, marginLeft: Spacing.small_12}}
            />
        </View>
    );

    return (
        <View>
            <LabelLarge style={{marginBottom: Spacing.small_12}}>
                Press the button to view the text field with autofocus.
            </LabelLarge>
            <Button
                onClick={handleShowDemo}
                style={{width: 300, marginBottom: Spacing.large_24}}
            >
                Toggle autoFocus demo
            </Button>
            {showDemo && <AutoFocusDemo />}
        </View>
    );
};

WithAutofocus.parameters = {
    docs: {
        description: {
            story: `TextField takes an \`autoFocus\` prop, which
            makes it autofocus on page load. Try to avoid using this if
            possible as it is bad for accessibility.\n\nPress the button
            to view this example. Notice that the text field automatically
            receives focus. Upon pressing the botton, try typing and
            notice that the text appears directly in the text field. There
            is another focusable element present to demonstrate that
            focus skips that element and goes straight to the text field.`,
        },
    },
};

export const AutoComplete: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <form>
            <TextField
                id="tf-14"
                type="text"
                value={value}
                placeholder="Name"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={styles.fieldWithButton}
                autoComplete="name"
            />
            <Button type="submit">Submit</Button>
        </form>
    );
};

AutoComplete.parameters = {
    docs: {
        description: {
            story: `If \`TextField\`'s \`autocomplete\` prop is set,
        the browser can predict values for the input. When the user starts
        to type in the field, a list of options will show up based on
        values that may have been submitted at a previous time.
        In this example, the text field provides options after you
        input a value, press the submit button, and refresh the page.`,
        },
        chromatic: {
            // Disabling snapshot because this is testing interaction,
            // not visuals.
            disableSnapshot: true,
        },
    },
};

const styles = StyleSheet.create({
    errorMessage: {
        color: Color.red,
        paddingLeft: Spacing.xxxSmall_4,
    },
    errorMessageLight: {
        color: Color.white,
        paddingLeft: Spacing.xxxSmall_4,
    },
    darkBackground: {
        backgroundColor: Color.darkBlue,
        padding: Spacing.medium_16,
    },
    customField: {
        backgroundColor: Color.darkBlue,
        color: Color.white,
        border: "none",
        maxWidth: 250,
        "::placeholder": {
            color: Color.white64,
        },
    },
    button: {
        maxWidth: 150,
    },
    fieldWithButton: {
        marginBottom: Spacing.medium_16,
    },
});
