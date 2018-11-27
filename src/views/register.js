import React from 'react';
import {View, Text, Button, Container, Content, Form, Item, Input} from 'native-base';
import {Icon} from 'native-base';
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {Register, RegisterActionsType} from "../redux/Register/register.actions";
import LottieView from "lottie-react-native";
import {validateEmail, validateNotEmpty, validatePassword} from "../Utils/utils";
import {Platform} from "react-native";

class _RegisterScreen extends React.Component {
    static navigationOptions = {
        title: 'Register'
    };

    constructor(props) {
        super(props);
        this.state = {username: 'pierresaid', mail: 'pierre.said@epitech.eu', password: 'AmazingPassword42'};
    }

    render() {
        return (
            <Container style={{paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <Content>
                    <Form style={{marginLeft: 10, marginRight: 30}}>
                        <Item error={!validateNotEmpty(this.state.username)}>
                            <Icon active name='person'/>
                            <Input placeholder="Username"
                                   value={this.state.username}
                                   onChangeText={(text) => this.setState({username: text})}/>
                        </Item>
                        <Item error={!validateEmail(this.state.mail)}>
                            <Icon active name='mail'/>
                            <Input placeholder="Email" value={this.state.mail}
                                   onChangeText={(text) => this.setState({mail: text})}/>
                        </Item>
                        <Item error={!validatePassword(this.state.password)} last>
                            <Icon active name='lock'/>
                            <Input placeholder="Password"
                                   value={this.state.password} onChangeText={(text) => this.setState({password: text})}
                                   secureTextEntry={true}/>
                        </Item>
                        <View style={{
                            marginTop: 10,
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                            <Button rounded disabled={this.props.register.status === RegisterActionsType.Register ||
                            !validatePassword(this.state.password) || !validateEmail(this.state.mail) || !validateNotEmpty(this.state.username)}
                                    onPress={() => {
                                        if (!validateNotEmpty(this.state.username) || !validateEmail(this.state.mail) || !validatePassword(this.state.password))
                                            return;
                                        this.props.Register(this.state.username, this.state.mail, this.state.password);
                                    }}>
                                <Text>Register</Text>
                            </Button>
                        </View>
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
                </Content>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        Register: (username, email, password) => dispatch(Register(username, email, password))
    }
};


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        register: state.register
    }
};

export const RegisterScreen = withNavigation(connect(mapStateToProps, mapDispatchToProps)(_RegisterScreen));
