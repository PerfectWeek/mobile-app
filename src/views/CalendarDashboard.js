import React, {Component} from 'react';
import {View} from 'react-native';
import connect from "react-redux/es/connect/connect";
// import {} from "../redux/User/user.actions";
// import {} from "../redux/Login/login.actions";

export class _CalendarDashboard extends Component {
    render() {
        return (
            <View>

            </View>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    }
};

export const CalendarDashboard = connect(mapStateToProps, mapDispatchToProps)(_CalendarDashboard);
