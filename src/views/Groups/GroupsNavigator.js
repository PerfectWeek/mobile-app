import React from 'react';
import {createStackNavigator} from "react-navigation";
import {HeaderBackgroundColor, HeaderTintColor} from "../../../Style/Constant";
import {CalScreen} from "./CalScreen";
import {GroupDetailScreen} from "./GroupDetailScreen";
import {CreateGroupScreen} from "./CreateGroupScreen";
import {CreateGroupNavigator} from "./CreateGroupNavigator";

export const CalNavigator = createStackNavigator(
    {
        Master: {
            screen: CalScreen
        },
        CreateGroup: {
            screen: CreateGroupNavigator,
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
            headerTintColor: HeaderTintColor,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });
