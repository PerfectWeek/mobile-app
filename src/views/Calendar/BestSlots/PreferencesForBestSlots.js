import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  Container,
  Text,
  Button,
  Icon,
  Input,
  Item,
  Picker,
  Form,
  Toast
} from "native-base";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import { IconColor } from "../../../../Style/Constant";
// import TimePicker from "react-native-24h-timepicker";
import HoursSelector from "../tools/HoursSelector";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import connect from "react-redux/es/connect/connect";

const fr_to_en = {
  Soirée: "party",
  Travail: "work",
  Sport: "workout",
  Hobby: "hobby"
};
const en_to_fr = {
  party: "Soirée",
  work: "Travail",
  hobby: "Hobby",
  workout: "Sport"
};

class _PreferencesForBestSlots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EventTitle: "",
      description: "",
      localisation: "",
      dateBeginEvent: "",
      dateEndEvent: "",
      beginTime: new Date(new Date().setSeconds(0)).toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
      }),
      endTime: "",
      calendarId: this.props.navigation.getParam("calendarId"),
      timeEvent: 0,
      type: "",
      visibility: "public"
    };
    //console.log(this.props.navigation.getParam('calendarId'), this.props)
  }

  static navigationOptions = {
    header: null
  };

  validator() {
    // console.log(this.state)
    return (
      this.state.EventTitle === "" ||
      this.state.dateBeginEvent === "" ||
      this.state.timeEvent === "" ||
      this.state.timeEvent === 0 ||
      this.state.dateEndEvent === "" ||
      this.state.beginTime === "" ||
      this.state.endTime === "" ||
      this.state.calendarId === -1 ||
      (this.state.dateBeginEvent === this.state.dateEndEvent &&
        moment(this.state.endTime, "HH:mm") <
          moment(this.state.beginTime, "HH:mm")) ||
      this.state.type === ""
    );
  }

  checkDateInPast(date) {
    const d1 = new Date(date);
    const d2 = new Date();
    d2.setHours(0);
    d2.setMinutes(0);
    if (d1.getTime() < d2.getTime()) {
      Toast.show({
        text: i18n.t("dashboard.createvent.error.past"),
        type: "danger",
        buttonText: "Okay",
        duration: 2000
      });
      return false;
    }

    return true;
  }

  // onCancel() {
  //     this.TimePicker.close();
  // }
  //
  // onConfirm(hour, minute) {
  //     this.setState({ timeEvent: hour*60+parseInt(minute) });
  //     this.TimePicker.close();
  // }

  render() {
    // const eventsDefinedTypes = ['party', 'work', 'hobby', 'workout'];
    const eventsDefinedTypes =
      Localization.locale !== "fr-FR"
        ? ["party", "work", "hobby", "workout"]
        : ["Soirée", "Travail", "Sport", "Hobby"];

    return (
      <Container>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Form
            style={{
              marginLeft: 10,
              marginRight: 30,
              flexGrow: 3
            }}
          >
            <Item>
              <Input
                style={{
                  color: "black",
                  fontFamily: "Roboto_medium",
                  fontSize: 26
                }}
                placeholder={i18n.t("dashboard.createvent.nameevent")}
                value={this.state.EventTitle}
                onChangeText={text => this.setState({ EventTitle: text })}
              />
            </Item>
            <Item>
              <Icon
                style={IconStyle}
                type="SimpleLineIcons"
                active
                name="pencil"
              />
              <Input
                style={{
                  color: "black",
                  fontFamily: "Roboto_medium",
                  fontSize: 16
                }}
                placeholder={i18n.t("dashboard.createvent.description")}
                value={this.state.description}
                onChangeText={text => this.setState({ description: text })}
              />
            </Item>
            <Item>
              <Icon
                style={IconStyle}
                type="SimpleLineIcons"
                active
                name="location-pin"
              />
              <Input
                style={{
                  color: "black",
                  fontFamily: "Roboto_medium",
                  fontSize: 16
                }}
                placeholder={i18n.t("dashboard.createvent.localisation")}
                value={this.state.localisation}
                onChangeText={text => this.setState({ localisation: text })}
              />
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
                      if (this.checkDateInPast(date))
                        this.setState({ dateBeginEvent: date });
                    }}
                  />
                  <DatePicker
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
                    cancelBtnText={i18n.t("other.confirm")}
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
                        ? i18n.t("dashboard.eventinfo.endtime")
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
                    cancelBtnText={i18n.t("other.confirm")}
                    showIcon={false}
                    onDateChange={date => {
                      if (this.checkDateInPast(date))
                        this.setState({ dateEndEvent: date });
                    }}
                  />
                  <DatePicker
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
                    cancelBtnText={i18n.t("other.confirm")}
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
                name="hourglass"
              />
              {/*    <TouchableOpacity style={{height: 40, paddingTop: 10}} onPress={() => this.TimePicker.open()}>*/}
              {/*        <Text style={{color: "#9EA0A4", fontSize: 16, textAlign: 'center', paddingLeft: 16}}>*/}
              {/*            {this.state.timeEvent === ''  || this.state.timeEvent === '0:00' ? 'Event duration' :*/}
              {/*                `${Math.trunc(parseInt(this.state.timeEvent)/60)} Hours ${parseInt(this.state.timeEvent)%60} Minutes`*/}
              {/*            }*/}
              {/*        </Text>*/}
              {/*    </TouchableOpacity>*/}
              {/*    <TimePicker*/}
              {/*        ref={ref => {*/}
              {/*            this.TimePicker = ref;*/}
              {/*        }}*/}
              {/*        onCancel={() => this.onCancel()}*/}
              {/*        onConfirm={(hour, minute) => this.onConfirm(hour, minute)}*/}
              {/*    />*/}
              <HoursSelector
                time={this.state.timeEvent}
                placeholder={i18n.t("dashboard.createvent.eventduration")}
                onConfirm={(hours, minutes) =>
                  this.setState({ timeEvent: hours * 60 + parseInt(minutes) })
                }
              />
            </Item>
            <Item>
              <Icon
                style={IconStyle}
                type="SimpleLineIcons"
                active
                name="flag"
              />
              <Picker
                placeholder={i18n.t("dashboard.createvent.typeevent")}
                placeholderStyle={{ color: "#9EA0A4" }}
                note
                selectedValue={this.state.type}
                mode="dropdown"
                style={{ width: 120 }}
                onValueChange={value => {
                  this.setState({ type: value });
                }}
              >
                <Picker.Item
                  label={i18n.t("dashboard.createvent.typeevent")}
                  value={-1}
                  key={-1}
                />
                {eventsDefinedTypes.map((c, idx) => {
                  return <Picker.Item label={c} value={c} key={idx} />;
                })}
              </Picker>
            </Item>
            <Item>
              <Icon
                style={IconStyle}
                type="SimpleLineIcons"
                active
                name="calendar"
              />
              <Picker
                placeholder={i18n.t("dashboard.createvent.selectcalendar")}
                placeholderStyle={{ color: "#9EA0A4" }}
                note
                selectedValue={this.state.calendarId}
                mode="dropdown"
                style={{ width: 120 }}
                onValueChange={value => {
                  this.setState({ calendarId: value });
                }}
              >
                <Picker.Item
                  label={i18n.t("dashboard.createvent.selectcalendar")}
                  value={-1}
                  key={-1}
                />
                {this.props.calendar.calendars.map(c => {
                  return <Picker.Item label={c.name} value={c.id} key={c.id} />;
                })}
              </Picker>
            </Item>
            <Item last>
              <Icon
                style={IconStyle}
                type="SimpleLineIcons"
                active
                name="lock"
              />
              <Picker
                placeholder={i18n.t("dashboard.createvent.selectvis")}
                placeholderStyle={{ color: "#9EA0A4" }}
                note
                // selectedValue={this.state.visibility}
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.visibility}
                onValueChange={value => {
                  this.setState({ visibility: value });
                }}
              >
                <Picker.Item
                  label={i18n.t("other.public")}
                  value={"public"}
                  key={0}
                />
                <Picker.Item
                  label={i18n.t("other.private")}
                  value={"private"}
                  key={1}
                />
              </Picker>
            </Item>
            <Button
              success
              disabled={this.validator()}
              rounded
              style={{ margin: 30, marginTop: 10 }}
              onPress={() => {
                // console.log("BRUH");
                if (Localization.locale === "fr-FR") {
                  this.state.type = fr_to_en[this.state.type];
                }

                this.props.navigation.navigate("MasterSlot", {
                  dataSlot: {
                    ...this.state,
                    color:
                      this.state.calendarId !== -1
                        ? this.props.calendar.calendars.find(
                            c => c.id === this.state.calendarId
                          ).color
                        : "black"
                  }
                });
              }}
            >
              <Text>{i18n.t("dashboard.get_slots")}</Text>
            </Button>
          </Form>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    calendar: state.calendar
  };
};

const IconStyle = { color: IconColor };

// export const PreferencesForBestSlots = _PreferencesForBestSlots;

export const PreferencesForBestSlots = connect(mapStateToProps)(
  _PreferencesForBestSlots
);
