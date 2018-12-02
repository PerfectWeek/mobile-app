import React from 'react';
import {Icon} from 'native-base';
import {Profile} from './Profile';
import {GroupsScreen} from './Groups/GroupsScreen';
import {createBottomTabNavigator} from "react-navigation";
import {Dashboard} from "./dashboard";
import {HeaderBackgroundColor, Secondary} from "../../Style/Constant";
import {GroupsNavigator} from "./Groups/GroupsNavigator";

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
            screen: GroupsNavigator, navigationOptions: {
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