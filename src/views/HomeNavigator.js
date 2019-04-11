import React from 'react';
import {Badge, Icon, Text, View} from 'native-base';
import ProfileNavigator from './Profile/ProfileNavigator';
import {createBottomTabNavigator} from "react-navigation";
import {HeaderBackgroundColor} from "../../Style/Constant";
import {GroupsNavigator} from "./Groups/GroupsNavigator";
import {CalendarDashboard} from "./Calendar/CalendarDashboard";
import {CalendarNavigator} from "./Calendar/CalendarNavigator";

export default createBottomTabNavigator(
    {
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
            screen: ProfileNavigator,
            navigationOptions: {
                tabBarIcon: ({focused, tintColor}) =>
                    <View>
                        <Icon
                            name='user'
                            type='FontAwesome'
                            style={{color: tintColor}}/>
                        <View style={{ position: 'absolute', left: 12, top: 5, backgroundColor: 'red', borderRadius: 9, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>9</Text>
                        </View>
                    </View>

            }
        },
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