import React, {Component} from 'react';
import {View} from 'react-native';
import {Container, Text, Button, Icon, Input, Item, Picker, Form} from "native-base";
import DatePicker from "react-native-datepicker";
import moment from "moment";

class _PreferencesForBestSlots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EventTitle: 'ww',
            description: 'w',
            localisation: 'w',
            dateBeginEvent: '2019-04-27',
            dateEndEvent: '2019-05-06',
            beginTime: new Date().toLocaleTimeString('en-US', {hour12: false, hour: "numeric", minute: "numeric"}),
            endTime: '22:33',
            calendarId: this.props.navigation.getParam('calendarId'),
            timeEvent: 30,
            typeEvent:'party'
        }
    }

    static navigationOptions = {
        header: null
    };

    validator() {
        return (this.state.EventTitle === '' || this.state.description === ''
            || this.state.localisation === ''
            || this.state.dateBeginEvent === '' || this.state.timeEvent === 0
            || this.state.dateEndEvent === '' || this.state.beginTime === ''
            || this.state.endTime === '' || this.state.calendarId === -1
            || this.state.dateBeginEvent === this.state.dateEndEvent && moment(this.state.endTime, "HH:mm") < moment(this.state.beginTime, "HH:mm")
            || this.state.typeEvent === ''
        )
    }

    render() {
        const eventsDefinedTypes = ['party', 'work', 'workout', 'hobby'];
        return (
            <Container>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
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
                        <Icon type='SimpleLineIcons' active name='pencil'/>
                        <Input style={{color: 'black', fontFamily: 'Roboto_medium', fontSize: 16}}
                               placeholder="Description" value={this.state.description}
                               onChangeText={(text) => this.setState({description: text})}/>
                    </Item>
                    <Item>
                        <Icon type='SimpleLineIcons' active name='location-pin'/>
                        <Input style={{color: 'black', fontFamily: 'Roboto_medium', fontSize: 16}}
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
                    <Item>
                        <Icon type='SimpleLineIcons' active name='pencil'/>
                        <Input style={{color: 'black', fontFamily: 'Roboto_medium', fontSize: 16}}
                               placeholder="Event duration" value={this.state.timeEvent}
                               maxLength={4}
                               keyboardType='numeric'
                               onChangeText={(text) => this.setState({timeEvent: parseInt(text)})}/>
                    </Item>
                <Item>
                    <Icon type='SimpleLineIcons' active name='event'/>
                    <Picker
                        placeholder="Type of event"
                        placeholderStyle={{color: "#9EA0A4"}}
                        note
                        selectedValue={this.state.typeEvent}
                        mode="dropdown"
                        style={{width: 120}}
                        onValueChange={(value) => {
                            this.setState({typeEvent: value});
                        }}>
                        <Picker.Item label={"Type of event"} value={-1} key={-1}/>
                        {
                            eventsDefinedTypes.map((c, idx) => {
                                return <Picker.Item label={c} value={c} key={idx}/>
                            })
                        }
                    </Picker>
                </Item>
                <Button success disabled={this.validator()}
                        rounded style={{margin: 30, marginTop: 10}}
                        onPress={() => {
                            this.props.navigation.navigate('MasterSlot', {dataSlot: this.state})
                        }}>
                    <Text>
                        Get slots
                    </Text>
                </Button>
                    </Form>
                </View>
            </Container>
        )
    }

}

export const PreferencesForBestSlots = _PreferencesForBestSlots;