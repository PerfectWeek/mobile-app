//True

import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import { Text, ActivityIndicator } from 'react-native'
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { CheckIfLogged, LoginGoogle } from "../redux/Login/login.actions";
import * as Facebook from 'expo-facebook';


import { ShowErrorNotification, ShowSuccessNotification } from "../Utils/NotificationsModals";
import { ProviderService } from "../Services/Providers/provider";
import i18n from "i18n-js";

class _LoginWithFacebookButton extends Component {
    static propTypes = {
        style: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    async loginFacebook() {
        console.log("YO");
        
        if (this.state.loading)
            return;
        this.setState({ loading: true });
        try {
            // '850667108631602'
            // '826928231016562'
            // 1309203999244829

            const res = await Facebook.logInWithReadPermissionsAsync('850667108631602', {
                permissions: ['public_profile', 'email'],
            });
            console.log("RES FACEBOOK : ", res);
            
            if (res.type === 'success') {
                const auth = await ProviderService.ConnectWithFacebookTokens(res.token);
                console.log("auth FACEBOOK : ", auth);
                
                this.props.LoginGoogle(auth.user.email, auth.token, auth.user.name, auth.user.id);
                // await ShowSuccessNotification(i18n.t('login.success') + ` ! Hi ${auth.user.name}!`);
            }
        } catch ({ message }) {
            
            await ShowErrorNotification(i18n.t('login.cofail') + " Facebook");
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
                        }}>{i18n.t('login.facebook')}</Text>
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

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(_LoginWithFacebookButton));
