import React from "react";
import {
  Platform,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Share
} from "react-native";
import connect from "react-redux/es/connect/connect";
import {
  Button,
  Form,
  Icon,
  Item,
  Text,
  Container,
  Thumbnail,
  Header,
  Body,
  Title,
  Right,
  Left
} from "native-base";

import {
  CalendarActionType,
  GetEventInfo
} from "../../redux/Calendar/calendar.actions";
import DatePicker from "react-native-datepicker";
import Loader from "../../Components/Loader";
import { IconColor } from "../../../Style/Constant";
import { ChangeCalendarEventStatus } from "../../redux/Calendar/calendar.actions";
import { ListUsers } from "./tools/ListUsers";

import i18n from "i18n-js";
import * as Localization from "expo-localization";
import { Network } from "../../Network/Requests";
const en_to_fr = {
  party: "Soirée",
  work: "Travail",
  hobby: "Hobby",
  workout: "Sport"
};

export class _ConsultEvent extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    const event = this.props.calendar.events[
      this.props.navigation.state.params.eventId
    ];
    // console.log("OOKKKKK : ", event);
    // this.props.login.analytics.hit(new PageHit('ConsultEvent'));

    // this.props.GetEventInfo(this.props.navigation.state.params.eventId);
    const response = Network.Get('/events/' + event.id).then(res => {
      event.attendees = res.data.event.attendees;
      this.setState(this.fillInfoEvent(event));
    })
    
    this.state = this.fillInfoEvent(event);
  }

  fillInfoEvent(event) {
    const beginTimeEvent = event.start_time.split("T");

    const endTimeEvent = event.end_time.split("T");

    return {
      id: event.id,
      EventTitle: event.name,
      description: event.description,
      localisation: event.location,
      location: event.location,
      type: (Localization.locale === "fr-FR" && en_to_fr[event.type] !== undefined) ? en_to_fr[event.type] : event.type,
      dateBeginEvent: beginTimeEvent[0],
      beginTime: beginTimeEvent[1].substring(0, 5),
      dateEndEvent: endTimeEvent[0],
      endTime: endTimeEvent[1].substring(0, 5),
      image: event.image,
      visibility: event.visibility,
      attendees: event.attendees,
      role: event.role
    };
  }

  render() {
    let header = (
      <Header androidStatusBarColor="#000" style={{ backgroundColor: "#FFF" }}>
        <Left>
          <Button
            transparent
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Icon
              type={"FontAwesome"}
              name="arrow-left"
              style={{ color: "black", fontSize: 20 }}
            />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: "#000000", textAlign: "center" }}>
            {Localization.locale !== "fr-FR" ? "Event infos" : "Evenement"}
          </Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              this.props.navigation.navigate("Map", {
                id: this.state.id,
                event_alone: this.state
              });
            }}
          >
            {Platform.OS !== "ios" ? (
              <Text
                uppercase={false}
                style={{ fontSize: 18, fontWeight: "bold", color: "#064C96" }}
              >
                {i18n.t("event.map_view")}
              </Text>
            ) : null}
            <Icon
              style={{ fontSize: 28, fontWeight: "bold", color: "#064C96" }}
              type={"MaterialIcons"}
              name="location-on"
            />
          </Button>
          <Button
            transparent
            onPress={() => {
              Share.share({
                dialogTitle: "Share with your friends",
                title: "Share with your friends",
                message: `${i18n.t("event.share.going_to")} ${
                  this.state.EventTitle
                } ${i18n.t("event.share.join_me")} : http://perfect-week.pw/`
              });
            }}
          >
            <Text
              uppercase={false}
              style={{ fontSize: 18, fontWeight: "bold", color: "#064C96" }}
            ></Text>
            <Icon
              style={{ fontSize: 28, fontWeight: "bold", color: "#064C96" }}
              type={"MaterialIcons"}
              name="share"
            />
          </Button>
        </Right>
      </Header>
    );
    if (
      this.props.calendar &&
      (this.props.calendar.status === CalendarActionType.ModifyEvent ||
        this.props.calendar.status === CalendarActionType.GetEventInfo)
    )
      return (
        <Container
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop:
              Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
          }}
        >
          {header}
          <Loader />
        </Container>
      );

    return (
      <Container
        style={{
          paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
        }}
      >
        {header}

        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              margin: 20,
              marginBottom: 40
            }}
          >
            <Thumbnail large source={{ uri: this.state.image }} />
            <Text style={{ ...textStyle, fontSize: 25 }}>
              {this.state.EventTitle}
            </Text>
          </View>

          <Form
            style={{
              flexGrow: 3
            }}
          >
            <Item>
              <Icon
                style={IconStyle}
                type="SimpleLineIcons"
                active
                name="pencil"
              />
              <Text style={{ ...textStyle, marginRight: 40 }}>
                {this.state.description}
              </Text>
            </Item>
            <Item>
              <Icon
                style={IconStyle}
                type="SimpleLineIcons"
                active
                name="location-pin"
              />
              <Text style={textStyle} placeholder="Localisation">
                {this.state.localisation}
              </Text>
            </Item>

            <Item>
              <Icon
                style={{ ...IconStyle, alignSelf: "flex-start", marginTop: 10 }}
                type="SimpleLineIcons"
                active
                name="clock"
              />

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  <DatePicker
                    disabled
                    customStyles={{
                      placeholderText: {
                        color: "black",
                        fontFamily: "Roboto_medium"
                      }
                    }}
                    style={{
                      width: 200,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    placeholder={
                      this.state.dateBeginEvent === ""
                        ? i18n.t("dashboard.eventinfo.begin")
                        : this.state.dateBeginEvent
                    }
                    format="YYYY-MM-DD"
                    minDate="2018-01-01"
                    maxDate={
                      this.state.dateEndEvent === ""
                        ? "2022-01-01"
                        : this.state.dateEndEvent
                    }
                    confirmBtnText={i18n.t("other.confirm")}
                    cancelBtnText={i18n.t("other.cancel")}
                    showIcon={false}
                    onDateChange={date => {
                      this.setState({ dateBeginEvent: date });
                    }}
                  />
                  <DatePicker
                    disabled
                    customStyles={{
                      placeholderText: {
                        color: "black",
                        fontFamily: "Roboto_medium"
                      }
                    }}
                    style={{ width: 80 }}
                    date={this.state.beginTime}
                    placeholder={i18n.t("dashboard.eventinfo.endtime")}
                    mode="time"
                    format="HH:mm"
                    confirmBtnText={i18n.t("other.confirm")}
                    cancelBtnText={i18n.t("other.cancel")}
                    minuteInterval={1}
                    showIcon={false}
                    onDateChange={time => {
                      this.setState({ beginTime: time });
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  <DatePicker
                    disabled
                    customStyles={{
                      placeholderText: {
                        color: "black",
                        fontFamily: "Roboto_medium"
                      }
                    }}
                    style={{
                      width: 200,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderLeftColor: "white"
                    }}
                    placeholder={
                      this.state.dateEndEvent === ""
                        ? "Ending"
                        : this.state.dateEndEvent
                    }
                    format="YYYY-MM-DD"
                    minDate={
                      this.state.dateBeginEvent === ""
                        ? "2018-01-01"
                        : this.state.dateBeginEvent
                    }
                    maxDate="2022-01-01"
                    confirmBtnText={i18n.t("other.confirm")}
                    cancelBtnText={i18n.t("other.cancel")}
                    showIcon={false}
                    onDateChange={date => {
                      this.setState({ dateEndEvent: date });
                    }}
                  />
                  <DatePicker
                    disabled
                    customStyles={{
                      placeholderText: {
                        color: "black",
                        fontFamily: "Roboto_medium"
                      }
                    }}
                    style={{ width: 80 }}
                    date={this.state.endTime}
                    placeholder={i18n.t("dashboard.eventinfo.endtime")}
                    mode="time"
                    format="HH:mm"
                    confirmBtnText={i18n.t("other.confirm")}
                    cancelBtnText={i18n.t("other.cancel")}
                    minuteInterval={1}
                    showIcon={false}
                    onDateChange={time => {
                      this.setState({ endTime: time });
                    }}
                  />
                </View>
              </View>
            </Item>
            <Item>
              <Icon
                style={IconStyle}
                type="SimpleLineIcons"
                active
                name="flag"
              />
              <Text style={textStyle} placeholder="Type">
                {this.state.type}
              </Text>
            </Item>
            <Item last>
              <Icon
                style={IconStyle}
                type="SimpleLineIcons"
                active
                name="lock"
              />
              <Text
                style={textStyle}
                placeholder={i18n.t("dashboard.eventinfo.visibility")}
              >
                {this.state.visibility}
              </Text>
            </Item>
            {this.state.attendees !== undefined ? (
              <ListUsers
                callAddUser={() => {}}
                loadList={this.state.attendees}
                editMode={false}
              />
            ) : null}
            {(this.state.role === "admin" || this.state.role === "actor") && (
              <Button
                onPress={() => {
                  // console.log('puto',this.props )

                  this.props.navigation.goBack();
                  // this.props.navigation.navigate('ConsultEvent')
                  this.props.navigation.navigate("ModifyEvent", {
                    eventId: this.props.navigation.state.params.eventId,
                    calendarId: this.props.navigation.state.params.eventId
                      .selectedCalendar
                  });

                  // this.props.navigation.navigate('ConsultEvent', { eventId: this.props.navigation.state.params.eventId })
                }}
                style={{ backgroundColor: "#0069e9", margin: 10 }}
                full
              >
                <Text>{i18n.t("other.edit")}</Text>
              </Button>
            )}
            <Button
              style={{ backgroundColor: "#e94b61", margin: 10 }}
              full
              onPress={() => {
                Alert.alert(
                  i18n.t("other.leave") + " ?",
                  "",
                  [
                    {
                      text: i18n.t("other.yes"),
                      onPress: () => {
                        this.props.navigation.navigate("Master");
                        this.props.ChangeCalendarEventStatus(
                          { id: this.state.id },
                          "no"
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
              }}
            >
              <Text>{i18n.t("other.leave")}</Text>
            </Button>
          </Form>
        </ScrollView>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    GetEventInfo: event => dispatch(GetEventInfo(event)),
    ChangeCalendarEventStatus: (event, status) =>
      dispatch(ChangeCalendarEventStatus(event, status))
  };
};

const mapStateToProps = (state, ownProps) => {
    return {
      ...ownProps,
      calendar: state.calendar,
      event: state.calendar.event
    };
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white",
    color: "black",
    width: 250
  },
  inputAndroid: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white",
    color: "black",
    width: 250
  }
});

const IconStyle = { color: IconColor };

const textStyle = {
  margin: 10,
  color: "black",
  fontFamily: "Roboto_medium",
  fontSize: 16
};

export const ConsultEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ConsultEvent);
