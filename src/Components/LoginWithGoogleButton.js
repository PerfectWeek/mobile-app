import React, {Component} from 'react';
import {View, Button,} from 'native-base';
import {Image, Text} from 'react-native'
import PropTypes from "prop-types";

class LoginWithGoogleButton extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {onPress} = this.props;
        return (

            <Button style={{backgroundColor: 'white'}} onPress={onPress}>
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

export default LoginWithGoogleButton;