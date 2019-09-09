import React from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Button, Form, Icon, Item, Text, Container, Thumbnail} from "native-base";


import {CalendarActionType, GetEventInfo} from "../../redux/Calendar/calendar.actions";
import DatePicker from "react-native-datepicker";
import Loader from "../../Components/Loader";
import {IconColor} from "../../../Style/Constant";
import {ChangeCalendarEventStatus} from "../../redux/Calendar/calendar.actions";
import {ListUsers} from "./tools/ListUsers";

import i18n from 'i18n-js';
import * as Localization from 'expo-localization';


export class _ConsultEvent extends React.Component {
    static navigationOptions = {
        title: Localization.locale !== 'fr-FR' ? 'Event infos' : "Evenement"
    };


    constructor(props) {
        super(props);
        // console.log('OOKKKKK')
        const event = this.props.calendar.events[this.props.navigation.state.params.eventId];
        // this.props.login.analytics.hit(new PageHit('ConsultEvent'));

        this.props.GetEventInfo(this.props.navigation.state.params.eventId);
        // console.log('envent', event)
        this.state = this.fillInfoEvent(event);
    }

    fillInfoEvent(event) {
        const beginTimeEvent = event.start_time.split('T');

        const endTimeEvent = event.end_time.split('T');
        return {
            id: event.id,
            EventTitle: event.name,
            description: event.description,
            localisation: event.location,
            type: event.type,
            dateBeginEvent: beginTimeEvent[0],
            beginTime: beginTimeEvent[1].substring(0, 5),
            dateEndEvent: endTimeEvent[0],
            endTime: endTimeEvent[1].substring(0, 5),
            image: event.image,
            visibility: event.visibility
        }
    }

