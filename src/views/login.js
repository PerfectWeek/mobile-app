import React from 'react';
import {View, Text, Button} from 'react-native';
import {Container, Header, Content, Form, Item, Input} from 'native-base';
import {StackActions, NavigationActions} from 'react-navigation';
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {LoginActionsType, Login} from "../redux/Login/login.actions";
import {Test} from "../redux/Test/test.actions";

class _LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.store);
    }

    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    <Form>
                        <Text>{this.props.login.status}</Text>
                        <Item>
                            <Input placeholder="Username"/>
                        </Item>
                        <Item last>
                            <Input placeholder="Password"/>
                        </Item>
                        <Button title="Login" rounded bordered info small onPress={() => {
                            console.log(this.props.login.status);
                            this.props.Login('jean.valjean@epitech.eu', 'AmazingPassword42');
                            this.props.navigation.navigate('Home');

                            console.log(this.props.login.status);
                            /*const moveToLogin = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({routeName: 'Home'})],
                            });
                            this.props.navigation.dispatch(moveToLogin);*/
                        }}>
                        </Button>
                    </Form>
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
