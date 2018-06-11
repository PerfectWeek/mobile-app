import React, {Component} from 'react'
import {
    TouchableOpacity,
    Text
} from 'react-native'

export default class MyButton extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <TouchableOpacity onPress={() => this.props.onPress()} style={this.props.style}>
            <Text style={this.props.textStyle}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}