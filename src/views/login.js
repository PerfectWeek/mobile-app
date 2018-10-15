import React from 'react';
import {View, Text, Button, Animated} from 'react-native';
import {Container, Header, Content, Form, Item, Input} from 'native-base';
import {StackActions, NavigationActions} from 'react-navigation';
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {LoginActionsType, Login} from "../redux/Login/login.actions";
import {Test} from "../redux/Test/test.actions";
import LottieView from 'lottie-react-native';

class _LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: 'jean.valjean@epitech.eu', password: 'AmazingPassword42'};
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({isReady: true});
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Text>{this.props.login.status}</Text>
                        <Item>
                            <Input placeholder="Username" value={this.state.username}
                                   onChangeText={(text) => this.setState({username: text})}/>
                        </Item>
                        <Item last>
                            <Input placeholder="Password" value={this.state.password}
                                   onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
                        </Item>
                        <Button title="Login" disabled={this.props.login.status === LoginActionsType.Login}
                                onPress={() => {
                                    this.props.Login(this.state.username, this.state.password);
                                    /*const moveToLogin = StackActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({routeName: 'Home'})],
                                    });
                                    this.props.navigation.dispatch(moveToLogin);*/
                                }}>
                        </Button>
                        <Text style={{color: 'red', textAlign: 'center'}}>{this.props.login.error_message}</Text>
                        <Button title={"Or register"} disabled={this.props.login.status === LoginActionsType.Login}
                                onPress={() => {
                                    this.props.navigation.navigate('Register');
                                }}>
                        </Button>
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
