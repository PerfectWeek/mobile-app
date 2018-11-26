import React from 'react';
import {Icon} from 'native-base';
import {Profile} from './Profile';
import {Groups} from './Groups';
import {createBottomTabNavigator} from "react-navigation";
import {Dashboard} from "./dashboard";
import {HeaderBackgroundColor, Secondary} from "../../Style/Constant";

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
            activeTintColor: "#F3EDAF",
            inactiveTintColor: 'white',
            labelStyle: {
                fontSize: 14,
            },
            style: {
                backgroundColor: HeaderBackgroundColor
            },
        }
    }
);