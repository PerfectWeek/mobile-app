import React from 'react';
import {Dimensions, View, StyleSheet, ScrollView} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Button, Form, Icon, Input, Item, Text, Title, Container, Thumbnail} from "native-base";
import RNPickerSelect from 'react-native-picker-select';


import {CalendarActionType, RefreshCalendar, GetEventInfo, ModifyTheEvent} from "../../redux/Calendar/calendar.actions";
import DatePicker from "react-native-datepicker";
import Loader from "../../Components/Loader";
import {IconColor} from "../../../Style/Constant";

export class _ConsultEvent extends React.Component {
    static navigationOptions = {
        title: 'Event infos'
    };


    constructor(props) {
        super(props);
        const event = this.props.calendar.events[this.props.navigation.state.params.eventId];
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
                    <Text style={{...textStyle, fontSize: 26}}>
                        {this.state.EventTitle}
                    </Text>
                </View>

                <Form style={{
                    marginLeft: 10, marginRight: 30, marginTop: 20, flexGrow: 3
                }}>
                    <Item>
                        <Icon style={IconStyle} type='SimpleLineIcons' active name='pencil'/>
                        <Text style={textStyle}>
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
                        <Icon style={{...IconStyle, alignSelf: 'flex-start', marginTop: 10}} type='SimpleLineIcons' active
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
                                    placeholder={this.state.dateBeginEvent === '' ? "Beginning" : this.state.dateBeginEvent}
                                    format="YYYY-MM-DD"
                                    minDate="2018-01-01"
                                    maxDate={this.state.dateEndEvent === '' ? "2022-01-01" : this.state.dateEndEvent}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
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
                                            placeholder="End Time"
                                            mode="time"
                                            format="HH:mm"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
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
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
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
                                            placeholder="End Time"
                                            mode="time"
                                            format="HH:mm"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
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
                              placeholder="Visibility">
                            {this.state.visibility}
                        </Text>
                    </Item>
                </Form>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetEventInfo: (event) => dispatch(GetEventInfo(event)),
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        calendar: state.calendar,
        // login: state.login
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