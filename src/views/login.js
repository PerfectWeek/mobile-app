import React from 'react';
import {View, Text, Button, Animated} from 'react-native';
import {Container, Header, Content, Form, Item, Input} from 'native-base';
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {LoginActionsType, Login} from "../redux/Login/login.actions";
import LottieView from 'lottie-react-native';
import {validateEmail} from "../Utils/utils.js";
import {validateNotEmpty} from "../Utils/utils";

class _LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: 'jean.valjean@epitech.eu', password: 'AmazingPassword42'};
    }

    render() {
        return (
            <Container style={{paddingTop: Expo.Constants.statusBarHeight}}>
                <Content>
                    <Form>
                        <Text>{this.props.login.status}</Text>
                        <Item error={!validateEmail(this.state.username)}>
                            <Input placeholder="Username" value={this.state.username}
                                   onChangeText={(text) => this.setState({username: text})}/>
                        </Item>
                        <Item error={!validateNotEmpty(this.state.password)} last>
                            <Input placeholder="Password" value={this.state.password}
                                   onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
                        </Item>
                        <Button title="Login" disabled={this.props.login.status === LoginActionsType.Login}
                                onPress={() => {
                                    if (!validateEmail(this.state.username) || !validateNotEmpty(this.state.password)) {
                                        return;
                                    }
                                    this.props.Login(this.state.username, this.state.password);
                                }}>
                        </Button>
                        <Button title={"Or register"} disabled={this.props.login.status === LoginActionsType.Login}
                                onPress={() => {
                                    this.props.navigation.navigate('Register');
                                }}>
                        </Button>
                        <Text style={{color: 'red', textAlign: 'center'}}>{this.props.login.error_message}</Text>
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
