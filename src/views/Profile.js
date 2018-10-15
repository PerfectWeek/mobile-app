import React from 'react';
import {Container, Text, Header, Content, Footer, FooterTab, Button, Icon, Form, Item, Input} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {Login} from "../redux/Login/login.actions";
import {View} from "react-native";
import {GetInfo, UpdateInfo, UserActionsType} from "../redux/User/user.actions";
import {RegisterActionsType} from "../redux/Register/register.actions";
import LottieView from "lottie-react-native";


export class _Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pseudo: null};
        if (this.props.user.status !== UserActionsType.GetInfoSuccess)
            this.props.GetInfo(this.props.login.pseudo);
    }

    render() {
        if (this.props.user.status === UserActionsType.GetInfoSuccess && this.state.pseudo === null) {
            this.state = {pseudo: this.props.user.user_info.pseudo};
        }
        return (
            <View>
                <Text h1>Profile</Text>
                <Text>{this.props.user.status}</Text>
                {
                    this.props.user.user_info !== undefined ?
                        <View>
                            <Form>
                                <Item>
                                    <Input label="Username" value={this.state.pseudo}
                                           onChangeText={(text) => this.setState({pseudo: text})}/>
                                </Item>
                                <Item>
                                    <Input disabled={true} label="Email" value={this.props.user.user_info.email}/>
                                </Item>
                                <Button
                                    disabled={this.props.user.status === UserActionsType.UpdateInfo}
                                    onPress={() => {
                                        if (this.state.pseudo === "" || this.state.pseudo === null)
                                            this.state.error = "Invalid pseudo";
                                        else
                                            this.props.UpdateInfo(this.props.user.user_info.pseudo, this.state.pseudo);
                                    }}>
                                    <Text>Update</Text>

                                </Button>
                                <Text style={{
                                    color: 'red',
                                    textAlign: 'center'
                                }}>{this.state.error !== null ? this.state.error : null}</Text>
                                {/*<Text style={{color: 'red', textAlign: 'center'}}>{this.props.register.error_message}</Text>*/}
                                {/*<Text style={{color: 'green', textAlign: 'center'}}>{this.props.register.status === "REGISTER_SUCCESS" ? "User created" : null}</Text>*/}
                            </Form>
                        </View>

                        : null
                }

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        marginTop: 20, width: 80, height: 80
                    }}>
                        {
                            (this.props.user.status === UserActionsType.UpdateInfo) ?
                                <LottieView style={{}}
                                            loop
                                            source={require('../../Resources/Lottie/loading.json')}
                                            autoPlay
                                />
                                : null
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetInfo: (pseudo) => dispatch(GetInfo(pseudo)),
        UpdateInfo: (pseudo, new_pseudo) => dispatch(UpdateInfo(pseudo, new_pseudo))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        login: state.login,
        user: state.user
    }
};

export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile);
