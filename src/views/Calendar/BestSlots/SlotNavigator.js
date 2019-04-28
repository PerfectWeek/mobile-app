import {createStackNavigator} from "react-navigation";
import {BestSlotCalendar} from "./BestSlotCalendar";
import {BestSlotEventCreation} from "./BestSlotEventCreation";
import {HeaderBackgroundColor, HeaderTintColor} from "../../../../Style/Constant";
import {PreferencesForBestSlots} from "./PreferencesForBestSlots";

export const SlotNavigator = createStackNavigator (
    {
        MasterSlot: {
            screen: BestSlotCalendar
        },
        PrefSlots: {
            screen: PreferencesForBestSlots
        },
        BestSlotEventCreation: {
            screen: BestSlotEventCreation
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