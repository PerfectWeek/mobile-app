import {createStackNavigator} from "react-navigation";
import {BestSlotCalendar} from "./BestSlotCalendar";
import {HeaderBackgroundColor, HeaderTintColor} from "../../../../Style/Constant";
import {PreferencesForBestSlots} from "./PreferencesForBestSlots";
import i18n from 'i18n-js';

export const SlotNavigator = createStackNavigator (
    {
        MasterSlot: {
            screen: BestSlotCalendar,
            navigationOptions: () => ({
                title: i18n.t('dashboard.bestslottitle'),
            }),
        },
        PrefSlots: {
            screen: PreferencesForBestSlots,
            navigationOptions: () => ({
                title: i18n.t('dashboard.bestslottitle'),
            })
        }
    },
    {
        initialRouteName: 'PrefSlots',
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