import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableHighlight,
  ScrollView,
  Platform
} from "react-native";
import connect from "react-redux/es/connect/connect";
import { Agenda } from "react-native-calendars";
import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Right,
  Title,
  Fab,
  Thumbnail,
  ActionSheet
} from "native-base";
import {
  GetAllUsersEvents,
  CalendarActionType,
  DeleteEvent,
  GetUsersEventsFiltered,
  GetEvents,
  GetCalendars,
  ResetStatus,
  LoadCalendar,
  ReloadEvents
} from "../../redux/Calendar/calendar.actions";
import Loader from "../../Components/Loader";
import {
  HeaderBackgroundColor,
  ScreenBackgroundColor
} from "../../../Style/Constant";
import Swipeout from "react-native-swipeout";
import { CalendarFilter } from "./CalendarFilter";
import moment from "moment";
import {
  dateDiffInDays,
  getRandomColor,
  timeToString
} from "../../Utils/utils";
import * as Animatable from "react-native-animatable";
import { Event, PageHit } from "expo-analytics";
import NotificationsHandler from "../../NotificationsHandler";
import i18n from "i18n-js";

export class _CalendarDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      scrolledDay: this.currentDate()
    };
    this.props.login.analytics.hit(new PageHit("DashBoard"));

    this.props.LoadCalendar(this.props.login.pseudo);
    // console.log(this.props)
  }

  static navigationOptions = {
    header: null
  };

  loadItems(day) {
    if (day === undefined) return;
    this.state.scrolledDay = day;

    // this.reloadEvents();
    this.setState({ ...this.state });
  }

  removeEvent(event) {
    Alert.alert(
      "Confimation",
      "Delete " + event.name + " ?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            this.props.login.analytics.event(
              new Event("Events", "DeleteEvent")
            );
            this.props.DeleteEvent(event.id);
          }
        }
      ],
      { cancelable: true }
    );
  }

  renderItem(item) {
    const swipeoutBtns = [
      {
        text: "Edit",
        color: "white",
        backgroundColor: "green",
        onPress: () => {
          this.props.navigation.navigate("ModifyEvent", {
            eventId: item.id,
            calendarId: this.props.selectedCalendar
          });
        }
      },
      {
        text: "Delete",
        color: "white",
        backgroundColor: "red",
        onPress: () => {
          this.removeEvent(item);
        }
      }
    ];
    const start = new Date(item.start_time);
    const start_string =
      ("0" + start.getUTCHours()).slice(-2) +
      ":" +
      ("0" + start.getUTCMinutes()).slice(-2);
    const end = new Date(item.end_time);
    const end_string =
      ("0" + end.getUTCHours()).slice(-2) +
      ":" +
      ("0" + end.getUTCMinutes()).slice(-2);
    return (
      <Swipeout
        autoClose={true}
        right={swipeoutBtns}
        style={{
          backgroundColor: "white",
          marginTop: 15,
          marginRight: 15,
          borderWidth: 2,
          borderColor: item.color,
          borderRadius: 5
        }}
      >
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate("ConsultEvent", {
              eventId: item.id,
              calendarId: this.props.selectedCalendar
            })
          }
          underlayColor="rgba(52, 52, 52, 0.5)"
        >
          <View
            style={{
              margin: 15,
              flex: 1,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            {item.image === undefined || item.image === null ? null : (
              <Animatable.View animation="fadeIn">
                <Thumbnail
                  style={{ marginRight: 10 }}
                  source={{ uri: item.image }}
                />
              </Animatable.View>
            )}

            <View>
              <Text style={{ fontSize: 18, fontFamily: "Lato_Bold" }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Lato_Medium"
                }}
              >
                {start_string} - {end_string} ·
                <Text style={{ color: "#e94b61" }}> {item.calendar_name}</Text>
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }

  rowHasChanged(r1, r2) {
    return JSON.stringify(r1) !== JSON.stringify(r2);
  }

  currentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }

  refreshCalendar() {
    this.props.LoadCalendar(this.props.login.pseudo);
  }

  render() {

    let top_header = (
      <Header
        androidStatusBarColor="#00AE93"
        style={{ backgroundColor: HeaderBackgroundColor }}
      >
        <Body>
          <Title style={{ color: "black" }}>
            {i18n.t("calendar.calendar")}
          </Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              if (
                this.calendarFilter &&
                this.props.calendar.DashboardStatus ===
                  CalendarActionType.LoadCalendarSuccess
              )
                this.calendarFilter.openModal();
            }}
          >
            <Icon
              style={{ fontSize: 28, fontWeight: "bold", color: "#064C96" }}
              type={"FontAwesome"}
              name="filter"
            />
          </Button>
        </Right>
      </Header>
    );
    if (
      this.props.calendar.DashboardStatus !==
      CalendarActionType.LoadCalendarSuccess
    )
      return (
        <View
          style={{
            paddingTop:
              Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
            backgroundColor: ScreenBackgroundColor,
            flex: 1
          }}
        >
          {top_header}
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Loader />
          </View>
        </View>
      );
    // console.log(this.props)
    return (
      <Container
        style={{
          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
          backgroundColor: ScreenBackgroundColor
        }}
      >
        <NotificationsHandler nav={this.props.navigation} />
        <Container>
          {top_header}
          <CalendarFilter onRef={ref => (this.calendarFilter = ref)} />

          <Agenda
            items={this.props.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            selected={this.currentDate()}
            renderItem={this.renderItem.bind(this)}
            // renderEmptyDate={this.renderEmptyDate.bind(this)}
            renderEmptyDate={() => {
              return <View style={{ backgroundColor: "red" }} />;
            }}
            rowHasChanged={this.rowHasChanged.bind(this)}
            pastScrollRange={50}
            futureScrollRange={50}
            onRefresh={() => {
              this.refreshCalendar();
            }}
          />
        </Container>
        <Fab
          containerStyle={{}}
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={() => {
            const BUTTONS = [];
            const ButtonsCallback = [];
            BUTTONS.push(i18n.t("calendar.create_event"));
            ButtonsCallback.push(() => {
              this.props.login.analytics.event(
                new Event("Events", "CreationEvent")
              );
              this.props.navigation.navigate({ routeName: "CreateEvent" });
            });
            BUTTONS.push(i18n.t("calendar.find_best_slot"));
            ButtonsCallback.push(() => {
              this.props.login.analytics.event(
                new Event("Events", "BestSlotCreation")
              );
              this.props.navigation.navigate("PrefSlots", {
                calendarId: this.props.selectedCalendar
              });
            });
            BUTTONS.push(i18n.t("other.cancel"));
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
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    ReloadEvents: calendars => dispatch(ReloadEvents(calendars)),
    LoadCalendar: pseudo => dispatch(LoadCalendar(pseudo)),
    DeleteEvent: event => dispatch(DeleteEvent(event)),
    ResetStatus: () => dispatch(ResetStatus())
  };
};

const mapStateToProps = (state, ownProps) => {
  let events = [];
  if (state.calendar.events && state.calendar.calendars.length > 0) {
    const filtered_events = Object.values(state.calendar.events).filter(e => {
      return e.status === "going";
    });
    events = filtered_events.map(e => {
      const calendar = state.calendar.calendars.find(
        c => c.id === e.calendar_id
      );
      return {
        ...e,
        calendar_name: calendar !== undefined ? calendar.name : ""
      };
    });
  }

  let items = {};
  for (let i = -150; i < 185; i++) {
    const time = new Date().getTime() + i * 24 * 60 * 60 * 1000;
    const date = new Date(time);
    const strTime = date.toISOString().split("T")[0];
    if (!items[strTime]) {
      items[strTime] = [];
    }
  }

  for (let k = 0; k < events.length; ++k) {
    const event = events[k];
    let strTimeStart = new Date(event.start_time);
    const strTimee = new Date(event.end_time);
    const color = getRandomColor();

    let diffInDays = Math.abs(
      dateDiffInDays(new Date(event.end_time), new Date(event.start_time))
    );
    for (let i = diffInDays; i >= 0; --i) {
      let isoDate = timeToString(strTimeStart);
      if (items[isoDate] === undefined) items[isoDate] = [];
      let start = new Date(event.start_time);
      let end = new Date(event.end_time);

      if (i > 0) {
        end.setUTCHours(0);
        end.setUTCMinutes(0);
      }
      if (diffInDays > 0 && i < diffInDays) {
        start.setUTCHours(0);
        start.setUTCMinutes(0);
      }

      // if (strTimeStart > start && dateDiffInDays(end, strTimeStart) !== 0) {
      //     end.setUTCHours(0);
      //     end.setUTCMinutes(0);
      // }
      // if (strTimeStart > start) {
      //     start.setUTCHours(0);
      //     start.setUTCMinutes(0);
      // }

      // if (strTimeStart <= start && dateDiffInDays(end, start) !== 0) {
      //     end.setUTCHours(0);
      //     end.setUTCMinutes(0);
      // }
      // if (strTimeStart > start && dateDiffInDays(end, strTimeStart) !== 0) {
      //     end.setUTCHours(0);
      //     end.setUTCMinutes(0);
      // }
      // if (strTimeStart > start) {
      //     start.setUTCHours(0);
      //     start.setUTCMinutes(0);
      // }
      items[isoDate].push({
        id: event.id,
        name: event.name,
        calendar_name: event.calendar_name,
        start_time: new Date(start),
        end_time: end,
        color: event.color,
        image: event.image
      });
      items[isoDate] = items[isoDate].sort((a, b) => {
        return a.start_time > b.start_time;
      });
      strTimeStart.setDate(strTimeStart.getDate() + 1);
    }
  }
  const mainCalendar = state.calendar.calendars.find(c => {
    return c.name === "Main calendar" || c.name === "Main Calendar";
  });
  let mainCalendarId = -1;
  if (mainCalendar !== undefined) mainCalendarId = mainCalendar.id;
  return {
    ...ownProps,
    calendar: state.calendar,
    login: state.login,
    items,
    selectedCalendar: mainCalendarId
  };
};

export const CalendarDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CalendarDashboard);
