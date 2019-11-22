import React, { Component } from "react";
import { Thumbnail, View } from "native-base";
import { Text } from "native-base";
import { Dimensions, TouchableHighlight } from "react-native";
import moment from "moment";

import i18n from "i18n-js";

const type_to_theme = {
  party: "nightlife",
  work: "business",
  hobby: "people",
  workout: "sports",
  other: "abstract"
};

export default class EventCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const event = this.props.event;

    // console.log("SALOPE : ", event.image);
    
    const start_time = moment.utc(event.start_time);
    if (event.image === undefined)
      event.image = `https://lorempixel.com/400/200/${
        type_to_theme[event.type]
      }/${Math.floor((Math.random() * 1000) % 10)}`;
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => {
          this.props.navigation.navigate("EventDetail", { event_id: event.id });
        }}
      >
        <View
          style={{
            backgroundColor: "#f1f3f5",
            borderBottomWidth: 5,
            borderBottomColor: "#dddfe2",
            marginBottom: 5
          }}
        >
          {event.image && (
            <Thumbnail
              large
              style={{
                width: Dimensions.get("window").width,
                height: 160,
                borderRadius: 0
              }}
              source={{ uri: `${event.image}` }}
            />
          )}
          <View style={{ margin: 10 }}>
            <Text style={{ color: "#e94b61" }}>
              {start_time.format("ddd., DD MMMM. HH:mm")}
            </Text>
            <Text
              style={{ color: "black", marginTop: 5, fontFamily: "Lato_Bold" }}
            >
              {event.name}
            </Text>
            <Text style={{ color: "#606770" }}>{event.location}</Text>
            <Text style={{ color: "#606770" }}>
              {event.type} {i18n.t("dashboard.eventinfo.title")} -{" "}
              {event.attendees.filter(a => a.status === "going").length}{" "}
              {i18n.t("other.addusers.attendees")}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