    render() {
        if (this.props.calendar && (this.props.calendar.status === CalendarActionType.ModifyEvent
            || this.props.calendar.status === CalendarActionType.GetEventInfo)
        )
            return (
                <Container style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Loader/>
                </Container>
            );

        return (
            <ScrollView>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', margin: 20, marginBottom: 40}}>
                    <Thumbnail large source={{uri: this.state.image}}/>
                    <Text style={{...textStyle, fontSize: 25}}>
                        {this.state.EventTitle}
                    </Text>
                </View>

                <Form style={{
                    flexGrow: 3
                }}>
                    <Item>
                        <Icon style={IconStyle} type='SimpleLineIcons' active name='pencil'/>
                        <Text style={{...textStyle, marginRight: 40}}>
                            {this.state.description}
                        </Text>
                    </Item>
                    <Item>
                        <Icon style={IconStyle} type='SimpleLineIcons' active name='location-pin'/>
                        <Text style={textStyle}
                              placeholder="Localisation">
                            {this.state.localisation}
                        </Text>
                    </Item>

                    <Item>
                        <Icon style={{...IconStyle, alignSelf: 'flex-start', marginTop: 10}} type='SimpleLineIcons'
                              active
                              name='clock'/>

                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <DatePicker
                                    disabled
                                    customStyles={{
                                        placeholderText: {
                                            color: 'black',
                                            fontFamily: 'Roboto_medium'
                                        }
                                    }}
                                    style={{
                                        width: 200, height: 50, justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    placeholder={this.state.dateBeginEvent === '' ? i18n.t('dashboard.eventinfo.begin') : this.state.dateBeginEvent}
                                    format="YYYY-MM-DD"
                                    minDate="2018-01-01"
                                    maxDate={this.state.dateEndEvent === '' ? "2022-01-01" : this.state.dateEndEvent}
                                    confirmBtnText={i18n.t('other.confirm')}
                                    cancelBtnText={i18n.t('other.cancel')}
                                    showIcon={false}
                                    onDateChange={(date) => {
                                        this.setState({dateBeginEvent: date})
                                    }}
                                />
                                <DatePicker disabled
                                            customStyles={{
                                                placeholderText: {
                                                    color: 'black',
                                                    fontFamily: 'Roboto_medium'
                                                }
                                            }}
                                            style={{width: 80}}
                                            date={this.state.beginTime}
                                            placeholder={i18n.t('dashboard.eventinfo.endtime')}
                                            mode="time"
                                            format="HH:mm"
                                            confirmBtnText={i18n.t('other.confirm')}
                                            cancelBtnText={i18n.t('other.cancel')}
                                            minuteInterval={1}
                                            showIcon={false}
                                            onDateChange={(time) => {
                                                this.setState({beginTime: time});
                                            }}
                                />
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <DatePicker disabled
                                            customStyles={{
                                                placeholderText: {
                                                    color: 'black',
                                                    fontFamily: 'Roboto_medium'
                                                }
                                            }}
                                            style={{
                                                width: 200, height: 50, justifyContent: 'center',
                                                alignItems: 'center', borderLeftColor: 'white'
                                            }}
                                            placeholder={this.state.dateEndEvent === '' ? "Ending" : this.state.dateEndEvent}
                                            format="YYYY-MM-DD"
                                            minDate={this.state.dateBeginEvent === '' ? "2018-01-01" : this.state.dateBeginEvent}
                                            maxDate="2022-01-01"
                                            confirmBtnText={i18n.t('other.confirm')}
                                            cancelBtnText={i18n.t('other.cancel')}
                                            showIcon={false}
                                            onDateChange={(date) => {
                                                this.setState({dateEndEvent: date})
                                            }}
                                />
                                <DatePicker disabled
                                            customStyles={{
                                                placeholderText: {
                                                    color: 'black',
                                                    fontFamily: 'Roboto_medium'
                                                }
                                            }}
                                            style={{width: 80}}
                                            date={this.state.endTime}
                                            placeholder={i18n.t('dashboard.eventinfo.endtime')}
                                            mode="time"
                                            format="HH:mm"
                                            confirmBtnText={i18n.t('other.confirm')}
                                            cancelBtnText={i18n.t('other.cancel')}
                                            minuteInterval={1}
                                            showIcon={false}
                                            onDateChange={(time) => {
                                                this.setState({endTime: time});
                                            }}
                                />
                            </View>
                        </View>
                    </Item>
                    <Item>
                        <Icon style={IconStyle} type='SimpleLineIcons' active name='flag'/>
                        <Text style={textStyle}
                              placeholder="Type">
                            {this.state.type}
                        </Text>
                    </Item>
                    <Item last>
                        <Icon style={IconStyle} type='SimpleLineIcons' active name='lock'/>
                        <Text style={textStyle}
                              placeholder={i18n.t('dashboard.eventinfo.visibility')}>
                            {this.state.visibility}
                        </Text>
                    </Item>
                    {(this.props.attendees !== undefined) ?
                        <ListUsers callAddUser={()=>{}} loadList={this.props.attendees} editMode={false}/> : null
                    }
                    <Button style={{backgroundColor: '#e94b61', margin: 10}} full onPress={() => {

                        Alert.alert(i18n.t('other.leave') + ' ?', '', [{
                            text: i18n.t('other.yes'), onPress: () => {
                                this.props.navigation.navigate('Master');
                                this.props.ChangeCalendarEventStatus({id: this.state.id}, i18n.t('other.no'))
                            }
                        }, {
                            text: i18n.t('other.cancel'), onPress: () => {
                            }, style: 'cancel'
                        }], {cancelable: false})


                    }}><Text>{i18n.t('other.leave')}</Text></Button>
                </Form>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetEventInfo: (event) => dispatch(GetEventInfo(event)),
        ChangeCalendarEventStatus: (event, status) => dispatch(ChangeCalendarEventStatus(event, status)),
    }
};

const mapStateToProps = (state, ownProps) => {
    // return {
    //     ...ownProps,
    //     calendar: state.calendar,
    //     // attendees: state.calendar.event.attendees
    //     // login: state.login
    // }
    if (state.calendar.event !== undefined && state.calendar.event.attendees !== undefined) {
        // console.log('state.calendar.event.attendees', state.calendar.event.attendees)
        return {
            ...ownProps,
            calendar: state.calendar,
            attendees: state.calendar.event.attendees
        };
    }
    else
        return {
            ...ownProps,
            calendar: state.calendar,
        }
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        width: 250
    },
    inputAndroid: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        width: 250
    }
});

const IconStyle = {color: IconColor};

const textStyle = {margin: 10, color: 'black', fontFamily: 'Roboto_medium', fontSize: 16};

export const ConsultEvent = connect(mapStateToProps, mapDispatchToProps)(_ConsultEvent);