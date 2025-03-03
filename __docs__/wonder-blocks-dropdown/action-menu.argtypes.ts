import type {InputType} from "@storybook/csf";

export default {
    alignment: {
        table: {
            category: "Layout",
        },
    },

    disabled: {
        table: {
            category: "States",
        },
    },

    opened: {
        control: "boolean",
        table: {
            category: "States",
        },
    },

    onToggle: {
        table: {
            category: "Events",
        },
    },

    onChange: {
        table: {
            category: "Events",
        },
    },

    dropdownStyle: {
        table: {
            category: "Styling",
        },
    },

    style: {
        table: {
            category: "Styling",
        },
    },

    className: {
        table: {
            category: "Styling",
        },
    },
} satisfies Record<string, InputType>;
