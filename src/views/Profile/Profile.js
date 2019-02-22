import React from 'react';
import {
    Button,
    Right,
    Header,
    Title,
    Body,
    Form,
    Icon,
    Input,
    Item,
    Text,
    View,
    Toast,
    Container,
    Thumbnail,
    ActionSheet
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {Alert, Platform} from "react-native";
import {DeleteUser, GetInfo, GetUserInfo, UpdateUserInfo, UserActionsType} from "../../redux/User/user.actions";
import LottieView from "lottie-react-native";
import {validateNotEmpty} from "../../Utils/utils";
import {Logout} from "../../redux/Login/login.actions";
import {HeaderBackgroundColor, ScreenBackgroundColor} from "../../../Style/Constant";
import Loader from "../../Components/Loader";
import {ProfileImagePicker} from "./ProfileImagePicker";


export class _Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pseudo: this.props.login.pseudo};
        if (this.props.user === undefined || this.props.user.email === undefined || this.props.user.image === undefined)
            this.props.GetInfo(this.props.login.pseudo);
    }

    render() {
        return (
            <Container style={{
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
                backgroundColor: ScreenBackgroundColor
            }}>

                <Header
                    androidStatusBarColor="#000"
                    style={{backgroundColor: "#FFF"}}
                >
                    <Body>
                    <Title style={{color: '#000000', textAlign: 'center'}}>Profile</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            const BUTTONS = [];
                            const ButtonsCallback = [];
                            BUTTONS.push("Logout");
                            ButtonsCallback.push(() => {
                                Alert.alert('Logout ?', '', [{
                                    text: 'Yes', onPress: () => {
                                        this.props.Logout();
                                    }
                                }, {
                                    text: 'Cancel', onPress: () => {
                                    }, style: 'cancel'
                                }], {cancelable: false})
                            });
                            BUTTONS.push("Edit profile picture");
                            ButtonsCallback.push(() => {
                                this.ProfilePictureModal.openEditModal();
                            });
                            BUTTONS.push("Cancel");
                            ButtonsCallback.push(() => {
                            });
                            const CANCEL_INDEX = BUTTONS.length - 1;
                            ActionSheet.show(
                                {
                                    options: BUTTONS,
                                    cancelButtonIndex: CANCEL_INDEX,
                                    title: "Options"
                                },
                                buttonIndex => {
                                    ButtonsCallback[buttonIndex]();
                                })

                        }}>
                            <Icon type={"SimpleLineIcons"} name='options-vertical' style={{color: '#064C96'}}/>
                        </Button>
                    </Right>
                </Header>
                {
                    this.props.user !== undefined && this.props.user.email !== undefined && this.props.user.image !== undefined
                    && this.props.UserStore.status !== UserActionsType.GetUserInfo ?
                        <View>
                            <View style={{marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                                <Thumbnail large source={{uri: this.props.user.image}}/>
                            </View>
                            <ProfileImagePicker onRef={ref => (this.ProfilePictureModal = ref)}/>
                            <Form>
                                <Item error={!validateNotEmpty(this.state.pseudo)}>
                                    <Icon active name='person'/>
                                    <Input label="Username" value={this.state.pseudo}
                                           onChangeText={(text) => this.setState({pseudo: text})}/>
                                </Item>
                                <Item disabled>
                                    <Icon disabled name='mail'/>
                                    <Input disabled label="Email" value={this.props.user.email}/>
                                </Item>

                                <View style={{
                                    marginTop: 20,
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                    <Button
                                        disabled={this.props.UserStore.status === UserActionsType.UpdateInfo || this.props.UserStore.status === UserActionsType.DeleteUser ||
                                        !validateNotEmpty(this.state.pseudo)}
                                        onPress={() => {
                                            if (this.state.pseudo === "" || this.state.pseudo === null)
                                                Toast.show({
                                                    text: "Invalid pseudo",
                                                    type: "danger",
                                                    buttonText: "Okay",
                                                    duration: 5000
                                                });
                                            else
                                                this.props.UpdateInfo(this.props.user.pseudo, this.state.pseudo);
                                        }}>
                                        <Icon name='refresh'/>
                                        <Text>Update</Text>
                                    </Button>
                                    <Button style={{marginLeft: 10}} danger
                                            disabled={this.props.UserStore.status === UserActionsType.UpdateInfo || this.props.UserStore.status === UserActionsType.DeleteUser}
                                            onPress={() => {
                                                Alert.alert('Delete account ?', '', [{
                                                    text: 'Yes', onPress: () => {
                                                        this.props.DeleteUser(this.props.user.pseudo);
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
                            </Form>
                        </View>

                        : <Container style={{
                            backgroundColor: ScreenBackgroundColor,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Loader/>
                        </Container>
                }

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        marginTop: 80, width: 80, height: 80
                    }}>
                        {
                            (this.props.UserStore.status === UserActionsType.UpdateInfo) ?
                                <Loader/>
                                : null
                        }
                    </View>
                </View>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetInfo: (pseudo) => dispatch(GetUserInfo(pseudo)),
        UpdateInfo: (pseudo, new_pseudo) => dispatch(UpdateUserInfo(pseudo, new_pseudo)),
        DeleteUser: (pseudo) => dispatch(DeleteUser(pseudo)),
        Logout: () => dispatch(Logout())
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        login: state.login,
        UserStore: state.user,
        user: state.user.users[state.login.pseudo]
    }
};

export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile);
