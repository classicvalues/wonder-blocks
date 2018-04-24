const {createConfig, babel, postcss} = require("webpack-blocks");

module.exports = {
    webpackConfig: createConfig([babel(), postcss()]),
    styleguideDir: "docs",
    sections: [
        {
            name: "Typography",
            content: "packages/wonder-blocks-typography/docs.md",
            components: "packages/wonder-blocks-typography/components/*.js",
        },
        {
            name: "Color",
            content: "packages/wonder-blocks-color/docs.md",
        },
        {
            name: "Grid (Prototype)",
            content: "packages/wonder-blocks-grid/docs.md",
            components: "packages/wonder-blocks-grid/components/*.js",
        },
        {
            name: "Core",
            content: "packages/wonder-blocks-core/docs.md",
            components: "packages/wonder-blocks-core/components/*.js",
        },
        {
            name: "Modal",
            content: "packages/wonder-blocks-modal/docs.md",
            components: "packages/wonder-blocks-modal/components/*.js",
        },
    ],

    // Use Lato as the default font family, in the style guide UI and in the
    // examples.
    template: {
        // This loads Lato from Google Fonts.
        head: {
            links: [
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css?family=Lato",
                },
            ],
        },
    },
    theme: {
        // This applies Lato to Styleguidist UI.
        fontFamily: {
            base: '"Lato", sans-serif',
        },
    },
    styles: {
        // This applies Lato to example areas.
        StyleGuide: {
            "@global body": {
                fontFamily: "Lato",
            },
        },
    },
};
