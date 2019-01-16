import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Button, Form, Icon, Input, Item, Text, Title, Container} from "native-base";
import RNPickerSelect from 'react-native-picker-select';


import {CalendarActionType, RefreshCalendar, GetEventInfo, ModifyTheEvent} from "../../redux/Calendar/calendar.actions";
import DatePicker from "react-native-datepicker";
import Loader from "../../Components/Loader";

export class _ConsultEvent extends React.Component {
    static navigationOptions = {
        title: 'Event infos'
    };


    constructor(props) {
        super(props);
        this.state = {
            EventTitle: '',
            description: '',
            localisation: '',
            dateBeginEvent: '',
            dateEndEvent: '',
            beginTime: '',
            endTime: '',
            recievedEvent: false
        };
        this.props.GetEventInfo(this.props.navigation.state.params.eventId)
    }

    fillInfoEvent(event) {
        const beginTimeEvent = event.start_time.split('T');

        const endTimeEvent = event.end_time.split('T');
        this.setState({
            id: event.id,
            EventTitle: event.name,
            description: event.description,
            localisation: event.location,
            dateBeginEvent: beginTimeEvent[0],
            beginTime: beginTimeEvent[0].substring(0, 5),
            dateEndEvent: endTimeEvent[0],
            endTime: endTimeEvent[0].substring(0, 5),
            recievedEvent: true
        })
    }

    componentDidUpdate() {
        if (this.props.calendar && this.props.calendar.status === CalendarActionType.GetEventInfoSuccess && this.state.recievedEvent === false)
            this.fillInfoEvent(this.props.calendar.event);
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
            <Container>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', marginTop: 20
                }}>
                    <Form style={{
                        marginLeft: 10, marginRight: 30, flexGrow: 3
                    }}>
                        <Item>
                            <Text style={{margin:10, color: 'black', fontFamily: 'Lato_Medium', fontSize: 26}}
                                  placeholder="Event name">
                                {this.state.EventTitle}
                            </Text>
                        </Item>
                        <Item>
                            <Icon type='SimpleLineIcons' active name='pencil'/>
                            <Text style={{margin:10, color: 'black', fontFamily: 'Lato_Medium', fontSize: 16}}
                                  placeholder="Description">
                                {this.state.description}
                            </Text>
                        </Item>
                        <Item>
                            <Icon type='SimpleLineIcons' active name='location-pin'/>
                            <Text style={{margin:10, color: 'black', fontFamily: 'Lato_Medium', fontSize: 16}}
                                   placeholder="Localisation">
                                {this.state.localisation}
                            </Text>
                        </Item>

                        <Item>
                            <Icon style={{alignSelf: 'flex-start', marginTop: 10}} type='SimpleLineIcons' active
                                  name='clock'/>

                            <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                }}>
                                    <DatePicker
                                        disabled
                                        customStyles={{placeholderText: {color: 'black', fontFamily: 'Lato_Medium'}}}
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
                                        customStyles={{placeholderText: {color: 'black', fontFamily: 'Lato_Medium'}}}
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
                                        customStyles={{placeholderText: {color: 'black', fontFamily: 'Lato_Medium'}}}
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
                                        customStyles={{placeholderText: {color: 'black', fontFamily: 'Lato_Medium'}}}
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
                    </Form>
                </View>
            </Container>
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


export const ConsultEvent = connect(mapStateToProps, mapDispatchToProps)(_ConsultEvent);