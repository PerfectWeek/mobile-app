import React, {Component} from 'react';
import {View, Button,} from 'native-base';
import {Image, Text} from 'react-native'
import PropTypes from "prop-types";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {CheckIfLogged, Login, LoginGoogle, SetLogged} from "../redux/Login/login.actions";
import {Google} from "expo";
import {ShowErrorNotification, ShowSuccessNotification} from "../Utils/NotificationsModals";
import {Network} from "../Network/Requests";
import {Constants} from 'expo';
import {ProviderService} from "../Services/Providers/provider";
import axios from "react-native-axios";

class _LoginWithGoogleButton extends Component {
    constructor(props) {
        super(props);
    }

    async loginGoogle() {
        // Idéalement on push pas les id sur github mais flemme
        let clientId = '';
        if (Constants.isDevice)
            clientId = '778613646655-8v0a79v6cqhruuq76774c216mpib7076.apps.googleusercontent.com'; // PROD
        else
            clientId = '778613646655-o210sl8asjlulngac90ttr2q6bv81r08.apps.googleusercontent.com'; // DEV

        try {
            let res = await Google.logInAsync({androidClientId: clientId, scopes: ['profile', 'email']});
            if (res.type === 'success') {
                const auth = await ProviderService.ConnectWithGoogleTokens(res.accessToken, res.refreshToken);
                this.props.LoginGoogle(auth.user.email, auth.token, auth.user.pseudo);
                await ShowSuccessNotification('Logged in ! ' + `Hi ${auth.user.pseudo}!`);
            }
        } catch (e) {
            await ShowErrorNotification("Couldn't connect with Google");
            console.log(e);
        }
    }

    render() {
        return (

            <Button style={{backgroundColor: 'white', width: 210}} onPress={this.loginGoogle.bind(this)}>
                <Image style={{width: 18, height: 18, marginLeft: 8}}
                       source={require('../../Resources/Image/g-logo.png')}
                />
                <Text style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'Roboto_medium',
                    fontWeight: 'bold',
                    marginLeft: 24,
                    marginRight: 24
                }}>Sign in with Google</Text>
            </Button>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        LoginGoogle: (email, accessToken, name) => dispatch(LoginGoogle(email, accessToken, name)),
    }
};


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(_LoginWithGoogleButton));
