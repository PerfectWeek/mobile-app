import React from 'react';
import {
    Text,
    Header,
    View,
    Body,
    Title,
    Card,
    CardItem
} from 'native-base';
import {LinearGradient} from 'expo';
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

                    {/*<Image source={require('../../Resources/Image/logo_pw.png')} style={{width: 200, height: 200}}/>*/}

                </View>

                <Text style={{fontSize: 20, marginTop: 20, textAlign: 'center'}}>Welcome
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}> {this.props.login.pseudo} </Text> <Text
                        style={{fontSize: 20}}> !</Text>
                </Text>
                <LinearGradient
                    colors={['#7F7FD5', '#86A8E7', '#91EAE4']}
                    style={{margin: 30, padding: 15, alignItems: 'center', borderRadius: 5}}>
                    <Title style={{}}>Events</Title>
                    <Text style={{color:'white'}}>
                        5 new event in 2 different groups
                    </Text>
                </LinearGradient>
                <LinearGradient
                    colors={['#00c6ff', '#0072ff']}
                    style={{margin: 30, padding: 15, alignItems: 'center', borderRadius: 5}}>
                    <Title style={{}}>Rescheduling</Title>
                    <Text style={{color:'white'}}>
                        1 new demand of rescheduling
                    </Text>
                </LinearGradient>
                <LinearGradient
                    colors={['#1D976C', '#93F9B9']}
                    style={{margin: 30, padding: 15, alignItems: 'center', borderRadius: 5}}>
                    <Title style={{}}>Placeholder</Title>
                    <Text style={{color:'white'}}>
                        1 new demand of placeholder
                    </Text>
                </LinearGradient>
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
