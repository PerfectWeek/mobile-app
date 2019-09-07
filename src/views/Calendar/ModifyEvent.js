import React from 'react';
import { Dimensions, View, StyleSheet, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import connect from "react-redux/es/connect/connect";
import { Button, Form, Icon, Input, Item, Text, Title, Container, Thumbnail, Picker, Toast } from "native-base";
import RNPickerSelect from 'react-native-picker-select';


import { CalendarActionType, RefreshCalendar, ModifyTheEvent, GetEventInfo } from "../../redux/Calendar/calendar.actions";
import DatePicker from "react-native-datepicker";
import Loader from "../../Components/Loader";
import moment from "moment";
import {IconColor, ScreenBackgroundColor} from "../../../Style/Constant";
import {ListUsers} from "./tools/ListUsers";
import {Event, PageHit} from "expo-analytics";
import { ImagePicker } from 'expo';

export class _ModifyEvent extends React.Component {
    static navigationOptions = {
        title: 'Modify event'
    };


    constructor(props) {
        super(props);
        const cals = this.props.calendar.calendars;
        for (let i = 0; i < cals.length; i++) {
            if (cals[i].id === this.props.navigation.state.params.calendarId
                && cals[i].role !== 'admin') {
                Toast.show({
                    text: 'You don\'t have rights to edit this event.',
                    type: "danger",
                    buttonText: "Okay",
                    duration: 2000
                });
                this.props.navigation.goBack();
                break;
            }
        }
        this.props.login.analytics.hit(new PageHit('ModifyEvent'));
        const event = this.props.calendar.events[this.props.navigation.state.params.eventId];
        this.props.GetEventInfo(this.props.navigation.state.params.eventId)
        this.state = this.fillInfoEvent(event);
    }

    validator() {
        return (this.state.EventTitle === '' || this.state.description === ''
            || this.state.localisation === '' || this.state.dateBeginEvent === ''
            || this.state.dateEndEvent === '' || this.state.beginTime === '' || this.state.type === -1
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
            type: this.props.calendar.eventsType.findIndex(e => e === event.type),
            dateBeginEvent: beginTimeEvent[0],
            beginTime: beginTimeEvent[1].substring(0, 5),
            dateEndEvent: endTimeEvent[0],
            endTime: endTimeEvent[1].substring(0, 5),
            recievedEvent: true,
            image: event.image,
            display: event.image,
            new_image: false,
            visibility: event.visibility,
            // attendees: event.attendees
        };
    }

    componentDidUpdate() {
        if (this.props.calendar && this.props.calendar.status === CalendarActionType.ModifyEventSuccess) {
            this.props.navigation.goBack();
            this.props.RefreshCalendar();
        }
        if (this.props.calendar && this.props.calendar.status === CalendarActionType.GetEventInfoSuccess && this.state.recievedEvent === false) {
            this.fillInfoEvent(this.props.calendar.event);
        }
        if (this.props !== undefined && this.props.attendees !== undefined && this.state.attendees === undefined) {
            this.setState({
                attendees: [...this.props.attendees],
                oldattendees: [...this.props.attendees]
            });
            // this.forceUpdate();
        }
    }

    removeA(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }

    checkAttendees() {
        let listToDel;
        let listToAdd = [];
        let oldAttend = this.state.oldattendees;
        let newAttend = this.state.attendees;
        let lp = 0;
        const len = newAttend.length + oldAttend.length
        while (lp < len) {
            for (let i = 0; i < newAttend.length; i++) {
                const tmp = newAttend[i];
                if (!oldAttend.includes(tmp)) {
                    listToAdd.push(tmp)
                    newAttend = this.removeA(newAttend, tmp);
                    oldAttend = this.removeA(oldAttend, tmp);
                    // console.log('add', tmp)

                }
                if (oldAttend.includes(tmp)) {
                    oldAttend = this.removeA(oldAttend, tmp);
                    newAttend = this.removeA(newAttend, tmp);
                    // console.log('let', tmp)
                }
                // console.log(this.state.oldattendees, this.state.attendees)

            }
            lp += 1;
        }
        listToDel = oldAttend;
        // console.log(listToAdd, listToDel, oldAttend, this.state.attendees.length + this.state.oldattendees.length)
        this.props.ModifyTheEvent({
            ...this.state,
            type: this.props.calendar.eventsType[this.state.type],
            attendeesToDel: listToDel,
            attendeesToAdd: listToAdd
        })
    }

    checkDateInPast(date) {
        const d1 = new Date(date);
        const d2 = new Date();
        d2.setHours(0);
        d2.setMinutes(0);
        if (d1.getTime() < d2.getTime()) {
            Toast.show({
                text: 'You can\'t move events in the past',
                type: "danger",
                buttonText: "Okay",
                duration: 2000
            });
            return false;
        }
        return true;
    }

    render() {
        if (this.props.calendar && (this.props.calendar.status === CalendarActionType.ModifyEvent
            || this.props.calendar.status === CalendarActionType.GetEventInfo))
            return (
                <Container style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Loader />
                </Container>
            );

        return (

            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Thumbnail style={{ marginTop: 10 }} large source={{ uri: this.state.display }} />
                    <TouchableOpacity style={GreenButtonStyle}
                        onPress={async () => {
                            const res = await ImagePicker.launchImageLibraryAsync();
                            if (res.cancelled)
                                return;
                            this.setState({ ...this.state, image: res, display: res.uri, new_image: true });
                        }}>
                        <Text style={{ fontSize: 18 }}>Select image</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <Form style={{
                        marginLeft: 10, marginRight: 30, flexGrow: 3
                    }}>
                        <Item>
                            <Input style={{ ...textStyle, fontSize: 26 }}
                                placeholder="Event name" value={this.state.EventTitle}
                                onChangeText={(text) => this.setState({ EventTitle: text })} />
                        </Item>
                        <Item>
                            <Icon style={IconStyle} type='SimpleLineIcons' active name='pencil' />
                            <Input style={textStyle}
                                placeholder="Description" value={this.state.description}
                                onChangeText={(text) => this.setState({ description: text })} />
                        </Item>
                        <Item>
                            <Icon style={IconStyle} type='SimpleLineIcons' active name='location-pin' />
                            <Input style={textStyle}
                                placeholder="Localisation" value={this.state.localisation}
                                onChangeText={(text) => this.setState({ localisation: text })} />
                        </Item>

                        <Item>
                            <Icon style={{ ...IconStyle, alignSelf: 'flex-start', marginTop: 10 }} type='SimpleLineIcons'
                                active
                                name='clock' />

                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginTop: 5
                                }}>
                                    <DatePicker
                                        customStyles={{ placeholderText: { color: 'black', fontFamily: 'Roboto_medium' } }}
                                        style={{
                                            width: 200, height: 40, justifyContent: 'center',
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
                                            if (this.checkDateInPast(date))
                                                this.setState({ dateBeginEvent: date })
                                        }}
                                    />
                                    <DatePicker
                                        customStyles={{ placeholderText: { color: 'black', fontFamily: 'Roboto_medium' } }}
                                        style={{ width: 80 }}
                                        date={this.state.beginTime}
                                        placeholder="End Time"
                                        mode="time"
                                        format="HH:mm"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        minuteInterval={1}
                                        showIcon={false}
                                        onDateChange={(time) => {
                                            this.setState({ beginTime: time });
                                        }}
                                    />
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginBottom: 5,
                                    marginTop: 5
                                }}>
                                    <DatePicker
                                        customStyles={{ placeholderText: { color: 'black', fontFamily: 'Roboto_medium' } }}
                                        style={{
                                            width: 200, height: 40, justifyContent: 'center',
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
                                            if (this.checkDateInPast(date))
                                                this.setState({ dateEndEvent: date })
                                        }}
                                    />
                                    <DatePicker
                                        customStyles={{ placeholderText: { color: 'black', fontFamily: 'Roboto_medium' } }}
                                        style={{ width: 80 }}
                                        date={this.state.endTime}
                                        placeholder="End Time"
                                        mode="time"
                                        format="HH:mm"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        minuteInterval={1}
                                        showIcon={false}
                                        onDateChange={(time) => {
                                            this.setState({ endTime: time });
                                        }}
                                    />
                                </View>
                            </View>
                        </Item>
                        <Item>
                            <Icon style={IconStyle} type='SimpleLineIcons' active name='flag' />
                            <Picker
                                placeholder="Select a event type"
                                placeholderStyle={{ color: "#9EA0A4" }}
                                note
                                selectedValue={this.state.type}
                                mode="dropdown"
                                style={{ width: 120 }}
                                onValueChange={(value) => {
                                    this.setState({ type: value });
                                }}>
                                <Picker.Item label={"Select a event type"} value={-1} key={-1} />
                                {
                                    this.props.calendar.eventsType.map((type, index) => {
                                        return <Picker.Item label={type} value={index} key={index} />
                                    })
                                }
                            </Picker>
                        </Item>
                        <Item last>
                            <Icon style={IconStyle} type='SimpleLineIcons' active name='lock' />
                            <Picker
                                placeholder="Select a visibility"
                                placeholderStyle={{ color: "#9EA0A4" }}
                                note
                                mode="dropdown"
                                style={{ width: 120 }}
                                selectedValue={this.state.visibility}
                                onValueChange={(value) => {
                                    this.setState({ visibility: value });
                                }}>
                                <Picker.Item label={'public'} value={'public'} key={0} />
                                <Picker.Item label={'private'} value={'private'} key={1} />
                            </Picker>
                        </Item>
                        {(this.props.attendees !== undefined) ?
                            <ListUsers callAddUser={(userList) => {
                                this.setState({ attendees: userList })
                            }} loadList={this.props.attendees} /> : null
                        }
                        <Button success disabled={this.validator()}
                                rounded style={{margin: 30, marginTop: 5}}
                                onPress={() => {
                                    this.props.login.analytics.event(new Event('Events', 'Modification'));

                                    this.checkAttendees()
                                }}>
                            <Text>
                                Modify event
                            </Text>
                        </Button>
                    </Form>
                </View>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        ModifyTheEvent: (event) => dispatch(ModifyTheEvent(event)),
        RefreshCalendar: () => dispatch(RefreshCalendar()),
        GetEventInfo: (eventId) => dispatch(GetEventInfo(eventId))
    }
};

const mapStateToProps = (state, ownProps) => {
    if (state.calendar.event !== undefined && state.calendar.event.attendees !== undefined)
        return {
            ...ownProps,
            calendar: state.calendar,
            attendees: state.calendar.event.attendees
        };
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

const GreenButtonStyle = {
    width: 150,
    height: 40,
    borderWidth: 2,
    borderColor: '#5CB85C',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10
};
const IconStyle = { color: IconColor };
const textStyle = { margin: 5, color: 'black', fontFamily: 'Roboto_medium', fontSize: 16 };


export const ModifyEvent = connect(mapStateToProps, mapDispatchToProps)(_ModifyEvent);