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
import {HeaderBackgroundColor} from "../../Style/Constant";

export class _Dasboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
            }}>
                <Header androidStatusBarColor="#00AE93" style={{backgroundColor: HeaderBackgroundColor}}>
                    <Body>
                    <Title>Dashboard</Title>
                    </Body>
                </Header>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    marginLeft: 10,
                    marginRight: 10
                }}>
                    <Image source={require('../../Resources/Image/logo_pw.png')} style={{width: 200, height: 200}}/>

                </View>

                <Text style={{fontSize: 20, marginTop: 20, textAlign: 'center'}}>Welcome
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}> {this.props.login.pseudo} </Text> <Text
                        style={{fontSize: 20}}> !</Text>
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
