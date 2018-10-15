import React from 'react';
import {View, Text, Button} from 'react-native';
import {Container, Header, Content, Form, Item, Input} from 'native-base';
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {Register, RegisterActionsType} from "../redux/Register/register.actions";
import {LoginActionsType} from "../redux/Login/login.actions";
import LottieView from "lottie-react-native";

class _RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: 'jean', mail: 'jean.valjean@epitech.eu', password: 'AmazingPassword42'};
    }

    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    <Form>
                        <Text>{this.props.register.status} {this.props.register.status === RegisterActionsType.Register}</Text>
                        <Item>
                            <Input placeholder="Username" value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
                        </Item>
                        <Item>
                            <Input placeholder="Email" value={this.state.mail} onChangeText={(text) => this.setState({mail: text})}/>
                        </Item>
                        <Item last>
                            <Input placeholder="Password" value={this.state.password} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
                        </Item>
                        <Button title="Register" disabled={this.props.register.status === RegisterActionsType.Register} onPress={() => {
                            this.props.Register(this.state.username, this.state.mail, this.state.password);
                        }}>
                        </Button>
                        <Text style={{color: 'red', textAlign: 'center'}}>{this.props.register.error_message}</Text>
                        <Text style={{color: 'green', textAlign: 'center'}}>{this.props.register.status === "REGISTER_SUCCESS" ? "User created" : null}</Text>
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
                                    <LottieView style={{ }}
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
