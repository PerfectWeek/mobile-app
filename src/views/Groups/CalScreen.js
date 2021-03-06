import React from "react";
import {
  Dimensions,
  Platform,
  View,
  ScrollView,
  Alert,
  RefreshControl
} from "react-native";
import {
  Text,
  Header,
  Body,
  Title,
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Right,
  Content,
  Button,
  Icon,
  ActionSheet,
  Container
} from "native-base";
import connect from "react-redux/es/connect/connect";
import {
  DeleteGroup,
  GetGroups,
  GroupsActionType
} from "../../redux/Groups/groups.actions";
import * as Animatable from "react-native-animatable";
import {
  HeaderBackgroundColor,
  ScreenBackgroundColor
} from "../../../Style/Constant";
import { NavigationActions } from "react-navigation";
import Loader from "../../Components/Loader";
import { PageHit } from "expo-analytics";

import i18n from "i18n-js";

export class _CalScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.props.login.analytics.hit(new PageHit("CalPage"));
    this.props.GetGroups(this.props.login.pseudo);
  }

  _onRefresh = () => {
    this.props.GetGroups(this.props.login.pseudo);
  };

  render() {
    const header = (
      <Header
        androidStatusBarColor="#00AE93"
        style={{ backgroundColor: HeaderBackgroundColor }}
      >
        <Body>
          <Title style={{ color: "black" }}>{i18n.t("groups.title")}</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              this.props.navigation.navigate({ routeName: "CreateGroup" });
            }}
          >
            <Icon
              style={{ fontSize: 28, fontWeight: "bold", color: "#064C96" }}
              type={"MaterialIcons"}
              name="add"
            />
          </Button>
        </Right>
      </Header>
    );

    if (this.props.GroupStore.loading === true)
      return (
        <View
          style={{
            backgroundColor: ScreenBackgroundColor,
            paddingTop:
              Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
          }}
        >
          <Header
            androidStatusBarColor="#00AE93"
            style={{ backgroundColor: HeaderBackgroundColor }}
          >
            <Body>
              <Title style={{ color: "black" }}>{i18n.t("groups.title")}</Title>
            </Body>
          </Header>
          <Loader />
        </View>
      );
    if (Object.values(this.props.groups).length === 0)
      return (
        <View
          style={{
            backgroundColor: ScreenBackgroundColor,
            paddingTop:
              Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
          }}
        >
          {header}

          <ScrollView
            style={{
              backgroundColor: ScreenBackgroundColor,
              marginLeft: 10,
              marginRight: 10,
              height: Dimensions.get("window").height
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.props.GroupStore.loading === true}
                onRefresh={this._onRefresh}
              />
            }
          >
            <Text style={{ marginTop: 20, textAlign: "center", fontSize: 22 }}>
              {i18n.t("groups.nogroups")}
            </Text>
            <Button
              style={{ alignSelf: "center", margin: 30 }}
              primary
              onPress={() => {
                this.props.navigation.navigate({ routeName: "CreateGroup" });
              }}
            >
              <Text>{i18n.t("groups.creatgroup")}</Text>
            </Button>
          </ScrollView>
        </View>
      );
    return (
      <Container
        style={{
          backgroundColor: ScreenBackgroundColor,
          paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
        }}
      >
        {header}
        <ScrollView nestedScrollEnabled = {true}
          style={{
            backgroundColor: ScreenBackgroundColor,
            marginLeft: 10,
            marginRight: 10,
            height: Dimensions.get("window").height
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.GroupStore.loading === true}
              onRefresh={this._onRefresh}
            />
          }
        >
          {Object.values(this.props.groups).map((group, index) => {
            return (
              <ListItem
                key={index}
                onPress={() => {
                  this.props.navigation.navigate("Detail", {
                    group: group
                  });
                }}
                avatar
              >
                <Left>
                  <Thumbnail
                    source={{
                      uri: group.image !== undefined ? group.image : null
                    }}
                  />
                </Left>
                <Body>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {group.name}
                  </Text>
                  <Text>
                    {group.members !== undefined
                      ? Object.keys(group.members).length
                      : group.nb_members}{" "}
                    {i18n.t("groups.members")}
                  </Text>
                </Body>
                {group.role === "admin" && (
                  <Right>
                    <Icon
                      style={{ marginTop: 10, fontSize: 28 }}
                      type="SimpleLineIcons"
                      name="options-vertical"
                      onPress={() => {
                        const BUTTONS = [
                          i18n.t("groups.delgroup"),
                          i18n.t("other.cancel")
                        ];
                        const CANCEL_INDEX = BUTTONS.length - 1;
                        const ButtonsCallback = [
                          () => {
                            Alert.alert(
                              `${i18n.t("groups.delgroup")} ?`,
                              "",
                              [
                                {
                                  text: i18n.t("other.yes"),
                                  onPress: () => {
                                    this.props.DeleteGroup(group.id);
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
                          },
                          () => {}
                        ];
                        ActionSheet.show(
                          {
                            options: BUTTONS,
                            cancelButtonIndex: CANCEL_INDEX,
                            title: i18n.t("groups.manage")
                          },
                          buttonIndex => {
                            ButtonsCallback[buttonIndex]();
                          }
                        );
                      }}
                    />
                  </Right>
                )}
              </ListItem>
            );
          })}
        </ScrollView>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    GetGroups: pseudo => dispatch(GetGroups(pseudo)),
    DeleteGroup: groupId => dispatch(DeleteGroup(groupId))
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    GroupStore: state.group,
    groups: state.group.groups,
    login: state.login
  };
};

export const CalScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CalScreen);
