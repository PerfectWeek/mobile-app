import React from 'react';
import {Image, Dimensions, Animated, Easing, StyleSheet, TouchableHighlight} from 'react-native';
import {View, Text, Container, Button} from 'native-base';
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {LoginActionsType, Login, CheckIfLogged, LoginGoogle} from "../redux/Login/login.actions";
import LottieView from 'lottie-react-native';
import {validateEmail} from "../Utils/utils.js";
import {validateNotEmpty, validatePassword} from "../Utils/utils";

import CustomInput from '../Utils/CustomComponents/CustomInput'
import CustomButton from '../Utils/CustomComponents/CustomButton'
import Loader from "../Components/Loader";
import {Google} from 'expo';
import {ShowErrorNotification} from "../Utils/NotificationsModals";
import LoginWithGoogleButton from "../Components/LoginWithGoogleButton";


class _LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
        header: null
    };

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

    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
        this.props.CheckIfLogged();
        this.spinValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.runAnimation();
    }

    runAnimation() {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 400000,
                easing: Easing.linear
            }
        ).start(() => this.runAnimation());
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        const spinimgwidth = Dimensions.get('window').width + 100;
        return (
            <Container style={{paddingTop: Expo.Constants.statusBarHeight + 50}}>
                <View style={styles.logo}>
                    <Image source={require('../../Resources/Image/pwlogo.png')} resizeMode={'contain'}
                           style={{width: 350, height: 150}}/>
                </View>

                {/*<Image source={require('../../Resources/Image/logo.png')} resizeMode={'contain'} style={{width: spinimgwidth, height: spinimgwidth,*/}
                {/*position: 'relative',*/}
                {/*left: -100,*/}
                {/*}}/>*/}
                <Animated.Image
                    style={{
                        transform: [{rotate: spin}],
                        width: spinimgwidth,
                        height: spinimgwidth,
                        position: 'absolute',
                        left: -spinimgwidth * 0.60,
                        top: Dimensions.get('window').height / 2 - spinimgwidth / 3,
                        zIndex: 0
                    }}
                    resizeMode={'contain'}
                    source={require('../../Resources/Image/logo.png')}
                    useNativeDriver={true}
                />
                <View style={styles.form}>
                    <CustomInput iconName={'mail'}
                                 onChangeText={(text) => this.setState({username: text})}
                                 error={!validateEmail(this.state.username)}
                                 type={'email-address'}
                                 placeholder={'Email'}
                    />
                    <CustomInput iconName={'lock'} secureTextEntry={true} style={{marginTop: 30}}
                                 onChangeText={(text) => this.setState({password: text})}
                                 error={!validatePassword(this.state.password)}
                                 placeholder={'Password'}
                    />
                    <CustomButton style={{marginTop: 30}}
                                  disabled={this.props.login.status === LoginActionsType.Login ||
                                  this.state.password === '' || this.state.username === '' ||
                                  !validatePassword(this.state.password) || !validateNotEmpty(this.state.username)}
                                  onPress={() => {
                                      this.props.Login(this.state.username, this.state.password);
                                  }}
                                  title={'Login'}
                    />
                    <TouchableHighlight style={{marginTop: 10}}
                                        onPress={() => this.props.navigation.navigate('Register')}
                                        underlayColor={'rgba(0, 0, 0, 0)'}
                    >
                        <Text style={{textDecorationLine: 'underline'}}> Register </Text>
                    </TouchableHighlight>
                    <View style={{
                        marginTop: 20,
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        <LoginWithGoogleButton onPress={this.loginGoogle.bind(this)}/>
                        <Button>
                            <Text>Facebook</Text>
                        </Button>
                    </View>

                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        marginTop: 20, width: 80, height: 80
                    }}>
                        {
                            (this.props.login.status === LoginActionsType.Login) ?
                                <Loader/>
                                : null
                        }
                    </View>
                </View>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        Login: (email, password) => dispatch(Login(email, password)),
        LoginGoogle: (email, accessToken, name) => dispatch(LoginGoogle(email, accessToken, name)),
        CheckIfLogged: () => dispatch(CheckIfLogged())
    }
};


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        login: state.login
    }
};

const styles = StyleSheet.create({
    logo: {
        zIndex: 1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export const LoginScreen = withNavigation(connect(mapStateToProps, mapDispatchToProps)(_LoginScreen));
