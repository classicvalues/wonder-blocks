// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-core
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import ClickableBehavior from "./components/clickable-behavior.js";
import MediaLayout from "./components/media-layout.js";
import Text from "./components/text.js";
import UniqueIDProvider from "./components/unique-id-provider.js";
import View from "./components/view.js";
import WithSSRPlaceholder from "./components/with-ssr-placeholder.js";

describe("wonder-blocks-core", () => {
    it("example 1", () => {
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            container: {
                padding: 32,
                backgroundColor: "plum",
            },
            text: {
                fontFamily: "sans-serif",
                fontSize: 24,
            },
        });

        const example = (
            <View style={styles.container}>
                <Text style={styles.text}>Hello, world!</Text>
                <View
                    style={[
                        styles.container,
                        {backgroundColor: "goldenrod", padding: 4},
                    ]}
                >
                    Even with an array and inline styles!
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const example = (
            <View>
                <View onClick={() => alert("Clicked!")}>Click me!</View>

                <Text aria-hidden="true">
                    This text is hidden from screen readers.
                </Text>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const {
            Body,
            HeadingSmall,
        } = require("@khanacademy/wonder-blocks-typography");
        const {Spring, Strut} = require("@khanacademy/wonder-blocks-layout");
        const Button = require("@khanacademy/wonder-blocks-button").default;

        let providerRef = null;

        const renders = [];
        const provider = (
            <UniqueIDProvider
                mockOnFirstRender={false}
                ref={(ref) => (providerRef = ref)}
            >
                {(ids) => {
                    renders.push(ids.get("my-unique-id"));
                    return (
                        <View>
                            {renders.map((id, i) => (
                                <Body key={i}>
                                    Render {i}: {id}
                                </Body>
                            ))}
                        </View>
                    );
                }}
            </UniqueIDProvider>
        );

        const onClick = () => {
            if (providerRef) {
                providerRef.forceUpdate();
            }
        };

        const example = (
            <View>
                <View style={{flexDirection: "row"}}>
                    <Button onClick={onClick}>Click Me to Rerender</Button>
                    <Spring />
                </View>
                <Strut size={16} />
                <HeadingSmall>The UniqueIDProvider:</HeadingSmall>
                {provider}
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 4", () => {
        const {
            Body,
            BodyMonospace,
            HeadingSmall,
        } = require("@khanacademy/wonder-blocks-typography");
        const {Spring, Strut} = require("@khanacademy/wonder-blocks-layout");

        let firstId = null;
        let secondId = null;

        const children = (idf) => {
            const id1 = idf.get("an-id");
            const id2 = idf.get("something");
            firstId = firstId || id1;
            secondId = secondId || id2;
            return (
                <View>
                    <HeadingSmall>The initial render:</HeadingSmall>
                    <View>
                        <BodyMonospace>get("an-id"): {firstId}</BodyMonospace>
                        <BodyMonospace>
                            get("something"): {secondId}
                        </BodyMonospace>
                    </View>
                    <Strut size={16} />
                    <HeadingSmall>Subsequent requests:</HeadingSmall>
                    <View>
                        <BodyMonospace>get("an-id"): {id1}</BodyMonospace>
                        <BodyMonospace>get("something"): {id2}</BodyMonospace>
                    </View>
                </View>
            );
        };

        const example = (
            <UniqueIDProvider mockOnFirstRender={true}>
                {children}
            </UniqueIDProvider>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 5", () => {
        const {
            Body,
            HeadingSmall,
            BodyMonospace,
        } = require("@khanacademy/wonder-blocks-typography");
        const {Spring, Strut} = require("@khanacademy/wonder-blocks-layout");

        const children = ({get}) => (
            <View>
                <Body>
                    The id returned for "my-identifier": {get("my-identifier")}
                </Body>
            </View>
        );

        const example = (
            <View>
                <HeadingSmall>First Provider with scope: first</HeadingSmall>
                <UniqueIDProvider mockOnFirstRender={false} scope="first">
                    {children}
                </UniqueIDProvider>
                <HeadingSmall>Second Provider with scope: second</HeadingSmall>
                <UniqueIDProvider mockOnFirstRender={false} scope="second">
                    {children}
                </UniqueIDProvider>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 6", () => {
        const {
            BodyMonospace,
        } = require("@khanacademy/wonder-blocks-typography");
        const {Strut} = require("@khanacademy/wonder-blocks-layout");

        // TODO(somewhatabstract): Update this to be nice once we can get BodyMonospace
        // to allow us to properly preserve whitespace or have an alternative. Or remove
        // this entirely when our styleguide renders our interface definitions.
        const example = (
            <View>
                <BodyMonospace>
                    interface IIdentifierFactory &#123;
                </BodyMonospace>
                <View style={{flexDirection: "row"}}>
                    <Strut size={"2em"} />
                    <BodyMonospace>get(id: string): string;</BodyMonospace>
                </View>
                <BodyMonospace>&#125;</BodyMonospace>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 7", () => {
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            container: {
                padding: 32,
                backgroundColor: "plum",
            },
            text: {
                fontFamily: "sans-serif",
                fontSize: 24,
            },
        });

        const example = (
            <View style={styles.container}>
                <Text style={styles.text}>Hello, world!</Text>
                <View
                    style={[
                        styles.container,
                        {backgroundColor: "goldenrod", padding: 4},
                    ]}
                >
                    Even with an array and inline styles!
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 8", () => {
        const example = (
            <View>
                <View onClick={() => alert("Clicked!")}>Click me!</View>

                <Text aria-hidden="true">
                    This text is hidden from screen readers.
                </Text>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 9", () => {
        const example = (
            <WithSSRPlaceholder
                placeholder={() => (
                    <View>
                        This gets rendered on server, and also on the client for
                        the very first render (the "rehydration" render)
                    </View>
                )}
            >
                {() => (
                    <View>
                        This is rendered only by the client, for all renders
                        after the rehydration render.
                    </View>
                )}
            </WithSSRPlaceholder>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 10", () => {
        const example = (
            <WithSSRPlaceholder placeholder={null}>
                {() => (
                    <View>
                        This is rendered only by the client, while nothing was
                        rendered on the server.
                    </View>
                )}
            </WithSSRPlaceholder>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 11", () => {
        const {
            Body,
            BodyMonospace,
        } = require("@khanacademy/wonder-blocks-typography");

        const trackingArray = [];
        const resultsId = "nossr-example-2-results";
        const newLi = (text) => {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(text));
            return li;
        };

        const addTrackedRender = (text) => {
            const el = document.getElementById(resultsId);
            if (el) {
                for (let i = 0; i < trackingArray.length; i++) {
                    el.append(newLi(trackingArray[i]));
                }
                trackingArray.length = 0;
                el.append(newLi(text));
            } else {
                // We may not have rendered the results element yet, so if we haven't
                // use an array to keep track of the things until we have.
                trackingArray.push(text);
            }
        };

        const trackAndRender = (text) => {
            addTrackedRender(text);
            return text;
        };

        const example = (
            <View>
                <Body>
                    The list below should have three render entries; root
                    placeholder, root children render, and child children
                    render. If there are two child renders that means that the
                    second forced render is still occurring for nested
                    WithSSRPlaceholder components, which would be a bug.
                </Body>
                <ul id={resultsId} />
                <Body>
                    And below this is the actual WithSSRPlaceholder nesting,
                    which should just show the child render.
                </Body>
                <WithSSRPlaceholder
                    placeholder={() => (
                        <View>{trackAndRender("Root: placeholder")}</View>
                    )}
                >
                    {() => {
                        addTrackedRender("Root: render");
                        return (
                            <WithSSRPlaceholder
                                placeholder={() => (
                                    <View>
                                        {trackAndRender(
                                            "Child: placeholder (should never see me)",
                                        )}
                                    </View>
                                )}
                            >
                                {() => (
                                    <View>
                                        {trackAndRender("Child: render")}
                                    </View>
                                )}
                            </WithSSRPlaceholder>
                        );
                    }}
                </WithSSRPlaceholder>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 12", () => {
        const {
            Body,
            BodyMonospace,
        } = require("@khanacademy/wonder-blocks-typography");

        const trackingArray = [];
        const resultsId = "nossr-example-3-results";
        const newLi = (text) => {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(text));
            return li;
        };

        const addTrackedRender = (text) => {
            const el = document.getElementById(resultsId);
            if (el) {
                for (let i = 0; i < trackingArray.length; i++) {
                    el.append(newLi(trackingArray[i]));
                }
                trackingArray.length = 0;
                el.append(newLi(text));
            } else {
                // We may not have rendered the results element yet, so if we haven't
                // use an array to keep track of the things until we have.
                trackingArray.push(text);
            }
        };

        const trackAndRender = (text) => {
            addTrackedRender(text);
            return text;
        };

        const example = (
            <View>
                <Body>
                    The list below should have six render entries; 2 x root
                    placeholder, 2 x root children render, and 2 x child
                    children render.
                </Body>
                <ul id={resultsId} />
                <Body>
                    And below this are the WithSSRPlaceholder component trees,
                    which should just show their child renders.
                </Body>
                <WithSSRPlaceholder
                    placeholder={() => (
                        <View>{trackAndRender("Root 1: placeholder")}</View>
                    )}
                >
                    {() => {
                        addTrackedRender("Root 1: render");
                        return (
                            <WithSSRPlaceholder
                                placeholder={() => (
                                    <View>
                                        {trackAndRender(
                                            "Child 1: placeholder (should never see me)",
                                        )}
                                    </View>
                                )}
                            >
                                {() => (
                                    <View>
                                        {trackAndRender("Child 1: render")}
                                    </View>
                                )}
                            </WithSSRPlaceholder>
                        );
                    }}
                </WithSSRPlaceholder>
                <WithSSRPlaceholder
                    placeholder={() => (
                        <View>{trackAndRender("Root 2: placeholder")}</View>
                    )}
                >
                    {() => {
                        addTrackedRender("Root 2: render");
                        return (
                            <WithSSRPlaceholder
                                placeholder={() => (
                                    <View>
                                        {trackAndRender(
                                            "Child 2: placeholder (should never see me)",
                                        )}
                                    </View>
                                )}
                            >
                                {() => (
                                    <View>
                                        {trackAndRender("Child 2: render")}
                                    </View>
                                )}
                            </WithSSRPlaceholder>
                        );
                    }}
                </WithSSRPlaceholder>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
