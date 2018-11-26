import React from 'react';
import {createStackNavigator} from "react-navigation";
import {LoginScreen} from "./login";
import {RegisterScreen} from "./register";
import {HeaderBackgroundColor} from "../../Style/Constant";

export default createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Register: {
            screen: RegisterScreen
        }
    },
    {
        initialRouteName: 'Login',
        navigationOptions: {
            headerStyle: {
                backgroundColor: HeaderBackgroundColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });