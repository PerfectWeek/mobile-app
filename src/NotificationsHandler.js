import React from 'react';
import { Container } from 'native-base';
import connect from "react-redux/es/connect/connect";
import { BackHandler, Platform } from "react-native";
import { GetInvites } from "./redux/Invites/invites.actions";

import * as Permissions from 'expo-permissions';
import { Notifications } from "expo";
import { StackActions, NavigationActions } from 'react-navigation';

export class _NotificationHandler extends React.Component {
    constructor(props) {
        super(props);
        this.props.GetInvites();
    }

    async componentWillMount() {
        await this.StartNotifications();
    }

    async StartNotifications() {


        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        console.log(status);
        if (status !== 'granted') {
            const { status, permissions } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (status !== 'granted') {
                console.log("Not granted");
                alert('You need to enable notifications in settings')
                return;
            }

        }
        else {
            // console.log("Je demande le token");
            // let token = await Notifications.getExpoPushTokenAsync();
            // console.log(token);
            this.listener = Notifications.addListener((event) => { this.listen(this.props.GetInvites, this.props.nav, event); });
            Notifications.createChannelAndroidAsync('yeet1', {
                name: 'Reminders',
                priority: 'max',
                vibrate: [250, 250, 250, 250],
                sound: true,
            });
        }


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
        this.listener && Notifications.removeListener && Notifications.removeListener(this.listen);
    }

    listen(GetInvites, navigation, event) {
        GetInvites();        
        if (event.origin === 'selected') {
            // console.log(event);
            // console.log("JE NAVIGATE");
            
            // const resetAction = StackActions.reset({
            //     index: 0,
            //     actions: [NavigationActions.navigate({ routeName: 'Profile' }), NavigationActions.navigate({ routeName: 'Invite' })],
            //   });
            //   this.props.navigation.dispatch(resetAction);
            // navigation.navigate(NavigationActions.navigate({
            //     routeName: 'Home',
            //     action: NavigationActions.navigate({
            //         routeName: 'Profile',
            //         action: NavigationActions.navigate({ routeName: 'Invite' })
            //     })
            // }))
        }
    }
    onBackPress = () => {
        return true;
    };
    render() {
        return null;
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

export default connect(mapStateToProps, mapDispatchToProps)(_NotificationHandler);
