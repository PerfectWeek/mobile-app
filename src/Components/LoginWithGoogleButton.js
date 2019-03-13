import React, {Component} from 'react';
import {View, Button,} from 'native-base';
import {Image, Text} from 'react-native'
import PropTypes from "prop-types";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {CheckIfLogged, Login, LoginGoogle} from "../redux/Login/login.actions";
import {Google} from "expo";
import {ShowErrorNotification} from "../Utils/NotificationsModals";

class _LoginWithGoogleButton extends Component {
    constructor(props) {
        super(props);
    }

    async loginGoogle() {
        // Idéalement on push pas les id sur github mais flemme
        const clientId = '778613646655-o210sl8asjlulngac90ttr2q6bv81r08.apps.googleusercontent.com'; // DEV
        // const clientId = '778613646655-8v0a79v6cqhruuq76774c216mpib7076.apps.googleusercontent.com'; // PROD
        try {
            let res = await Google.logInAsync({androidClientId: clientId});
            if (res.type === 'success') {
                this.props.LoginGoogle(res.user.email, res.accessToken, res.user.name);
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
