import React from 'react';
import {createStackNavigator} from "react-navigation";
import {HeaderBackgroundColor} from "../../../Style/Constant";
import {GroupsScreen} from "./GroupsScreen";
import {GroupDetailScreen} from "./GroupDetailScreen";

export const GroupsNavigator = createStackNavigator(
    {
        Master: {
            screen: GroupsScreen,
            navigationOptions: {headerTitle:"My groups"}
        },
        Detail: {
            screen: GroupDetailScreen,
            navigationOptions: ({ navigation }) => ({
                title: `${navigation.state.params.group.name}`,
            })
        },
    },
    {
        initialRouteName: 'Master',
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