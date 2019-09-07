import React from 'react';
import { View, } from 'react-native';
import {
    Text, Button, Thumbnail, Title
} from 'native-base';
import connect from "react-redux/es/connect/connect";
// import MapView from 'react-native-maps';
// import { MapView } from "expo";
import MapView from 'react-native-maps'
import axios from 'react-native-axios'
import { Callout } from 'react-native-maps'


export class _Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pins: []
        }
    }

    componentDidMount() {
        this.lel()
    }

    async lel() {
        console.log("LETSGO");
        let geocofing_token = '58bd57c6a82333'
        let pins = [];

        let tmp_events = Object.values(this.props.events);
        for (let i = 0; i < tmp_events.length; i++) {
            const event = tmp_events[i];

            try {
                var res = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${geocofing_token}&q=${event.location}&format=json`)
                pins.push({ ...event, latitude: res.data[0].lat, longitude: res.data[0].lon })
            } catch (error) {
                console.log(error);
            }
        }
        this.setState({
            pins: pins
        })
        // console.log(this.state.pins);

    }

    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                region={{
                    latitude: 46.227638,
                    longitude: 2.213749,
                    latitudeDelta: 8.5922,
                    longitudeDelta: 8.5421,
                }}
            >

                {
                    this.state.pins.map((pin, index) => {
                        const coords = {
                            latitude: parseFloat(pin.latitude),
                            longitude: parseFloat(pin.longitude),
                        };


                        return (
                            <MapView.Marker
                                key={index}
                                coordinate={coords}
                                title={pin.title}
                                description={pin.description}
                            >
                                <View style={{ backgroundColor: "black", padding: 3, borderRadius: 100 }}>
                                    <Thumbnail style={{ width: 40, height: 40, borderRadius: 100 }}
                                        source={{ uri: pin.image }} />

                                </View>
                                <Callout onPress={() => {
                                    this.props.navigation.navigate('EventDetail', { event_id: pin.id });
                                }}>
                                    <Text style={{ fontWeight: 'bold' }}>{pin.name}</Text>
                                </Callout>
                            </MapView.Marker>
                        );
                    })
                }
            </MapView>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        events: state.events.events,
    }
};

export const Map = connect(mapStateToProps, mapDispatchToProps)(_Map);
