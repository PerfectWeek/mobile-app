import {createStackNavigator} from "react-navigation";
import {HeaderBackgroundColor, HeaderTintColor} from "../../../Style/Constant";
import {EventsList} from "./EventsList";
import {EventDetailScreen} from "./EventDetailScreen";

export const EventsNavigator = createStackNavigator (
    {
        EventsList: {
            screen : EventsList
        },
        EventDetail: {
            screen: EventDetailScreen,
            navigationOptions: ({navigation}) => ({
                event: `${navigation.state.params.event}`,
            })
        }
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
