import React from 'react';
import {Container, Text, Header, Content, Footer, FooterTab, Button, Icon, Form, Item, Input} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {View, Alert} from "react-native";

export class _Dasboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        login: state.login
    }
};

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dasboard);
