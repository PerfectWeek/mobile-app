import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Button, Form, Icon, Input, Item, Text, Title, Container} from "native-base";
import RNPickerSelect from 'react-native-picker-select';


import {CalendarActionType, RefreshCalendar, ModifyTheEvent} from "../../redux/Calendar/calendar.actions";
import DatePicker from "react-native-datepicker";
import Loader from "../../Components/Loader";
import moment from "moment";

export class _ModifyEvent extends React.Component {
    static navigationOptions = {
        title: 'Modify event'
    };


    constructor(props) {
        super(props);
        const event = this.props.calendar.events[this.props.navigation.state.params.eventId];
        this.state = this.fillInfoEvent(event);
    }

    validator() {
        return (this.state.EventTitle === '' || this.state.description === ''
            || this.state.localisation === '' || this.state.dateBeginEvent === ''
            || this.state.dateEndEvent === '' || this.state.beginTime === ''
            || this.state.endTime === ''
            || this.state.dateBeginEvent === this.state.dateEndEvent && moment(this.state.endTime, "HH:mm") < moment(this.state.beginTime, "HH:mm")
        )
    }

    fillInfoEvent(event) {
        const beginTimeEvent = event.start_time.split('T');
        const endTimeEvent = event.end_time.split('T');
        return {
            id: event.id,
            EventTitle: event.name,
            description: event.description,
            localisation: event.location,
            dateBeginEvent: beginTimeEvent[0],
            beginTime: beginTimeEvent[1].substring(0, 5),
            dateEndEvent: endTimeEvent[0],
            endTime: endTimeEvent[1].substring(0, 5),
            recievedEvent: true
        };
    }

    componentDidUpdate() {
        if (this.props.calendar && this.props.calendar.status === CalendarActionType.ModifyEventSuccess) {
            this.props.navigation.goBack();
            this.props.RefreshCalendar();
        }

        if (this.props.calendar && this.props.calendar.status === CalendarActionType.GetEventInfoSuccess && this.state.recievedEvent === false)
            this.fillInfoEvent(this.props.calendar.event);
    }

    render() {
        // if (this.props.calendar && this.props.calendar.status === CalendarActionType.ModifyEventSuccess)
        // {
        //     this.props.navigation.goBack();
        //     this.props.RefreshCalendar();
        // }

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
        // if (this.props.calendar && this.props.calendar.status === CalendarActionType.GetEventInfoSuccess && this.state.recievedEvent === false)
        //     this.fillInfoEvent(this.props.calendar.event);
        return (
            <Container>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', marginTop: 20
                }}>
                    <Form style={{
                        marginLeft: 10, marginRight: 30, flexGrow: 3
                    }}>
                        <Item>
                            <Input style={{...textStyle, fontSize: 26}}
                                   placeholder="Event name" value={this.state.EventTitle}
                                   onChangeText={(text) => this.setState({EventTitle: text})}/>
                        </Item>
                        <Item>
                            <Icon type='SimpleLineIcons' active name='pencil'/>
                            <Input style={textStyle}
                                   placeholder="Description" value={this.state.description}
                                   onChangeText={(text) => this.setState({description: text})}/>
                        </Item>
                        <Item>
                            <Icon type='SimpleLineIcons' active name='location-pin'/>
                            <Input style={textStyle}
                                   placeholder="Localisation" value={this.state.localisation}
                                   onChangeText={(text) => this.setState({localisation: text})}/>
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
                                        customStyles={{placeholderText: {color: 'black', fontFamily: 'Roboto_medium'}}}
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
                                    <DatePicker
                                        customStyles={{placeholderText: {color: 'black', fontFamily: 'Roboto_medium'}}}
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
                                    <DatePicker
                                        customStyles={{placeholderText: {color: 'black', fontFamily: 'Roboto_medium'}}}
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
                                    <DatePicker
                                        customStyles={{placeholderText: {color: 'black', fontFamily: 'Roboto_medium'}}}
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
                        <Button success disabled={this.validator()}
                                rounded style={{margin: 30, marginTop: 5}}
                                onPress={() => {
                                    this.props.ModifyTheEvent(this.state)
                                }}>
                            <Text>
                                Modify event
                            </Text>
                        </Button>
                    </Form>
                </View>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        ModifyTheEvent: (event) => dispatch(ModifyTheEvent(event)),
        RefreshCalendar: () => dispatch(RefreshCalendar())
    }
};

const mapStateToProps = (state, ownProps) => {
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

const textStyle = {margin: 10, color: 'black', fontFamily: 'Roboto_medium', fontSize: 16};


export const ModifyEvent = connect(mapStateToProps, mapDispatchToProps)(_ModifyEvent);