import {createStackNavigator} from "react-navigation";
import {BestSlotCalendar} from "./BestSlotCalendar";
import {HeaderBackgroundColor, HeaderTintColor} from "../../../../Style/Constant";
import {PreferencesForBestSlots} from "./PreferencesForBestSlots";

export const SlotNavigator = createStackNavigator (
    {
        MasterSlot: {
            screen: BestSlotCalendar,
            navigationOptions: () => ({
                title: 'Define best slot',
            }),
        },
        PrefSlots: {
            screen: PreferencesForBestSlots,
            navigationOptions: () => ({
                title: 'Define best slot',
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