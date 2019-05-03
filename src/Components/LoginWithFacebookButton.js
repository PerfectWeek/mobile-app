//True

import React, {Component} from 'react';
import {Button, Icon} from 'native-base';
import {Text} from 'react-native'
import PropTypes from "prop-types";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {CheckIfLogged, LoginGoogle} from "../redux/Login/login.actions";
import {Facebook} from "expo";
import {Constants} from 'expo';

import {ShowErrorNotification, ShowSuccessNotification} from "../Utils/NotificationsModals";

class _LoginWithFacebookButton extends Component {
    static propTypes = {
        style: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    async loginFacebook() {
        let clientId = '';
        if (Constants.isDevice)
            clientId = '1085104211662288'; // PROD
        else
            clientId = '850667108631602'; // DEV
        // clientId = '1611448665582219'; // DEV
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync(clientId, {
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://www.facebook.com/dialog/oauth?redirect_uri=https%3A%2F%2Fperfect-week-test.herokuapp.com%2Fauth%2Fproviders%2Ffacebook%2Fcallback&scope=email&client_id=850667108631602`);

                let res = await response.json();
                this.props.LoginGoogle(res.user.email, res.token, res.user.pseudo)
                await ShowSuccessNotification('Logged in ! ' + `Hi ${res.user.name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({message}) {
            await ShowErrorNotification("Couldn't connect with Facebook");
        }
    }

    render() {
        const {style} = this.props;
        let styleToApply = style;
        if (styleToApply === undefined)
            styleToApply = {};
        return (

            <Button style={{...styleToApply, backgroundColor: '#4267b2', width: 210}}
                    onPress={this.loginFacebook.bind(this)}>
                <Icon name={'logo-facebook'}/>

                <Text style={{
                    color: 'white',
                    fontSize: 14,
                    fontFamily: 'Roboto_medium',
                    fontWeight: 'bold',
                    marginRight: 14
                }}>Continue with Facebook</Text>
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
