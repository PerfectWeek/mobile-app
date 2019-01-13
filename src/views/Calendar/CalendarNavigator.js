import {createStackNavigator} from "react-navigation";
import {CalendarDashboard} from "./CalendarDashboard";
import {CreateEvent} from "./CreateEvent";
import {HeaderBackgroundColor, HeaderTintColor} from "../../../Style/Constant";
import {ModifyEvent} from "./ModifyEvent";

export const CalendarNavigator = createStackNavigator (
    {
        Master: {
            screen : CalendarDashboard
        },
        CreateEvent: {
            screen : CreateEvent
        },
        ModifyEvent: {
            screen: ModifyEvent
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
