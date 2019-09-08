import React, {Component} from 'react';
import PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import {Item, Text} from "native-base";
import TimePicker from "react-native-24h-timepicker";

import i18n from 'i18n-js';

class HoursSelector extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     timeEvent: ''
        // }
    }

    onCancel() {
        this.TimePicker.close();
    }

    onConfirm(hour, minute) {
        this.props.onConfirm(hour, minute);
        // this.setState({ timeEvent: hour*60+parseInt(minute) });
        this.TimePicker.close();
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={{height: 40, paddingTop: 10}} onPress={() => this.TimePicker.open()}>
                    <Text style={{color: "#9EA0A4", fontSize: 16, textAlign: 'center', paddingLeft: 16}}>
                        {this.props.time === '' || this.props.time === 0  || this.props.time === '0:00' ? this.props.placeholder :
                            `${Math.trunc(parseInt(this.props.time)/60)} ${i18n.t('other.hours')} ${parseInt(this.props.time)%60} Minutes`
                        }
                    </Text>
                </TouchableOpacity>
                <TimePicker
                    ref={ref => {
                        this.TimePicker = ref;
                    }}
                    onCancel={() => this.onCancel()}
                    onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                />
            </View>
        )
    }

}

HoursSelector.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    time: PropTypes.number.isRequired
}

export default HoursSelector;