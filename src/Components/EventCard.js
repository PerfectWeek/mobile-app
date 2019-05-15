import React, {Component} from 'react';
import {Thumbnail, View} from 'native-base';
import {

    Text
} from 'native-base';
import {Dimensions, TouchableNativeFeedback} from "react-native";
import moment from "moment";

const type_to_theme = {
    party: 'nightlife',
    work: 'business',
    hobby: 'people',
    workout: 'sports',
    other: 'abstract'
};

export default class EventCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const event = this.props.event;
        const start_time = moment(event.start_time);
        if (event.image === undefined)
            event.image = `https://lorempixel.com/400/200/${type_to_theme[event.type]}/${Math.floor((Math.random() * 1000 % 10))}`;
        return (
            <TouchableNativeFeedback onPress={() => {
                this.props.navigation.navigate('EventDetail', {event: event});
            }} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{
                    backgroundColor: '#f1f3f5',
                    borderBottomWidth: 5,
                    borderBottomColor: '#dddfe2',
                    marginBottom: 5
                }}>

                    <Thumbnail large
                               style={{width: Dimensions.get('window').width, height: 160, borderRadius: 0}}
                               source={{uri: event.image}}/>
                    <View style={{margin: 10}}>
                        <Text style={{color: '#e94b61'}}>
                            {start_time.format('ddd., DD MMMM. hh:mm')}
                        </Text>
                        <Text style={{color: 'black', marginTop: 5, fontFamily: 'Lato_Bold'}}>
                            {event.name}
                        </Text>
                        <Text style={{color: '#606770'}}>
                            {event.location}
                        </Text>
                        <Text style={{color: '#606770'}}>
                            {event.type} event - {event.attendees.length} attendee
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
