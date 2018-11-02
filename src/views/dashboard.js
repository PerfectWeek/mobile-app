import React from 'react';
import {Container, Text, Header, Content, Footer, FooterTab, Button, Icon, Form, Item, Input} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {View, Alert} from "react-native";
import {Logout} from "../redux/Login/login.actions";

export class _Dasboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Container style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <Text>Welcome <Text style={{fontWeight: 'bold'}}> {this.props.login.pseudo}</Text> !</Text>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        Logout: () => dispatch(Logout())

    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        login: state.login
    }
};

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dasboard);
