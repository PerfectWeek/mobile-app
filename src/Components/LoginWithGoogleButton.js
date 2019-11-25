import React, {Component} from 'react';
import {Button} from 'native-base';
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {LoginGoogle} from "../redux/Login/login.actions";
import {Google} from "expo";

import {ShowErrorNotification, ShowSuccessNotification} from "../Utils/NotificationsModals";

import { Image, Text, ActivityIndicator } from 'react-native'

import { ProviderService } from "../Services/Providers/provider";
import i18n from "i18n-js";


class _LoginWithGoogleButton extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    async loginGoogle() {
        if (this.state.loading)
            return;
        this.setState({ loading: true });
        try {
            // let thekey = await axios.get('https://customkey.azurewebsites.net/api/key');
            // console.log(thekey.data);
            // return;

        console.log("BEFORE");

            let res = await Google.logInAsync({
                iosClientId: '801287294023-nh4ob74qou8ecjhhehmt8pc2dunfhu80.apps.googleusercontent.com',
                androidClientId: '801287294023-dqlohhv3q7q530fvggudih5l8vdm7kna.apps.googleusercontent.com',
                scopes: [
                    "https://www.googleapis.com/auth/userinfo.email",
                    "https://www.googleapis.com/auth/userinfo.profile",
                    "https://www.googleapis.com/auth/calendar.readonly",
                  ]
            });
            console.log("res : ", res);

            if (res.type === 'success') {
                const auth = await ProviderService.ConnectWithGoogleTokens(res.accessToken, res.refreshToken);
                console.log("AUTH : ", auth);

                this.props.LoginGoogle(auth.user.email, auth.token, auth.user.name, auth.user.id);
                await ShowSuccessNotification( i18n.t('login.success') + ` ${auth.user.name}!`);
            }
        } catch (e) {
            await ShowErrorNotification(i18n.t('login.cofail') + " Google");
            console.log(e);
        }
        this.setState({ loading: false });
    }

    render() {
        return (

            <Button style={{
                backgroundColor: 'white', width: 210,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                padding: 10,
            }} onPress={this.loginGoogle.bind(this)}>
                <Image style={{ width: 18, height: 18 }}
                    source={require('../../Resources/Image/g-logo.png')}
                />
                {
                    this.state.loading ? <ActivityIndicator style={{ marginLeft: 'auto', marginRight: 'auto' }} size="large" color="#000000" /> :
                        <Text style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'Roboto_medium',
                            fontWeight: 'bold',
                            marginLeft: 24,
                            marginRight: 24
                        }}>{i18n.t('login.google')}</Text>
                }
            </Button>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        LoginGoogle: (email, accessToken, name, id) => dispatch(LoginGoogle(email, accessToken, name, id)),
    }
};


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(_LoginWithGoogleButton));
