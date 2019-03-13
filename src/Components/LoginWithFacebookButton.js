//True

import React, {Component} from 'react';
import {Button, Icon} from 'native-base';
import {Text} from 'react-native'
import PropTypes from "prop-types";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {CheckIfLogged, LoginGoogle} from "../redux/Login/login.actions";
import {Facebook} from "expo";
import {ShowSuccessNotification} from "../Utils/NotificationsModals";

class _LoginWithFacebookButton extends Component {
    static propTypes = {
        style: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    async loginFacebook() {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('1611448665582219', {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                await ShowSuccessNotification('Logged in!' + `Hi ${(await response.json()).name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({message}) {
            alert(`Facebook Login Error: ${message}`);
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
        // LoginGoogle: (email, accessToken, name) => dispatch(LoginGoogle(email, accessToken, name)),
    }
};


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(_LoginWithFacebookButton));
