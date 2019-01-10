import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Button, Form, Icon, Input, Item, Text, Title, Container} from "native-base";
import DatePicker from 'react-native-datepicker'


import {ScreenBackgroundColor} from "../../../Style/Constant";
import {GetAllUsersEvents} from "../../redux/Calendar/calendar.actions";

export class _CreateEvent extends React.Component {
    static navigationOptions = {
        title: 'Create event'
    };


    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            description: '',
            searchBar: '',
            dateBeginEvent : '',
            dateEndEvent : '',
            beginTime : '',
            endTime : ''
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: ScreenBackgroundColor}}>
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
                                    alignItems: 'center', borderLeftColor: 'white'}}
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
                    </Form>
                </View>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetAllUsersEvents: (pseudo) => dispatch(GetAllUsersEvents(pseudo))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        calendar: state.calendar,
        login: state.login
    }
};

export const CreateEvent = connect(mapStateToProps, mapDispatchToProps)(_CreateEvent);