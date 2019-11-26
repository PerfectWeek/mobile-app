import React from 'react';
import { Icon, Text, View, Button } from 'native-base';
import ProfileNavigator from './Profile/ProfileNavigator';
import { createBottomTabNavigator } from "react-navigation";
import { HeaderBackgroundColor } from "../../Style/Constant";
import { CalNavigator } from "./Groups/GroupsNavigator";
import { CalendarNavigator } from "./Calendar/CalendarNavigator";
import { EventsNavigator } from "./Events/EventsNavigator";
import BadgeTabIcon from "../Components/BadgeTabIcon";

import * as Localization from 'expo-localization';

export default createBottomTabNavigator(
    {
        Dashboard: {
            screen: CalendarNavigator,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon
                    name='calendar'
                    type='FontAwesome'
                    style={{ color: tintColor, marginTop: 5, fontSize: 22 }} />,
                    title: Localization.locale !== 'fr-FR' ? 'Calendar' : 'Calendrier',
            }
        },
        Events: {
            screen: EventsNavigator, navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Icon
                    name='calendar-plus'
                    type='MaterialCommunityIcons'
                    style={{ color: tintColor, marginTop: 5, fontSize: 22 }} />,
                    title: Localization.locale !== 'fr-FR' ? 'Events' : 'Evènements',
            }
        },
        Calendars: {
            screen: CalNavigator,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Icon
                    name='users'
                    type='FontAwesome'
                    style={{ color: tintColor, marginTop: 5, fontSize: 22 }} />
            }
        },
        Profile: {
            screen: ProfileNavigator,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) =>
                    <BadgeTabIcon
                        tintColor={tintColor}
                    />,
                    title: Localization.locale !== 'fr-FR' ? 'Profile' : 'Profil',
            }
        }
    },
    {
        lazy: true,
        tabBarOptions: {
            activeTintColor: "#064C96",
            // activeTintColor: "#0686e3",
            // inactiveTintColor: '#141414',
            inactiveTintColor: 'black',
            labelStyle: {
                fontSize: 14,
            },
            style: {
                backgroundColor: HeaderBackgroundColor
            },
        }
    }
);
