import React from 'react';
import {
    Dimensions, ScrollView,
    View
} from 'react-native';
import {
    Button,
    Icon,
    Text, Thumbnail
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import moment from "moment";

const type_to_icon = {
    party: 'glass-cocktail',
    work: 'briefcase-outline',
    hobby: 'heart-outline',
    workout: 'soccer'
};

export class _EventDetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.event = this.props.navigation.state.params.event;
        this.state = {going: false};
    }


    render() {
        return (
            <ScrollView>
                <View style={{marginTop: 0, justifyContent: 'center'}}>
                    <Thumbnail large
                               style={{width: Dimensions.get('window').width, height: 160, borderRadius: 0}}

                               source={{uri: this.event.image}}/>
                    <Text style={{
                        color: 'black',
                        textAlign: 'center',
                        fontFamily: 'Lato_Bold',
                        fontSize: 26,
                        marginTop: 10
                    }}>
                        {this.event.name}
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 10
                    }}>
                        <Icon style={{fontSize: 18}} active name='clock' type={"SimpleLineIcons"}/>
                        <Text style={{fontSize: 18, marginLeft: 10}}>
                            {moment(this.event.start_time).format('ddd., DD MMMM. hh:mm')} - {moment(this.event.end_time).format('ddd., DD MMMM. hh:mm')}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 10
                    }}>
                        <Icon style={{fontSize: 18}} active name='location-pin' type={"SimpleLineIcons"}/>
                        <Text style={{fontSize: 18, marginLeft: 10}}>
                            {this.event.location}
                        </Text>
                    </View>
                    {this.event.type !== 'other' && <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 10
                    }}>

                        <Icon style={{fontSize: 18}} active name={type_to_icon[this.event.type]}
                              type={"MaterialCommunityIcons"}/>
                        <Text style={{fontSize: 18, marginLeft: 10}}>
                            {this.event.type} - event
                        </Text>
                    </View>
                    }

                </View>

                <Text
                    style={{
                        fontFamily: 'Roboto_medium',
                        textAlign: 'left',
                        marginTop: 10,
                        marginLeft: 10,
                        fontSize: 20,
                        color: 'gray'
                    }}>
                    Description :
                </Text>
                <Text style={{fontSize: 18, textAlign: 'center', marginTop: 0}}>

                    {this.event.description}
                </Text>


                <View style={{
                    marginTop: 25,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        flexDirection: 'column',
                    }}>
                        <Button success={this.state.going} light={!this.state.going} onPress={() => {
                            this.setState({...this.state, going: !this.state.going});
                        }}>
                            <Icon active name='check' type={"FontAwesome"}/>
                        </Button>
                        <Text style={{color: this.state.going ? '#5cb85c' : 'grey', textAlign: 'center'}}>Going</Text>
                    </View>

                </View>
            </ScrollView>

        )
    }

}

const textStyle = {margin: 10, color: 'black', fontFamily: 'Roboto_medium', fontSize: 18, textAlign: 'center'};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    }
};


export const EventDetailScreen = connect(mapStateToProps, mapDispatchToProps)(_EventDetailScreen);
