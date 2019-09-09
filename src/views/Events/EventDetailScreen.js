import React from 'react';
import {
    Dimensions, ScrollView,
    View, TouchableOpacity, ActivityIndicator
} from 'react-native';
import {
    Button,
    Icon,
    Text, Thumbnail
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import moment from "moment";
import Modal from "../../Components/Modal";
import { GroupsActionType } from "../../redux/Groups/groups.actions";
import UserList from "../../Components/UserList";
import { ChangeEventStatus, JoinEvent } from "../../redux/Events/events.actions";

import i18n from 'i18n-js';

const type_to_icon = {
    party: 'glass-cocktail',
    work: 'briefcase-outline',
    hobby: 'heart-outline',
    workout: 'soccer'
};

export class _EventDetailScreen extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        let event = this.props.event;
        let going = false;
        let user = event.attendees.find(a => a.pseudo === this.props.pseudo);
        let present = user !== undefined;
        if (present && user.status === 'going')
            going = true;
        return (
            <ScrollView>
                <View style={{ marginTop: 0, justifyContent: 'center' }}>
                    <Thumbnail large
                        style={{ width: Dimensions.get('window').width, height: 160, borderRadius: 0 }}

                        source={{ uri: event.image }} />
                    <Text style={{
                        color: 'black',
                        textAlign: 'center',
                        fontFamily: 'Lato_Bold',
                        fontSize: 26,
                        marginTop: 10
                    }}>
                        {event.name}
                    </Text>

                    <View style={rowStyle}>

                        <Icon style={{ fontSize: 18 }} active name='clock' type={"SimpleLineIcons"} />
                        <Text style={{ fontSize: 18, marginLeft: 10 }}>
                            {moment.utc(event.start_time).format('ddd., DD MMMM. HH:mm')} - {moment.utc(event.end_time).format('ddd., DD MMMM. HH:mm')}
                        </Text>
                    </View>
                    <View style={rowStyle}>

                        <Icon style={{ fontSize: 18 }} active name='location-pin' type={"SimpleLineIcons"} />
                        <Text style={{ fontSize: 18, marginLeft: 10 }}>
                            {event.location}
                        </Text>
                    </View>
                    <View style={rowStyle}>
                        <Icon style={{ fontSize: 18 }} active name='people' type={"SimpleLineIcons"} />
                        <Text style={{ fontSize: 18, marginLeft: 10 }}>
                            {event.attendees.filter(a => a.status === 'going').length} people going
                        </Text>
                        <TouchableOpacity onPress={() => { this.modal.toggle() }}>
                            <Text style={{
                                marginLeft: 10,
                                fontSize: 18,
                                borderBottomColor: 'black',
                                borderBottomWidth: 1
                            }}>{i18n.t('other.addusers.seeattendees')}</Text>
                        </TouchableOpacity>
                    </View>
                    {event.type !== 'other' && <View style={rowStyle}>
                        <Icon style={{fontSize: 18}} active name={type_to_icon[event.type]}
                              type={"MaterialCommunityIcons"}/>
                        <Text style={{fontSize: 18, marginLeft: 10}}>
                            {event.type} {i18n.t('dashboard.eventinfo.title')}
                        </Text>
                    </View>
                    }

                </View>

                <Modal
                    onRef={ref => (this.modal = ref)} title={i18n.t('other.addusers.attendees')}>
                    <UserList users={event.attendees.filter(a => a.status === 'going')}/>
                </Modal>

                <Text
                    style={{
                        fontFamily: 'Roboto_medium',
                        textAlign: 'left',
                        marginTop: 10,
                        marginLeft: 10,
                        fontSize: 20,
                        color: 'gray'
                    }}>
                    {i18n.t('dashboard.createvent.description')} :
                </Text>
                <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 0 }}>
                    {event.description}
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
                        <Button disabled={this.props.loading_joining === true} style={{padding:this.props.loading_joining === true?10:0}} success={going} light={!going} onPress={() => {
                            if (!present)
                                this.props.JoinEvent(event, 'going');
                            else
                                this.props.ChangeEventStatus(event, going ? 'no' : 'going');
                        }}>
                            {
                                this.props.loading_joining === true ? <ActivityIndicator size="large" color="black" /> : <Icon active name='check' type={"FontAwesome"} />
                            }
                        </Button>
                        <Text style={{color: going ? '#5cb85c' : 'grey', textAlign: 'center'}}>{i18n.t('events.going')}</Text>
                    </View>

                </View>
            </ScrollView>

        )
    }

}

const textStyle = { margin: 10, color: 'black', fontFamily: 'Roboto_medium', fontSize: 18, textAlign: 'center' };
const rowStyle = { flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20, marginTop: 10 };

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        JoinEvent: (event, status) => dispatch(JoinEvent(event, status)),
        ChangeEventStatus: (event, status) => dispatch(ChangeEventStatus(event, status)),
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        pseudo: state.login.pseudo,
        event: state.events.events[ownProps.navigation.state.params.event_id],
        loading_joining: state.events.loading_joining
    }
};


export const EventDetailScreen = connect(mapStateToProps, mapDispatchToProps)(_EventDetailScreen);
