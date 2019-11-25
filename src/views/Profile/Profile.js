import React from "react";
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
  Badge,
  Container,
  Thumbnail,
  ActionSheet
} from "native-base";
import connect from "react-redux/es/connect/connect";
import { Alert, Platform, TouchableOpacity } from "react-native";
import {
  DeleteUser,
  GetInfo,
  GetUserInfo,
  UpdateUserInfo,
  UserActionsType
} from "../../redux/User/user.actions";
import LottieView from "lottie-react-native";
import { validateNotEmpty } from "../../Utils/utils";
import { Logout } from "../../redux/Login/login.actions";
import {
  HeaderBackgroundColor,
  ScreenBackgroundColor
} from "../../../Style/Constant";
import Loader from "../../Components/Loader";
import { ProfileImagePicker } from "./ProfileImagePicker";
import { PageHit, Event } from "expo-analytics";
import axios from 'react-native-axios'

import i18n from "i18n-js";


import * as FileSystem from 'expo-file-system';

export class _Profile extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { pseudo: this.props.login.pseudo, edit: true };
    this.props.login.analytics.hit(new PageHit("Profile"));

    if (
      this.props.user === undefined ||
      this.props.user.email === undefined ||
      this.props.user.image === undefined
    )
    
    this.props.GetInfo(this.props.login.pseudo);
  }

  render() {
    return (
      <Container
        style={{
          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
          backgroundColor: ScreenBackgroundColor
        }}
      >
        <Header
          androidStatusBarColor="#000"
          style={{ backgroundColor: "#FFF" }}
        >
          <Body>
            <Title style={{ color: "#000000", textAlign: "center" }}>
              {this.state.edit ? i18n.t("other.edit") : null}{" "}
              {i18n.t("profile.profile")}
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate("FriendsList");
              }}
            >
              <Icon
                type={"SimpleLineIcons"}
                name="people"
                style={{ color: "#064C96", fontSize: 20 }}
              />
            </Button>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate(this.newMethod());
              }}
            >
              <Icon
                type={"SimpleLineIcons"}
                name="bell"
                style={{ color: "#064C96", fontSize: 20 }}
              />

              {this.props.invites !== undefined &&
                this.props.invites.length > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      left: 25,
                      top: 5,
                      backgroundColor: "red",
                      borderRadius: 9,
                      width: this.props.invites.length > 9 ? 28 : 18,
                      height: 18,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: "white" }}>
                      {this.props.invites.length > 9 ? '9+' : this.props.invites.length}
                    </Text>
                  </View>
                )}
            </Button>

            <Button
              transparent
              onPress={() => {
                const BUTTONS = [];
                const ButtonsCallback = [];
                BUTTONS.push({
                  text: this.state.edit
                    ? i18n.t("other.stopEdit")
                    : i18n.t("other.edit"),
                  iconColor: "#2c8ef4"
                });
                ButtonsCallback.push(() => {
                  this.setState({ edit: !this.state.edit });
                });

                BUTTONS.push({
                  text: i18n.t("profile.logout"),
                  iconColor: "#2c8ef4"
                });
                ButtonsCallback.push(() => {
                  Alert.alert(
                    `${i18n.t("profile.logout")} ?`,
                    "",
                    [
                      {
                        text: i18n.t("other.yes"),
                        onPress: () => {
                          this.props.Logout();
                          this.props.login.analytics.event(
                            new Event("Profile", "Logout")
                          );
                        }
                      },
                      {
                        text: i18n.t("other.cancel"),
                        onPress: () => {},
                        style: "cancel"
                      }
                    ],
                    { cancelable: false }
                  );
                });

                BUTTONS.push({
                  text: i18n.t("profile.deleteaccount"),
                  iconColor: "red"
                });
                ButtonsCallback.push(() => {
                  Alert.alert(
                    `${i18n.t("profile.deleteaccount")} ?`,
                    i18n.t("profile.alertdelete"),
                    [
                      {
                        text: i18n.t("other.yes"),
                        onPress: () => {
                          this.props.login.analytics.event(
                            new Event("Profile", "DeleteAccount")
                          );

                          this.props.DeleteUser(this.props.user.pseudo);
                        }
                      },
                      {
                        text: i18n.t("other.cancel"),
                        onPress: () => {},
                        style: "cancel"
                      }
                    ],
                    { cancelable: false }
                  );
                });

                BUTTONS.push({
                  text: i18n.t("other.cancel"),
                  iconColor: "#2c8ef4"
                });
                ButtonsCallback.push(() => {});
                const CANCEL_INDEX = BUTTONS.length - 1;
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    title: "Options"
                  },
                  buttonIndex => {
                    ButtonsCallback[buttonIndex]();
                  }
                );
              }}
            >
              <Icon
                type={"SimpleLineIcons"}
                name="options-vertical"
                style={{ color: "#064C96" }}
              />
            </Button>
          </Right>
        </Header>
        {this.props.user &&
        this.props.user.email &&
        this.props.user.image &&
        this.props.UserStore.status !== UserActionsType.GetUserInfo ? (
          <View>
            <View
              style={{
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Thumbnail
                style={{ width: 160, height: 160, borderRadius: 100 }}
                source={{ uri: this.props.user.image }}
              />

              {this.state.edit ? (
                <TouchableOpacity
                  style={PhotoButtonStyle}
                  onPress={() => {
                    this.ProfilePictureModal.openEditModal();
                  }}
                >
                  <Icon
                    active
                    name="camera"
                    style={{ fontSize: 16 }}
                    type={"FontAwesome"}
                  />
                </TouchableOpacity>
              ) : null}
              <Title
                style={{
                  color: "black",
                  fontFamily: "Lato_Bold",
                  fontSize: 36,
                  margin: 5
                }}
              >
                {this.props.user.pseudo}
              </Title>
            </View>
            <ProfileImagePicker
              onRef={ref => (this.ProfilePictureModal = ref)}
            />

            <Text
              style={{
                fontFamily: "Lato_Bold",
                fontSize: 20,
                color: "gray",
                marginTop: 30,
                marginLeft: 10
              }}
            >
              {this.state.edit ? i18n.t("other.edit") : null} Informations :
            </Text>

            <Form style={{ marginTop: 0 }}>
              <Item error={!validateNotEmpty(this.state.pseudo)}>
                <Icon active name="person" />
                <Input
                  label="Username"
                  value={this.state.pseudo}
                  disabled={!this.state.edit}
                  onChangeText={text => this.setState({ pseudo: text })}
                />
              </Item>
              <Item disabled>
                <Icon disabled name="mail" />
                <Input
                  disabled
                  label="Email"
                  value={this.props.user.email}
                  disabled={!this.state.edit}
                />
              </Item>

              <View
                style={{
                  marginTop: 20,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <Button
                  success
                  disabled={
                    this.props.UserStore.status ===
                      UserActionsType.UpdateInfo ||
                    this.props.UserStore.status ===
                      UserActionsType.DeleteUser ||
                    !validateNotEmpty(this.state.pseudo) ||
                    this.state.pseudo === this.props.login.pseudo
                  }
                  onPress={() => {
                    if (this.state.pseudo === "" || this.state.pseudo === null)
                      Toast.show({
                        text: "Invalid pseudo",
                        type: "danger",
                        buttonText: "Okay",
                        duration: 5000
                      });
                    else
                      this.props.UpdateInfo(
                        this.props.user.email,
                        this.state.pseudo
                      );
                  }}
                >
                  <Icon name="refresh" />
                  <Text>{i18n.t("profile.updateinfo")}</Text>
                </Button>
              </View>
            </Form>
          </View>
        ) : (
          <Container
            style={{
              backgroundColor: ScreenBackgroundColor,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Loader />
          </Container>
        )}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              marginTop: 80,
              width: 80,
              height: 80
            }}
          >
            {this.props.UserStore.status === UserActionsType.UpdateInfo ? (
              <Loader />
            ) : null}
          </View>
        </View>
      </Container>
    );
  }

  newMethod() {
    return "Invite";
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    GetInfo: pseudo => dispatch(GetUserInfo(pseudo)),
    UpdateInfo: (pseudo, new_pseudo) =>
      dispatch(UpdateUserInfo(pseudo, new_pseudo)),
    DeleteUser: pseudo => dispatch(DeleteUser(pseudo)),
    Logout: () => dispatch(Logout())
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    login: state.login,
    UserStore: state.user,
    user: state.user.users[state.login.id],
    invites: state.invites.invites
  };
};

const PhotoButtonStyle = {
  width: 40,
  height: 40,
  borderWidth: 1,
  borderColor: "transparent",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "lightgrey",
  borderRadius: 100,
  padding: 10,
  margin: 10,
  overflow: "hidden",
  position: "absolute",
  right: 110,
  top: 100
};

export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile);
