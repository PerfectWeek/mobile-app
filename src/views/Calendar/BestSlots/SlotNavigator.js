import {createStackNavigator} from "react-navigation";
import {BestSlotCalendar} from "./BestSlotCalendar";
import {BestSlotEventCreation} from "./BestSlotEventCreation";
import {HeaderBackgroundColor, HeaderTintColor} from "../../../../Style/Constant";

export const SlotNavigator = createStackNavigator (
    {
        MasterSlot: {
            screen: BestSlotCalendar
        },
        BestSlotEventCreation: {
            screen: BestSlotEventCreation
        }
    },
    {
        initialRouteName: 'MasterSlot',
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