import {createStackNavigator} from "react-navigation";
import {BestSlotCalender} from "./BestSlotCalendar";
import {HeaderBackgroundColor, HeaderTintColor} from "../../../../Style/Constant";

export const SlotNavigator = createStackNavigator (
    {
        Master: {
            screen: BestSlotCalender
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
)