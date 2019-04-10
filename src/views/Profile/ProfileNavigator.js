import React from 'react';
import {createStackNavigator} from "react-navigation";
import {Profile} from "./Profile";
import {Invite} from "./Invite";
import {InviteDetailScreen} from "./InviteDetailScreen";
import {HeaderBackgroundColor, HeaderTintColor} from "../../../Style/Constant";

export default createStackNavigator(
    {
        Profile: {
            screen: Profile
        },
        Invite: {
            screen: Invite,
            navigationOptions: () => ({
                title: 'Invitations',
            }),
        },
        InviteDetail: {
            screen: InviteDetailScreen,
            navigationOptions: ({ navigation }) => ({
                title: `${navigation.state.params.invite.title}`,
            })
        }
    },
    {
        initialRouteName: 'Profile',
        navigationOptions: {
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });