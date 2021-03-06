import React from 'react';
import {Animated, Dimensions, Easing, Platform, StyleSheet, Keyboard} from "react-native";
import {View, Container, Text} from 'native-base';
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {Register, RegisterActionsType, RegisterOk} from "../redux/Register/register.actions";
import LottieView from "lottie-react-native";
import {validateEmail, validateNotEmpty, validatePassword, comparePasswords} from "../Utils/utils";

import CustomInput from '../Utils/CustomComponents/CustomInput'
import CustomButton from '../Utils/CustomComponents/CustomButton'
import {HeaderBackgroundColor, HeaderTintColor} from "../../Style/Constant";
import {Event, PageHit} from "expo-analytics";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

class _RegisterScreen extends React.Component {
    static navigationOptions = {
        title: Localization.locale === 'en-FR' ? 'Register' : "S'enregistrer",
        headerStyle: {
            backgroundColor: HeaderBackgroundColor
        },
        headerTintColor: HeaderTintColor
    };

    constructor(props) {
        super(props);
        this.state = {username: '', mail: '', password: '', password2: ''};
        this.spinValue = new Animated.Value(0);
    }

    componentDidMount(){
        this.runAnimation();
    }

    runAnimation() {
        this.props.login.analytics.hit(new PageHit('Register'));

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

    registerHandle() {
        this.props.login.analytics.event(new Event('Registration', 'Registration','The Big Lebowski', 123));
        Keyboard.dismiss();
        this.props.Register(this.state.username, this.state.mail, this.state.password);
    }

    render() {
        if (this.props.register.status === RegisterActionsType.RegisterSuccess) {
            this.props.navigation.goBack();
            this.props.registerOk();
        }
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['360deg', '0deg']
        });
        const spinimgwidth = Dimensions.get('window').width+100;
        return (
            <Container style={{paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <Animated.Image
                    style={{transform: [{rotate: spin}],
                        width: spinimgwidth,
                        height: spinimgwidth,
                        position: 'absolute',
                        right: -spinimgwidth*0.60,
                        top : Dimensions.get('window').height/2 - spinimgwidth/3 - 50,
                        zIndex: 0
                    }}
                    resizeMode={'contain'}
                    source={require('../../Resources/Image/logo.png')}
                    useNativeDriver={true}
                />
                    <View style={cstyles.form}>
                        <CustomInput iconName={'person'}
                                     onChangeText={(text) => this.setState({username: text})}
                                     error={!validateNotEmpty(this.state.username)}
                                     placeholder={'Pseudo'}
                        />
                        <CustomInput iconName={'mail'} style={{marginTop: 30}}
                                     onChangeText={(text) => this.setState({mail: text})}
                                     error={!validateEmail(this.state.mail)}
                                     type={'email-address'}
                                     placeholder={'Email'}
                        />
                        <CustomInput iconName={'lock'} secureTextEntry={true} style={{marginTop: 30}}
                                     onChangeText={(text) => this.setState({password: text})}
                                     error={!comparePasswords(this.state.password, this.state.password2) || !validatePassword(this.state.password)}
                                     placeholder={i18n.t('register.pwd')}
                        />
                        {!validatePassword(this.state.password) && <Text style={{color: "red", textAlign: 'center', margin: 5, backgroundColor: 'white'}}>
                        {i18n.t('login.invalid_password')}
                        </Text>}
                        <CustomInput iconName={'lock'} secureTextEntry={true} style={{marginTop: 30}}
                                     onChangeText={(text) => this.setState({password2: text})}
                                     error={!comparePasswords(this.state.password, this.state.password2) || !validatePassword(this.state.password2)}
                                     placeholder={i18n.t('register.pwda')}
                        />
                        {!validatePassword(this.state.password2) && <Text style={{color: "red", textAlign: 'center', margin: 5, backgroundColor: 'white'}}>
                        {i18n.t('login.invalid_password')}
                        </Text>}
                        <CustomButton style={{marginTop: 30}}
                                      disabled={this.props.register.status === RegisterActionsType.Register ||
                                      !comparePasswords(this.state.password, this.state.password2) ||
                                      !validatePassword(this.state.password) || this.state.password === '' ||
                                      !validateEmail(this.state.mail) || !validateNotEmpty(this.state.mail) ||
                                      !validateNotEmpty(this.state.username)
                                      }
                                      onPress={() => this.registerHandle()}
                                      title={i18n.t('register.register')}
                        />
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
                                (this.props.register.status === RegisterActionsType.Register) ?
                                    <LottieView style={{}}
                                                loop
                                                source={require('../../Resources/Lottie/loading.json')}
                                                autoPlay
                                    />
                                    : null
                            }
                        </View>
                    </View>
            </Container>
        )
    }
}

const cstyles = StyleSheet.create({
    form: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        Register: (username, email, password) => dispatch(Register(username, email, password)),
        registerOk : () => dispatch(RegisterOk())
    }
};


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        register: state.register,
        login: state.login
    }
};

export const RegisterScreen = withNavigation(connect(mapStateToProps, mapDispatchToProps)(_RegisterScreen));
