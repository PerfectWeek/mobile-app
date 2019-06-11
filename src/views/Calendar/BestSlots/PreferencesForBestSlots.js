import React, {Component} from 'react';
import {View} from 'react-native';
import {Container, Text, Button, Icon, Input, Item, Picker, Form, Toast} from "native-base";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import {IconColor} from "../../../../Style/Constant";


class _PreferencesForBestSlots extends Component {
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
            calendarId: this.props.navigation.getParam('calendarId'),
            timeEvent: '',
            type:'',
            visibility: 'public',
        }
        //console.log(this.props.navigation.getParam('calendarId'), this.props)
    }

    static navigationOptions = {
        header: null
    };

    validator() {
        // console.log(this.state)
        return (this.state.EventTitle === '' || this.state.description === ''
            || this.state.localisation === ''
            || this.state.dateBeginEvent === '' || this.state.timeEvent === '' || this.state.timeEvent === '0'
            || this.state.dateEndEvent === '' || this.state.beginTime === ''
            || this.state.endTime === '' || this.state.calendarId === -1
            || this.state.dateBeginEvent === this.state.dateEndEvent && moment(this.state.endTime, "HH:mm") < moment(this.state.beginTime, "HH:mm")
            || this.state.type === ''
        )
    }

    checkDateInPast(date) {
        const d1 = new Date(date);
        const d2 = new Date();
        d2.setHours(0);
        d2.setMinutes(0);
        if (d1.getTime() < d2.getTime()) {
            Toast.show({
                text: 'You can\'t create events in the past',
                type: "danger",
                buttonText: "Okay",
                duration: 2000
            });
            return false;
        }
        return true;
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
                                if (this.checkDateInPast(date))
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
                                if (this.checkDateInPast(date))
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
                        <Icon style={IconStyle} type='SimpleLineIcons' active name='hourglass'/>
                        <Input style={{color: 'black', fontFamily: 'Roboto_medium', fontSize: 16}}
                               placeholder="Event duration minutes" value={this.state.timeEvent}
                               maxLength={4}
                               keyboardType='numeric'
                               onChangeText={(text) => this.setState({timeEvent: text})}/>
                    </Item>
                <Item>
                    <Icon style={IconStyle} type='SimpleLineIcons' active name='flag'/>
                    <Picker
                        placeholder="Type of event"
                        placeholderStyle={{color: "#9EA0A4"}}
                        note
                        selectedValue={this.state.type}
                        mode="dropdown"
                        style={{width: 120}}
                        onValueChange={(value) => {
                            this.setState({type: value});
                        }}>
                        <Picker.Item label={"Type of event"} value={-1} key={-1}/>
                        {
                            eventsDefinedTypes.map((c, idx) => {
                                return <Picker.Item label={c} value={c} key={idx}/>
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
                        selectedValue={this.state.visibility}
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

const IconStyle = {color: IconColor};


export const PreferencesForBestSlots = _PreferencesForBestSlots;