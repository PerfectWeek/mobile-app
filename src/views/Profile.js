import React from 'react';
import {Button, Header, Title, Body, Form, Icon, Input, Item, Text, View} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {Alert, Platform} from "react-native";
import {DeleteUser, GetInfo, UpdateInfo, UserActionsType} from "../redux/User/user.actions";
import LottieView from "lottie-react-native";
import {validateNotEmpty} from "../Utils/utils";


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
            <View style={{
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }}>

                <Header androidStatusBarColor="#34495e" style={{backgroundColor: '#2477d6'}}>
                    <Body>
                    <Title>Profile</Title>
                    </Body>
                </Header>
                {
                    this.props.user.user_info !== undefined ?
                        <View>
                            <Form>
                                <Item error={!validateNotEmpty(this.state.pseudo)}>
                                    <Icon active name='person'/>
                                    <Input label="Username" value={this.state.pseudo}
                                           onChangeText={(text) => this.setState({pseudo: text})}/>
                                </Item>
                                <Item>
                                    <Icon active name='mail'/>
                                    <Input disabled label="Email" value={this.props.user.user_info.email}/>
                                </Item>

                                <View style={{
                                    marginTop: 20,
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                    <Button
                                        disabled={this.props.user.status === UserActionsType.UpdateInfo || this.props.user.status === UserActionsType.DeleteUser ||
                                        !validateNotEmpty(this.state.pseudo)}
                                        onPress={() => {
                                            if (this.state.pseudo === "" || this.state.pseudo === null)
                                                this.state.error = "Invalid pseudo";
                                            else
                                                this.props.UpdateInfo(this.props.user.user_info.pseudo, this.state.pseudo);
                                        }}>
                                        <Text>Update</Text>
                                    </Button>
                                    <Button style={{marginLeft: 10}} danger
                                            disabled={this.props.user.status === UserActionsType.UpdateInfo || this.props.user.status === UserActionsType.DeleteUser}
                                            onPress={() => {
                                                Alert.alert(
                                                    'Delete account ?',
                                                    '',
                                                    [
                                                        {
                                                            text: 'Yes', onPress: () => {
                                                                this.props.DeleteUser(this.props.user.user_info.pseudo);
                                                            }
                                                        },
                                                        {
                                                            text: 'Cancel', onPress: () => {
                                                            }, style: 'cancel'
                                                        },
                                                    ],
                                                    {cancelable: false}
                                                )
                                            }}>
                                        <Icon active name='trash'/>
                                        <Text>Delete account</Text>
                                    </Button>
                                </View>
                                <Text style={{
                                    color: 'red',
                                    textAlign: 'center'
                                }}>{this.state.error !== null ? this.state.error : null}</Text>
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
        UpdateInfo: (pseudo, new_pseudo) => dispatch(UpdateInfo(pseudo, new_pseudo)),
        DeleteUser: (pseudo) => dispatch(DeleteUser(pseudo))
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
