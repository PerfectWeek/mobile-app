import React from "react";
import { View, Platform } from "react-native";
import {
  Text,
  Button,
  Thumbnail,
  Title,
  Icon,
  Header,
  Left,
  Body,
  Container
} from "native-base";
import connect from "react-redux/es/connect/connect";
// import MapView from 'react-native-maps';
// import { MapView } from "expo";
import MapView from "react-native-maps";
import axios from "react-native-axios";
import { Callout } from "react-native-maps";
import { IconColor } from "../../../Style/Constant";
import i18n from "i18n-js";
import * as Localization from "expo-localization";

export class _Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = {
      pins: [],
      custom: null,
      region: {
        latitude: 46.227637,
        longitude: 2.213749,
        latitudeDelta: 8.5922,
        longitudeDelta: 8.5421
      }
    };
  }

  componentDidMount() {
    this.set_markers();
  }

  async set_markers() {
    let geocofing_token = "58bd57c6a82333";
    let pins = [];
    let tmp_events = [];
    if (this.props.events)
        tmp_events = Object.values(this.props.events);
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.event_alone
    )
      tmp_events = [this.props.navigation.state.params.event_alone];
    for (let i = 0; i < tmp_events.length; i++) {
      const event = tmp_events[i];
      try {
        if (
          !(
            this.props.navigation.state.params !== undefined &&
            this.props.navigation.state.params.id !== event.id
          )
        ) {
          var res = await axios.get(
            `https://eu1.locationiq.com/v1/search.php?key=${geocofing_token}&q=${event.location}&format=json`
          );
          pins.push({
            ...event,
            latitude: res.data[0].lat,
            longitude: res.data[0].lon
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    this.setState({
      pins: pins
    });
    this.mapRef.fitToElements(true);
  }

  mapClicked(coordinate) {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.id
    )
      return;
    this.setState({
      custom: this.state.custom === null ? { coordinate } : null
    });
  }

  render() {
    let header = (
      <Header androidStatusBarColor="#000" style={{ backgroundColor: "#FFF" }}>
        <Left>
          <Button
            transparent
            onPress={() => {
              if (
                this.props.navigation.state.params &&
                this.props.navigation.state.params.event_alone
              ) {
                this.props.navigation.goBack();
                this.props.navigation.navigate("ConsultEvent", {
                  eventId: this.props.navigation.state.params.id
                });
                return;
              } else this.props.navigation.goBack();
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
            {Localization.locale !== "fr-FR" ? "Map" : "Carte"}
          </Title>
        </Body>
      </Header>
    );
    return (
      <Container
        style={{
          paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
        }}
      >
        {header}
        <MapView
          ref={ref => {
            this.mapRef = ref;
          }}
          initialRegion={this.state.region}
          onPress={event => this.mapClicked(event.nativeEvent.coordinate)}
          style={{ flex: 1 }}
          minZoomLevel={4}
          // region={reg}
        >
          {this.state.pins.map((pin, index) => {
            const coords = {
              latitude: parseFloat(pin.latitude),
              longitude: parseFloat(pin.longitude)
            };

            return (
              <MapView.Marker
                key={index}
                coordinate={coords}
                title={pin.title}
                description={pin.description}
              >
                {/* <View style={{ backgroundColor: "black", padding: 3, borderRadius: 100 }}>
                                    <Thumbnail style={{ width: 40, height: 40, borderRadius: 100 }}
                                        source={{ uri: pin.image }} />

                                </View> */}
                <Callout
                  style={{
                    paddingTop: 3,
                    paddingBottom: 3,
                    width: 100,
                    height: 100
                  }}
                  onPress={() => {
                    if (
                      this.props.navigation.state.params &&
                      this.props.navigation.state.params.id
                    )
                      return;
                    this.props.navigation.navigate("EventDetail", {
                      event_id: pin.id
                    });
                  }}
                >
                  <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    {pin.name}
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={{
                      marginTop: 5,
                      textAlign: "center",
                      color: "rgba(0, 0, 0, 0.54)"
                    }}
                  >
                    {pin.location}
                  </Text>
                </Callout>
              </MapView.Marker>
            );
          })}
          {this.state.custom === null ? null : (
            <MapView.Marker
              key={4242885}
              coordinate={this.state.custom.coordinate}
            >
              <Icon
                style={{ color: IconColor, fontSize: 58 }}
                type="MaterialIcons"
                name="add-location"
              />
              <Callout
                style={{ width: 140, height: 50 }}
                onPress={() => {
                  this.props.navigation.navigate("CreateEvent", {
                    coordinate: this.state.custom.coordinate
                  });
                  this.setState({ custom: null });
                }}
                tooltip={true}
              >
                <Button
                  rounded
                  style={{ backgroundColor: "#3471eb", marginBottom: 10 }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white"
                    }}
                  >
                    {i18n.t("map.create")}
                  </Text>
                </Button>
              </Callout>
            </MapView.Marker>
          )}
        </MapView>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    events: state.events.events
  };
};

export const Map = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Map);
