import React from 'react';
import { Container } from 'native-base';
import connect from "react-redux/es/connect/connect";
import HomeNavigator from "./HomeNavigator";
import { BackHandler, Platform } from "react-native";
import { GetInvites } from "../redux/Invites/invites.actions";

import * as Permissions from 'expo-permissions';
import { Notifications } from "expo";
import { StackActions, NavigationActions } from 'react-navigation';

export class _Home extends React.Component {
    constructor(props) {
        super(props);
        this.props.GetInvites();
    }

    async componentWillMount() {
        await this.StartNotifications();
    }

    async StartNotifications() {
        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token);

        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            const { status, permissions } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (status !== 'granted') {
                alert('You need to enable notifications in settings')
                return;
            }
        }
        this.listener = Notifications.addListener((event) => { this.listen(this.props.store, this.props.navigation, event); });
        Notifications.createChannelAndroidAsync('yeet1', {
            name: 'Reminders',
            priority: 'max',
            vibrate: [250, 250, 250, 250],
            sound: true,
        });
    }

    componentDidMount() {
        if (Platform.OS !== 'ios') {
            BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        }
    }

    componentWillUnmount() {
        if (Platform.OS !== 'ios') {
            BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        }
        this.listener && Notifications.removeListener(this.listen);
    }

    listen(store, navigation, event) {
        console.log("Reset ça mèreeee");
        navigation.navigate(NavigationActions.navigate({
            routeName: 'Home',
            action: NavigationActions.navigate({
                routeName: 'Profile',
                action: NavigationActions.navigate({ routeName: 'Invite' })
            })
        }))
        // NavigationActions.reset({
        //     key: null,
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'home' })],
        //   })
        // NavigationActions.reset({
        //     index: 1,
        //     actions: [
        //         NavigationActions.navigate({ routeName: 'Home' }),
        //         NavigationActions.navigate({ routeName: 'Profile' })
        //     ]
        // });
        // navigation.navigate(NavigationActions.navigate({
        //     routeName: 'Home',
        //     action: NavigationActions.navigate({
        //         routeName: 'Profile',
        //         action: NavigationActions.navigate({ routeName: 'Invite' })
        //     })
        // }))
        // navigation.navigate('Home')
        // navigation.navigate(NavigationActions.navigate({
        //     routeName: 'Home',
        //     action: NavigationActions.navigate({ routeName: 'Profile' })
        // }))
        // console.log("---------------listen begin---------------");
        // console.log("Reset ça mère");

        // const resetAction = StackActions.
        //     reset({
        //         index: 0,
        //         key: null,
        //         actions: [
        //             NavigationActions.
        //                 navigate({ routeName: 'Profile' })
        //         ],
        //     });
        // navigation.dispatch(resetAction);

        // console.log("store : ", store);
        // console.log("navigation : ", navigation);
        // console.log("event : ", event);

        // if (store.login.access_token !== undefined && event.origin === 'selected') {
        // console.log("Je navigate");

        // navigation.navigate('Home')
        // navigation.navigate('Profile')
        // navigation.navigate('Invite')
        // navigation.navigate(NavigationActions.navigate({
        //     routeName: 'Profile',
        //     action: NavigationActions.navigate({ routeName: 'Invite' })
        // }))
        // }
        console.log("---------------listen end---------------");
    }


    onBackPress = () => {
        return true;
    };

    render() {
        return (
            <Container>
                <HomeNavigator />
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetInvites: () => dispatch(GetInvites())

    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(_Home);
