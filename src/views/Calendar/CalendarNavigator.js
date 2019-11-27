import {createStackNavigator} from "react-navigation";
import {CalendarDashboard} from "./CalendarDashboard";
import {CreateEvent} from "./CreateEvent";
import {HeaderBackgroundColor, HeaderTintColor} from "../../../Style/Constant";
import {ModifyEvent} from "./ModifyEvent";
import {ConsultEvent} from "./ConsultEvent";
import {SlotNavigator} from "./BestSlots/SlotNavigator";

import i18n from 'i18n-js';

export const CalendarNavigator = createStackNavigator (
    {
        Master: {
            screen : CalendarDashboard
        },
        CreateEvent: {
            screen : CreateEvent
        },
        ModifyEvent: {
            screen: ModifyEvent,
            navigationOptions: () => ({
                title: i18n.t('calendar.modify_event'),
            })
        },
        ConsultEvent: {
            screen: ConsultEvent
        },
        BestSlot: {
            screen: SlotNavigator,
            navigationOptions: () => ({
                title: i18n.t('dashboard.bestslottitle'),
            })
        }
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
    }
);
