import React from 'react';
import {Image} from 'react-native';
import {Icon, View, Text, Button, Container, Content, Form, Item, Input} from 'native-base';
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {LoginActionsType, Login} from "../redux/Login/login.actions";
import LottieView from 'lottie-react-native';
import {validateEmail} from "../Utils/utils.js";
import {validateNotEmpty, validatePassword} from "../Utils/utils";

class _LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login'
    };

    constructor(props) {
        super(props);
        this.state = {username: 'jean.valjean3@epitech.eu', password: 'AmazingPassword42'};
    }

    render() {
        return (
            <Container style={{paddingTop: Expo.Constants.statusBarHeight}}>
                <Content>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image source={require('../../Resources/Image/logo_pw.png')} style={{width: 350, height: 150}}/>
                    </View>

                    <Form>
                        <Item style={{marginTop: 0}} error={!validateEmail(this.state.username)}>
                            <Icon active name='person'/>
                            <Input placeholder="Username" value={this.state.username}
                                   onChangeText={(text) => this.setState({username: text})}/>
                        </Item>
                        <Item style={{marginTop: 10}} error={!validateNotEmpty(this.state.password)} last>
                            <Icon active name='lock'/>
                            <Input placeholder="Password" value={this.state.password}
                                   onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
                        </Item>
                        <View style={{
                            marginTop: 10,
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                            <Button rounded disabled={this.props.login.status === LoginActionsType.Login ||
                            !validatePassword(this.state.password) || !validateNotEmpty(this.state.username)}
                                    onPress={() => {
                                        if (!validateEmail(this.state.username) || !validateNotEmpty(this.state.password)) {
                                            return;
                                        }
                                        this.props.Login(this.state.username, this.state.password);
                                    }}>
                                <Text>Login</Text>
                            </Button>
                            <Button rounded style={{marginLeft: 10}}
                                    disabled={this.props.login.status === LoginActionsType.Login}
                                    onPress={() => {
                                        this.props.navigation.navigate('Register');
                                    }}>
                                <Text>
                                    Or Register
                                </Text>
                            </Button>
                        </View>
                        <Text style={{
                            marginTop: 10,
                            color: 'red',
                            textAlign: 'center'
                        }}>{this.props.login.error_message}</Text>
                    </Form>

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
                                    <LottieView style={{}}
                                                loop
                                                source={require('../../Resources/Lottie/loading.json')}
                                                autoPlay
                                    />
                                    : null
                            }
                        </View>
                    </View>

                </Content>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        Login: (email, password) => dispatch(Login(email, password))
    }
};


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        login: state.login
    }
};

export const LoginScreen = withNavigation(connect(mapStateToProps, mapDispatchToProps)(_LoginScreen));
