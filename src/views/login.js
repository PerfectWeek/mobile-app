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
        this.state = {username: 'jean.valjean@epitech.eu', password: 'AmazingPassword42'};
    }

    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    <Form>
                        <Text>{this.props.login.status}</Text>
                        <Item>
                            <Input placeholder="Username" value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
                        </Item>
                        <Item last>
                            <Input placeholder="Password" value={this.state.password} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
                        </Item>
                        <Button title="Login" rounded bordered info small onPress={() => {
                            // console.log(this.props.login.status);
                            // this.props.Login('jean.valjean@epitech.eu', 'AmazingPassword42');
                            this.props.Login(this.state.username, this.state.password);
                            // console.log(this.props.login.status);
                            // this.props.navigation.navigate('Home');


                            /*const moveToLogin = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({routeName: 'Home'})],
                            });
                            this.props.navigation.dispatch(moveToLogin);*/
                        }}>
                        </Button>
                        <Text style={{color: 'red', textAlign: 'center'}}>{this.props.login.error_message}</Text>
                        <Button title={"Or register"} onPress={() => {
                            this.props.navigation.navigate('Register');
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
