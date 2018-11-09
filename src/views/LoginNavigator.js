import React from 'react';
import {createStackNavigator} from "react-navigation";
import {LoginScreen} from "./login";
import {RegisterScreen} from "./register";

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
                backgroundColor: '#2477d6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });