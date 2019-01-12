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
            groupName: '',
            description: '',
            localisation: '',
            dateBeginEvent : '',
            dateEndEvent : '',
            beginTime : '',
            endTime : '',
            calendarId: -1,
            calRef: 0
        }
    }

    validator() {
        return (this.state.groupName === '' || this.state.description === ''
            || this.state.localisation === '' || this.state.dateBeginEvent === ''
            || this.state.dateEndEvent === '' || this.state.beginTime === ''
            || this.state.endTime === '' || this.state.calendarId === -1
        )
    }

    render() {
        if (this.props.calendar && this.props.calendar.status === CalendarActionType.CreateNewEventSuccess)
        {
            this.props.navigation.goBack();
            this.props.RefreshCalendar();
        }
        let listcal = [];
        this.props.calendar.calendars.map((it) => {
            listcal.push({
                label: it.calendarName,
                value: it.calendarId,
            })
        });

        if (this.props.calendar && this.props.calendar.status === CalendarActionType.CreateNewEvent)
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
            <Container>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', marginTop: 20
                }}>
                    <Form style={{
                        marginLeft: 10, marginRight: 30, flexGrow: 3
                    }}>
                        <Item>
                            <Input style={{textAlign: 'center', color: 'black', fontFamily: 'Lato_Bold', fontSize: 26}}
                                   placeholder="Group name" value={this.state.groupName}
                                   onChangeText={(text) => this.setState({groupName: text})}/>
                        </Item>
                        <Item>
                            <Input style={{textAlign: 'center', color: 'black', fontFamily: 'Lato_Medium', fontSize: 16}}
                                   placeholder="Description" value={this.state.description}
                                   onChangeText={(text) => this.setState({description: text})}/>
                        </Item>
                        <Item>
                            <Input style={{textAlign: 'center', color: 'black', fontFamily: 'Lato_Medium', fontSize: 16}}
                                   placeholder="Localisation" value={this.state.localisation}
                                   onChangeText={(text) => this.setState({localisation: text})}/>
                        </Item>
                        <Title style={{
                            color: 'black',
                            fontFamily: 'Lato_Bold',
                            fontSize: 18,
                            marginTop: 20,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                        }}>End event</Title>
                        <Item style={{ justifyContent: 'center',
                            alignItems: 'center'}}>
                            <DatePicker
                                style={{width: 50}}
                                date={this.state.beginTime}
                                mode="time"
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                minuteInterval={1}
                                showIcon={false}
                                onDateChange={(time) => {this.setState({beginTime: time});}}
                            />
                            <DatePicker
                                style={{width: 200, height:50,  justifyContent: 'center',
                                    alignItems: 'center'}}
                                placeholder={this.state.dateBeginEvent === '' ? "Select date" : this.state.dateBeginEvent}
                                format="YYYY-MM-DD"
                                minDate="2018-01-01"
                                maxDate="2022-01-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                onDateChange={(date) => {this.setState({dateBeginEvent: date})}}
                            />
                        </Item>
                        <Title style={{
                        color: 'black',
                        fontFamily: 'Lato_Bold',
                        fontSize: 18,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    }}>Begin event</Title>
                        <Item style={{ justifyContent: 'center',
                            alignItems: 'center'}}>
                            <DatePicker
                                style={{width: 50}}
                                date={this.state.endTime}
                                mode="time"
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                minuteInterval={1}
                                showIcon={false}
                                onDateChange={(time) => {this.setState({endTime: time});}}
                            />
                            <DatePicker
                                style={{width: 200, height:50,  justifyContent: 'center',
                                    alignItems: 'center', borderLeftColor: 'white'}}
                                placeholder={this.state.dateEndEvent === '' ? "Select date" : this.state.dateEndEvent}
                                format="YYYY-MM-DD"
                                minDate="2018-01-01"
                                maxDate="2022-01-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                onDateChange={(date) => {this.setState({dateEndEvent: date})}}
                            />
                        </Item>
                        <Item>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Select a calendar...',
                                value: null,
                                color: '#9EA0A4'
                            }}
                            style={{ ...pickerSelectStyles }}
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
                                rounded style={{margin: 30, marginTop:5}}
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


export const CreateEvent = connect(mapStateToProps, mapDispatchToProps)(_CreateEvent);