import React, { Component } from 'react';
import { Button } from 'native-base';
import { Image, Text, ActivityIndicator } from 'react-native'
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { LoginGoogle } from "../redux/Login/login.actions";
import { Google } from "expo";
import { ShowErrorNotification, ShowSuccessNotification } from "../Utils/NotificationsModals";
import { Network } from "../Network/Requests";
import { Constants } from 'expo';
import { ProviderService } from "../Services/Providers/provider";


class _LoginWithGoogleButton extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    async loginGoogle() {
        if (this.state.loading)
            return;
        this.setState({ loading: true });
        // Idéalement on push pas les id sur github mais flemme
        try {
            let res = await Google.logInAsync({
                iosClientId: '801287294023-633lrp09bt9iglu4nkcld3vad2ivj69p.apps.googleusercontent.com',
                iosStandaloneAppClientId: '801287294023-633lrp09bt9iglu4nkcld3vad2ivj69p.apps.googleusercontent.com',
                androidClientId: '778613646655-o210sl8asjlulngac90ttr2q6bv81r08.apps.googleusercontent.com',
                androidStandaloneAppClientId: '778613646655-8v0a79v6cqhruuq76774c216mpib7076.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });
            if (res.type === 'success') {
                const auth = await ProviderService.ConnectWithGoogleTokens(res.accessToken, res.refreshToken);
                this.props.LoginGoogle(auth.user.email, auth.token, auth.user.pseudo);
                await ShowSuccessNotification('Logged in ! ' + `Hi ${auth.user.pseudo}!`);
            }
        } catch (e) {
            await ShowErrorNotification("Couldn't connect with Google");
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
                        }}>Sign in with Google</Text>
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

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(_LoginWithGoogleButton));
