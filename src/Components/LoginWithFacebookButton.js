//True

import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import { Text, ActivityIndicator } from 'react-native'
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { CheckIfLogged, LoginGoogle } from "../redux/Login/login.actions";
import * as Facebook from 'expo-facebook';
import { Constants } from 'expo';

import { ShowErrorNotification, ShowSuccessNotification } from "../Utils/NotificationsModals";
import { ProviderService } from "../Services/Providers/provider";

class _LoginWithFacebookButton extends Component {
    static propTypes = {
        style: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    async loginFacebook() {
        if (this.state.loading)
            return;
        this.setState({ loading: true });
        try {
            // '850667108631602'
            // '826928231016562'
            // 1309203999244829
            const res = await Facebook.logInWithReadPermissionsAsync('826928231016562', {
                permissions: ['public_profile', 'email'],
            });
            if (res.type === 'success') {
                const auth = await ProviderService.ConnectWithFacebookTokens(res.token);
                this.props.LoginGoogle(auth.user.email, auth.token, auth.user.pseudo);
                await ShowSuccessNotification('Logged in ! ' + `Hi ${auth.user.pseudo}!`);
            }
        } catch ({ message }) {
            await ShowErrorNotification("Couldn't connect with Facebook");
        }
        this.setState({ loading: false });
    }

    render() {
        const { style } = this.props;
        let styleToApply = style;
        if (styleToApply === undefined)
            styleToApply = {};
        return (

            <Button style={{
                ...styleToApply, backgroundColor: '#4267b2', width: 210,
                flexDirection: 'row',
                justifyContent: 'flex-start',
            }}
                onPress={this.loginFacebook.bind(this)}>
                <Icon name={'logo-facebook'} />
                {
                    this.state.loading ? <ActivityIndicator style={{ marginLeft: 'auto', marginRight: 'auto' }} size="large" color="#ffffff" /> :
                        <Text style={{
                            color: 'white',
                            fontSize: 14,
                            fontFamily: 'Roboto_medium',
                            fontWeight: 'bold',
                        }}>Continue with Facebook</Text>
                }
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

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(_LoginWithFacebookButton));
