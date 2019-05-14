import React, {Component} from 'react';
import {Thumbnail, View} from 'native-base';
import {

    Text
} from 'native-base';
import {Dimensions} from "react-native";

export default class EventCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                backgroundColor: '#f1f3f5', borderWidth: 1,
                borderColor: '#dddfe2',
                marginBottom: 5
            }}>
                <Thumbnail large
                           style={{width: Dimensions.get('window').width, height: 160, borderRadius: 0}}
                           source={{uri: 'https://picsum.photos/600/160?image=' + Math.floor((Math.random() * 1000) % 200)}}/>
                <View style={{margin: 10}}>
                    <Text style={{color: '#e94b61'}}>
                        FRI., 12 JUIL. 19:00
                    </Text>
                    <Text style={{color: 'black', marginTop: 5, fontFamily: 'Lato_Bold'}}>
                        Montreal Glow Party
                    </Text>
                    <Text style={{color: '#606770'}}>
                        Vieux-Port - Montréal
                    </Text>
                    <Text style={{color: '#606770'}}>
                        1 379 participant
                    </Text>
                </View>
            </View>
        );
    }
}
