import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Button, Form, Icon, Input, Picker, Item, Text, CheckBox, Container} from "native-base";
import RNPickerSelect from 'react-native-picker-select';


import {CalendarActionType, CreateNewEvent, RefreshCalendar} from "../../redux/Calendar/calendar.actions";
import DatePicker from "react-native-datepicker";
import Loader from "../../Components/Loader";
import moment from "moment";
import {IconColor} from "../../../Style/Constant";

export class _CreateEvent extends React.Component {
    static navigationOptions = {
        title: 'Create event'
    };


    constructor(props) {
        super(props);
        this.state = {
            EventTitle: '',
            description: '',
            localisation: '',
            dateBeginEvent: '',
            dateEndEvent: '',
            visibility: 'public',
            type: -1,
            beginTime: new Date().toLocaleTimeString('en-US', {hour12: false, hour: "numeric", minute: "numeric"}),
            endTime: '',
            calendarId: -1,
            typeEvent: ''
        }
    }

    validator() {
        return (this.state.EventTitle === '' || this.state.description === ''
            || this.state.localisation === '' || this.state.dateBeginEvent === '' || this.state.type === -1
            || this.state.dateEndEvent === '' || this.state.beginTime === '' || this.state.visibility === ''
            || this.state.endTime === '' || this.state.calendarId === -1
            || this.state.dateBeginEvent === this.state.dateEndEvent && moment(this.state.endTime, "HH:mm") < moment(this.state.beginTime, "HH:mm")
        )
    }

    componentDidUpdate() {
        if (this.props.calendar && this.props.calendar.status === CalendarActionType.CreateNewEventSuccess) {
            this.props.navigation.goBack();
            this.props.RefreshCalendar();
        }
    }

    render() {
        const eventsDefinedTypes = ['party', 'work', 'workout', 'hobby'];
        let listcal = [];
        this.props.calendar.calendars.map((it) => {
            listcal.push({
                label: it.name,
                value: it.id,
            })
        });

        if (this.props.calendar && this.props.calendar.status === CalendarActionType.CreateNewEvent)
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
                            <Input style={{color: 'black', fontFamily: 'Roboto_medium', fontSize: 26}}
                                   placeholder="Event name" value={this.state.EventTitle}
                                   onChangeText={(text) => this.setState({EventTitle: text})}/>
                        </Item>
                        <Item>
                            <Icon style={IconStyle} type='SimpleLineIcons' active name='pencil'/>
                            <Input style={{color: 'black', fontFamily: 'Roboto_medium', fontSize: 16}}
                                   placeholder="Description" value={this.state.description}
                                   onChangeText={(text) => this.setState({description: text})}/>
                        </Item>
                        <Item>
                            <Icon style={IconStyle} type='SimpleLineIcons' active name='location-pin'/>
                            <Input style={{color: 'black', fontFamily: 'Roboto_medium', fontSize: 16}}
                                   placeholder="Localisation" value={this.state.localisation}
                                   onChangeText={(text) => this.setState({localisation: text})}/>
                        </Item>

                        <Item>
                            <Icon style={{...IconStyle, alignSelf: 'flex-start', marginTop: 10}} type='SimpleLineIcons'
                                  active
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
                        <Item>
                            <Icon style={IconStyle} type='SimpleLineIcons' active name='flag'/>
                            <Picker
                                placeholder="Select a event type"
                                placeholderStyle={{color: "#9EA0A4"}}
                                note
                                selectedValue={this.state.type}
                                mode="dropdown"
                                style={{width: 120}}
                                onValueChange={(value) => {
                                    this.setState({type: value});
                                }}>
                                <Picker.Item label={"Select a event type"} value={-1} key={-1}/>
                                {
                                    this.props.calendar.eventsType.map((type, index) => {
                                        return <Picker.Item label={type} value={index} key={index}/>
                                    })
                                }
                            </Picker>
                        </Item>
                        <Item>
                            <Icon style={IconStyle} type='SimpleLineIcons' active name='calendar'/>
                            <Picker
                                placeholder="Select a calendar"
                                placeholderStyle={{color: "#9EA0A4"}}
                                note
                                selectedValue={this.state.calendarId}
                                mode="dropdown"
                                style={{width: 120}}
                                onValueChange={(value) => {
                                    this.setState({calendarId: value});
                                }}>
                                <Picker.Item label={"Select a calendar"} value={-1} key={-1}/>
                                {
                                    this.props.calendar.calendars.map(c => {
                                        return <Picker.Item label={c.name} value={c.id} key={c.id}/>
                                    })
                                }
                            </Picker>
                        </Item>
                        <Item last>
                            <Icon style={IconStyle} type='SimpleLineIcons' active name='lock'/>
                            <Picker
                                placeholder="Select a visibility"
                                placeholderStyle={{color: "#9EA0A4"}}
                                note
                                // selectedValue={this.state.visibility}
                                mode="dropdown"
                                style={{width: 120}}
                                onValueChange={(value) => {
                                    this.setState({visibility: value});
                                }}>
                                <Picker.Item label={'public'} value={'public'} key={0}/>
                                <Picker.Item label={'private'} value={'private'} key={1}/>
                            </Picker>
                        </Item>
                        <Button success disabled={this.validator()}
                                rounded style={{margin: 30, marginTop: 10}}
                                onPress={() => {
                                    this.props.CreateNewEvent({
                                        ...this.state,
                                        type: this.props.calendar.eventsType[this.state.type]
                                    })
                                }}>
                            <Text>
                                Create event
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
        CreateNewEvent: (event) => dispatch(CreateNewEvent(event)),
        RefreshCalendar: () => dispatch(RefreshCalendar())
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        calendar: state.calendar,
        login: state.login
    }
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        // borderWidth: 1,
        // borderColor: 'gray',
        // borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        width: 250
    },
    inputAndroid: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        backgroundColor: 'white',
        color: 'black',
        width: 250
    }
});

const IconStyle = {color: IconColor};

export const CreateEvent = connect(mapStateToProps, mapDispatchToProps)(_CreateEvent);