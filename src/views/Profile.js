import React from 'react';
import {Button, Right, Header, Title, Body, Form, Icon, Input, Item, Text, View} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {Alert, Platform} from "react-native";
import {DeleteUser, GetInfo, UpdateInfo, UserActionsType} from "../redux/User/user.actions";
import LottieView from "lottie-react-native";
import {validateNotEmpty} from "../Utils/utils";
import {Logout} from "../redux/Login/login.actions";
import {HeaderBackgroundColor} from "../../Style/Constant";


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

                <Header androidStatusBarColor="#00AE93" style={{backgroundColor: HeaderBackgroundColor}}>
                    <Body>
                    <Title>Profile</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            Alert.alert('Logout ?', '', [{
                                text: 'Yes', onPress: () => {
                                    this.props.Logout();
                                }
                            }, {
                                text: 'Cancel', onPress: () => {
                                }, style: 'cancel'
                            }], {cancelable: false})
                        }}>
                            <Icon type={"FontAwesome"} name='power-off'/>
                        </Button>
                    </Right>
                </Header>
                {
                    this.props.user.user_info !== undefined && this.props.user.user_info !== null ?
                        <View>
                            <Form>
                                <Item error={!validateNotEmpty(this.state.pseudo)}>
                                    <Icon active name='person'/>
                                    <Input label="Username" value={this.state.pseudo}
                                           onChangeText={(text) => this.setState({pseudo: text})}/>
                                </Item>
                                <Item disabled>
                                    <Icon disabled name='mail'/>
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
                                        <Icon name='refresh'/>
                                        <Text>Update</Text>
                                    </Button>
                                    <Button style={{marginLeft: 10}} danger
                                            disabled={this.props.user.status === UserActionsType.UpdateInfo || this.props.user.status === UserActionsType.DeleteUser}
                                            onPress={() => {
                                                Alert.alert('Delete account ?', '', [{
                                                    text: 'Yes', onPress: () => {
                                                        this.props.DeleteUser(this.props.user.user_info.pseudo);
                                                    }
                                                }, {
                                                    text: 'Cancel', onPress: () => {
                                                    }, style: 'cancel'
                                                }], {cancelable: false})
                                            }}>
                                        <Icon active name='trash'/>
                                        <Text>Delete account</Text>
                                    </Button>
                                </View>
                                <View style={{
                                    marginTop: 40
                                }}>
                                    <Text style={{
                                        marginTop: 10,
                                        color: 'red',
                                        textAlign: 'center'
                                    }}>
                                        {this.state.error !== null ? this.state.error : null}</Text>
                                    <Text style={{
                                        marginTop: 10,
                                        color: 'green',
                                        textAlign: 'center'
                                    }}>{this.props.user.status === UserActionsType.UpdateInfoSuccess ? "Update successful." : null}</Text>
                                </View>
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
        DeleteUser: (pseudo) => dispatch(DeleteUser(pseudo)),
        Logout: () => dispatch(Logout())
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
