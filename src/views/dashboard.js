import React from 'react';
import {
    Text,
    Header,
    View,
    Body,
    Title
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {Platform} from "react-native";
import {Logout} from "../redux/Login/login.actions";

export class _Dasboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }}>
                <Header androidStatusBarColor="#34495e" style={{backgroundColor: '#2477d6'}}>
                    <Body>
                    <Title>Dashboard</Title>
                    </Body>
                </Header>

                <Text style={{textAlign: 'center'}}>Welcome
                    <Text style={{fontWeight: 'bold'}}> {this.props.login.pseudo} </Text> <Text> !</Text>
                </Text>

            </View>

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
