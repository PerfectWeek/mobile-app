import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Button, Form, Icon, Input, Item, Text, Title, Container} from "native-base";
import RNPickerSelect from 'react-native-picker-select';


import {CalendarActionType, CreateNewEvent, RefreshCalendar} from "../../redux/Calendar/calendar.actions";
import DatePicker from "react-native-datepicker";
import Loader from "../../Components/Loader";

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
            beginTime: new Date().toLocaleTimeString('en-US', {hour12: false, hour: "numeric", minute: "numeric"}),
            endTime: '',
            calendarId: -1,
            calRef: 0
        }
    }

    validator() {
        return (this.state.EventTitle === '' || this.state.description === ''
            || this.state.localisation === '' || this.state.dateBeginEvent === ''
            || this.state.dateEndEvent === '' || this.state.beginTime === ''
            || this.state.endTime === '' || this.state.calendarId === -1
        )
    }

    componentDidUpdate() {
        if (this.props.calendar && this.props.calendar.status === CalendarActionType.CreateNewEventSuccess) {
            this.props.navigation.goBack();
            this.props.RefreshCalendar();
        }
    }

    render() {
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
                            <Input style={{color: 'black', fontFamily: 'Lato_Medium', fontSize: 26}}
                                   placeholder="Event name" value={this.state.EventTitle}
                                   onChangeText={(text) => this.setState({EventTitle: text})}/>
                        </Item>
                        <Item>
                            <Icon type='SimpleLineIcons' active name='pencil'/>
                            <Input style={{color: 'black', fontFamily: 'Lato_Medium', fontSize: 16}}
                                   placeholder="Description" value={this.state.description}
                                   onChangeText={(text) => this.setState({description: text})}/>
                        </Item>
                        <Item>
                            <Icon type='SimpleLineIcons' active name='location-pin'/>
                            <Input style={{color: 'black', fontFamily: 'Lato_Medium', fontSize: 16}}
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
                                    <DatePicker
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
                                    <DatePicker
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
                                    <DatePicker
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

                        <Item last>
                            <Icon type='SimpleLineIcons' active name='calendar'/>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Select a calendar...',
                                    value: null,
                                    color: '#9EA0A4'
                                }}
                                style={{...pickerSelectStyles}}
                                items={listcal}
                                onValueChange={(value) => {
                                    this.setState({
                                        calendarId: value,
                                    });
                                }}
                                value={this.state.calendarId}
                                ref={(el) => {
                                    this.state.calref = el;
                                }}
                                useNativeAndroidPickerStyle={false}
                                hideIcon={true}
                            />
                        </Item>
                        <Button success disabled={this.validator()}
                                rounded style={{margin: 30, marginTop: 10}}
                                onPress={() => {
                                    this.props.CreateNewEvent(this.state)
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


export const CreateEvent = connect(mapStateToProps, mapDispatchToProps)(_CreateEvent);