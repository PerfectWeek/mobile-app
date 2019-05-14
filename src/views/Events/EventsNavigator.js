import {createStackNavigator} from "react-navigation";
import {HeaderBackgroundColor, HeaderTintColor} from "../../../Style/Constant";
import {EventsList} from "./EventsList";

export const EventsNavigator = createStackNavigator (
    {
        EventsList: {
            screen : EventsList
        }
        // Detail: {
        //     screen: ConsultEvent
        // }
    },
    {
        initialRouteName: 'EventsList',
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
