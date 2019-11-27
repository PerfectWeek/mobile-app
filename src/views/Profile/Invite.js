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
  ActionSheet,
  List,
  ListItem,
  Left
} from "native-base";
import connect from "react-redux/es/connect/connect";
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  RefreshControl
} from "react-native";
import { Logout } from "../../redux/Login/login.actions";
import {
  HeaderBackgroundColor,
  ScreenBackgroundColor
} from "../../../Style/Constant";
import Loader from "../../Components/Loader";
// import * as Animatable from "../Groups/GroupsScreen";
import {
  GetInvites,
  ReplyEventInvite,
  ReplyFriendInvite,
  ReplyGroupInvite
} from "../../redux/Invites/invites.actions";

import i18n from "i18n-js";

export class _Invite extends React.Component {
  constructor(props) {
    super(props);
  }

  _onRefresh = () => {
    this.props.GetInvites();
  };

  render() {
    if (this.props.invites === undefined) return <Loader />;
    if (this.props.invites.length === 0)
      return (
        <ScrollView
          style={{
            backgroundColor: ScreenBackgroundColor,
            marginLeft: 10,
            marginRight: 10,
            height: Dimensions.get("window").height
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this._onRefresh}
            />
          }
        >
          <Text style={{ marginTop: 20, textAlign: "center", fontSize: 22 }}>
            {i18n.t("profile.invite.noinvite")}
          </Text>
        </ScrollView>
      );
    // console.log('ooo', this.props.invites)
    return (
      <Container
        style={{
          backgroundColor: ScreenBackgroundColor
        }}
      >
        <ScrollView
          style={{
            backgroundColor: ScreenBackgroundColor,
            marginLeft: 10,
            marginRight: 10,
            height: Dimensions.get("window").height
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this._onRefresh}
            />
          }
        >
          <List>
            {this.props.invites.map((invite, index) => {
              return (
                <ListItem key={index} onPress={() => {}} avatar>
                  <Left>
                    <Thumbnail source={{ uri: invite.item.image }} />
                  </Left>
                  <Body style={{ height: 70 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {invite.name}
                    </Text>
                    <Text>
                      {invite.type === "calendar" ? i18n.t("invite.calendar") :
                       (invite.type === "event" ? i18n.t("invite.event") :
                        (invite.type === "friend" ? i18n.t("invite.friend") : ""))}
                    </Text>
                  </Body>
                  <Right>
                    <Icon
                      style={{ marginTop: 10, fontSize: 28 }}
                      type="SimpleLineIcons"
                      name="options-vertical"
                      onPress={() => {
                        const BUTTONS = [
                          i18n.t("other.yes"),
                          i18n.t("other.no"),
                          i18n.t("other.cancel")
                        ];
                        const CANCEL_INDEX = BUTTONS.length - 1;
                        const ButtonsCallback = [
                          () => {
                            this.handleYes(invite);
                          },
                          () => {
                            this.handleNo(invite);
                          },
                          () => {}
                        ];
                        ActionSheet.show(
                          {
                            options: BUTTONS,
                            cancelButtonIndex: CANCEL_INDEX,
                            title: i18n.t("other.response")
                          },
                          buttonIndex => {
                            ButtonsCallback[buttonIndex]();
                          }
                        );
                      }}
                    />
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </ScrollView>
      </Container>
    );
  }

  handleYes(invite) {
    if (invite.type === "calendar")
      this.props.ReplyGroupInvite(invite.item.id, true);
    else if (invite.type === "event")
      this.props.ReplyEventInvite(invite.item.id, true);
    else if (invite.type === "friend") {
      this.props.ReplyFriendInvite(invite.item.user.id, true);
    }
  }
  handleNo(invite) {
    if (invite.type === "calendar")
      this.props.ReplyGroupInvite(invite.item.id, false);
    else if (invite.type === "event")
      this.props.ReplyEventInvite(invite.item.id, false);
    else if (invite.type === "friend") {
      this.props.ReplyFriendInvite(invite.item.user.id, false);
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    ReplyGroupInvite: (group_id, response) =>
      dispatch(ReplyGroupInvite(group_id, response)),
    ReplyEventInvite: (event_id, response) =>
      dispatch(ReplyEventInvite(event_id, response)),
    ReplyFriendInvite: (user_id, response) =>
      dispatch(ReplyFriendInvite(user_id, response)),

    GetInvites: () => dispatch(GetInvites())
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    invites: state.invites.invites,
    loading: state.invites.loading
  };
};

export const Invite = connect(mapStateToProps, mapDispatchToProps)(_Invite);
