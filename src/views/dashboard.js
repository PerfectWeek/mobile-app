import React from 'react';
import {
    Text,
    Header,
    View,
    Body,
    Title
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {Image, Platform} from "react-native";
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
                <Image source={require('../../Resources/Image/logo_pw.png')} style={{width: 350, height: 150}}/>

                <Text style={{fontSize: 20,  marginTop: 20, textAlign: 'center'}}>Welcome
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}> {this.props.login.pseudo} </Text> <Text style={{fontSize: 20}}> !</Text>
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
