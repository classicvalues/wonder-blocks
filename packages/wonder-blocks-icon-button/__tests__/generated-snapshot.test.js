// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-icon-button
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import {View} from "@khanacademy/wonder-blocks-core";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import {StyleSheet} from "aphrodite";

describe("wonder-blocks-icon-button", () => {
    it("example 1", () => {
        const example = (
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <IconButton
                    icon={icons.search}
                    aria-label="search"
                    onClick={(e) => console.log("hello")}
                />
                <Strut size={16} />
                <IconButton
                    icon={icons.search}
                    aria-label="search"
                    kind="secondary"
                    onClick={(e) => console.log("hello")}
                />
                <Strut size={16} />
                <IconButton
                    icon={icons.search}
                    aria-label="search"
                    kind="tertiary"
                    href="/search"
                />
                <Strut size={16} />
                <IconButton
                    disabled={true}
                    icon={icons.search}
                    aria-label="search"
                    onClick={(e) => console.log("hello")}
                />
                <Strut size={16} />
                <IconButton
                    disabled={true}
                    icon={icons.search}
                    aria-label="search"
                    href="/search"
                />
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 2", () => {
        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                backgroundColor: Color.darkBlue,
                padding: 10,
            },
        });
        const example = (
            <View style={[styles.row]}>
                <IconButton
                    icon={icons.search}
                    aria-label="search"
                    light={true}
                    onClick={(e) => console.log("hello")}
                />
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});