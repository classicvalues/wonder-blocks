// @flow
import React from "react";

import {processStyleList} from "../util/util.js";

import type {Props} from "../util/types.js";

export default class View extends React.Component<Props> {
    props: Props;

    render() {
        const {className, style} = processStyleList(this.props.style);

        return (
            <div style={style} className={className}>
                {this.props.children}
            </div>
        );
    }
}