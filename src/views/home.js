import React from 'react';
import {Icon} from 'native-base';
import {Profile} from './Profile';
import {Groups} from './Groups';
import {createBottomTabNavigator} from "react-navigation";
import {Dashboard} from "./dashboard";
import { Platform } from 'react-native';
// import Icon from 'react-native-vector-icons';

export default createBottomTabNavigator(
    {
        Dashboard: {
            screen: Dashboard,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => <Icon
                    name='home'
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
        },
        Groups: {
            screen: Groups, navigationOptions: {
                tabBarIcon: ({focused, tintColor}) => <Icon
                    name='users'
                    type='FontAwesome'
                    style={{color: tintColor}}/>
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: '#2477d6',
            inactiveTintColor: 'grey',
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: '#e0e0e0'
            },
        }
    }
);