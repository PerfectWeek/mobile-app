import { createStackNavigator } from "react-navigation";
import { HeaderBackgroundColor, HeaderTintColor } from "../../../Style/Constant";
import { EventsList } from "./EventsList";
import { EventDetailScreen } from "./EventDetailScreen";
import { Map } from "./Map";

export const EventsNavigator = createStackNavigator(
    {
        EventsList: {
            screen: EventsList,
            navigationOptions: () => ({
                title: 'Public Events',
            })
        },
        EventDetail: {
            screen: EventDetailScreen,
            navigationOptions: ({ navigation }) => ({
                event: `${navigation.state.params.event}`
            })
        },
        Map: {
            screen: Map,
            navigationOptions: () => ({
                title: 'Public Events Map',
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
