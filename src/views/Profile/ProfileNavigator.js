import React from 'react';
import {createStackNavigator} from "react-navigation";
import {Profile} from "./Profile";
import {Invite} from "./Invite";
import {FriendsList} from './FriendsList';
import {FriendDetails} from "./FriendDetails";
import {GroupInviteDetailScreen} from "./GroupInviteDetailScreen";
import {HeaderBackgroundColor, HeaderTintColor} from "../../../Style/Constant";
import * as Localization from 'expo-localization';

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
        // GroupInviteDetailScreen: {
        //     screen: GroupInviteDetailScreen,
        //     navigationOptions: ({ navigation }) => ({
        //         title: `${navigation.state.params.invite.name}`,
        //     })
        // },
        FriendsList: {
            screen: FriendsList,
            navigationOptions: () => ({
                title: Localization.locale !== 'fr-FR' ? 'Friends list' : 'List d\'amis'
            })
        },
        FriendDetails: {
            screen: FriendDetails,
            navigationOptions: ({navigation}) => ({
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