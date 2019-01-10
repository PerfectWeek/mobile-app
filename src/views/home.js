import React from 'react';
import {Icon} from 'native-base';
import {Profile} from './Profile';
import {createBottomTabNavigator} from "react-navigation";
import {HeaderBackgroundColor} from "../../Style/Constant";
import {GroupsNavigator} from "./Groups/GroupsNavigator";
import {CalendarDashboard} from "./Calendar/CalendarDashboard";
import {CalendarNavigator} from "./Calendar/CalendarNavigator";

export default createBottomTabNavigator(
    {
        // Dashboard: {
        //     screen: Dashboard,
        //     navigationOptions: {
        //         tabBarIcon: ({tintColor}) => <Icon
        //             name='home'
        //             type='FontAwesome'
        //             style={{color: tintColor}}/>
        //     }
        // },
        Dashboard: {
            screen: CalendarNavigator,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => <Icon
                    name='calendar'
                    type='FontAwesome'
                    style={{color: tintColor}}/>
            }
        },
        Groups: {
            screen: GroupsNavigator, navigationOptions: {
                tabBarIcon: ({focused, tintColor}) => <Icon
                    name='users'
                    type='FontAwesome'
                    style={{color: tintColor}}/>
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarIcon: ({focused, tintColor}) => <Icon
                    name='user'
                    type='FontAwesome'
                    style={{color: tintColor}}/>
            }
        }
    },
    {
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