import React from 'react';
import {createStackNavigator, createSwitchNavigator} from "react-navigation";
import {HeaderBackgroundColor} from "../../../Style/Constant";
import {GroupsScreen} from "./GroupsScreen";
import {GroupDetailScreen} from "./GroupDetailScreen";
import {CreateGroupScreen} from "./CreateGroupScreen";

export const CreateGroupNavigator = createSwitchNavigator(
    {
        CreateGroupScreen: {
            screen: CreateGroupScreen,
        },
        Detail: {
            screen: GroupDetailScreen
        },
    },
    {
        initialRouteName: 'CreateGroupScreen',
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