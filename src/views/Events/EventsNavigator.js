import { createStackNavigator } from "react-navigation";
import { HeaderBackgroundColor, HeaderTintColor } from "../../../Style/Constant";
import { EventsList } from "./EventsList";
import { EventDetailScreen } from "./EventDetailScreen";

import * as Localization from 'expo-localization';


export const EventsNavigator = createStackNavigator(
    {
        EventsList: {
            screen: EventsList,
            navigationOptions: () => ({
                title: Localization.locale !== 'fr-FR' ? 'Public Events' : 'Evénements publiques',
            })
        },
        EventDetail: {
            screen: EventDetailScreen,
            navigationOptions: ({ navigation }) => ({
                event: `${navigation.state.params.event}`
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
