import React from 'react';
import { Dimensions, View, StyleSheet, ScrollView, Platform } from 'react-native';

import connect from "react-redux/es/connect/connect";
import { Button, Form, Icon, Input, Picker, Item, Text, CheckBox, Container, Toast } from "native-base";
import axios from 'react-native-axios'


import { CalendarActionType, CreateNewEvent, RefreshCalendar } from "../../redux/Calendar/calendar.actions";
import DatePicker from "react-native-datepicker";
import Loader from "../../Components/Loader";
import moment from "moment";
import { IconColor, ScreenBackgroundColor } from "../../../Style/Constant";
import { validateNotEmpty } from "../../Utils/utils";
import { GroupsActionType } from "../../redux/Groups/groups.actions";

import { ListUsers } from "./tools/ListUsers";
import { Event, PageHit } from "expo-analytics";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';


export class _CreateEvent extends React.Component {
    static navigationOptions = {
        title: Localization.locale !== 'fr-FR' ? 'Create event' : "Créer l'événement"
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
            beginTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric" }),
            endTime: '',
            calendarId: -1,
            typeEvent: '',
            // searchBar: '',
            usersToAdd: []
        }
        this.props.login.analytics.hit(new PageHit('CreateEvents'));


    }
    async componentDidMount() {
        if (this.props.navigation.state.params.coordinate !== undefined) {
            let lat = this.props.navigation.state.params.coordinate.latitude;
            let lon = this.props.navigation.state.params.coordinate.longitude;
            let geocofing_token = '58bd57c6a82333'
            try {

                var res = await axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=${geocofing_token}&lat=${lat}&lon=${lon}&format=json`)

                console.log(res);

                this.setState({ localisation: res.data.display_name })

            } catch (error) {
                console.log("Une erreur");
                console.log(error);
            }
        }
        console.log("apreé");
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

    checkDateInPast(date) {
        const d1 = new Date(date);
        const d2 = new Date();
        d2.setHours(0);
        d2.setMinutes(0);
        if (d1.getTime() < d2.getTime()) {
            Toast.show({
                text: i18n.t('dashboard.createvent.error.past'),
                type: "danger",
                buttonText: "Okay",
                duration: 2000
            });
            return false;
        }
        return true;
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
                    <Loader />
                </Container>
            );

        return (
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', marginTop: 20
            }}>
                <ScrollView>
                    <Form style={{
                        marginLeft: 10, marginRight: 10, flexGrow: 3
                    }}>
                        <Item>
                            <Input style={{color: 'black', fontFamily: 'Roboto_medium', fontSize: 26}}
                                   placeholder={i18n.t('dashboard.createvent.nameevent')} value={this.state.EventTitle}
                                   onChangeText={(text) => this.setState({EventTitle: text})}/>
                        </Item>
                        <Item>
                            <Icon style={IconStyle} type='SimpleLineIcons' active name='pencil'/>
                            <Input style={{color: 'black', fontFamily: 'Roboto_medium', fontSize: 16}}
                                   placeholder={i18n.t('dashboard.createvent.description')} value={this.state.description}
                                   onChangeText={(text) => this.setState({description: text})}/>
                        </Item>
                        <Item>
                            <Icon style={IconStyle} type='SimpleLineIcons' active name='location-pin'/>
                            <Input style={{color: 'black', fontFamily: 'Roboto_medium', fontSize: 16}}
                                   placeholder={i18n.t('dashboard.createvent.localisation')} value={this.state.localisation}
                                   onChangeText={(text) => this.setState({localisation: text})}/>
                        </Item>

                        <Item>
                            <Icon style={{ ...IconStyle, alignSelf: 'flex-start', marginTop: 10 }}
                                type='SimpleLineIcons'
                                active
                                name='clock' />

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
                                        placeholder={this.state.dateBeginEvent === '' ? i18n.t('dashboard.eventinfo.begin') : this.state.dateBeginEvent}
                                        format="YYYY-MM-DD"
                                        minDate="2018-01-01"
                                        maxDate={this.state.dateEndEvent === '' ? "2022-01-01" : this.state.dateEndEvent}
                                        confirmBtnText={i18n.t('other.confirm')}
                                        cancelBtnText={i18n.t('other.cancel')}
                                        showIcon={false}
                                        onDateChange={(date) => {
                                            if (this.checkDateInPast(date))
                                                this.setState({ dateBeginEvent: date })
                                        }}
                                    />
                                    <DatePicker
                                        customStyles={{
                                            placeholderText: {
                                                color: 'black',
                                                fontFamily: 'Roboto_medium'
                                            }
                                        }}
                                        style={{ width: 80 }}
                                        date={this.state.beginTime}
                                        placeholder={i18n.t('dashboard.eventinfo.begin')}
                                        mode="time"
                                        format="HH:mm"
                                        confirmBtnText={i18n.t('other.confirm')}
                                        cancelBtnText={i18n.t('other.cancel')}
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
                                    alignItems: 'center'
                                }}>
                                    <DatePicker
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
                                        placeholder={this.state.dateEndEvent === '' ? i18n.t('dashboard.eventinfo.endtime') : this.state.dateEndEvent}
                                        format="YYYY-MM-DD"
                                        minDate={this.state.dateBeginEvent === '' ? "2018-01-01" : this.state.dateBeginEvent}
                                        maxDate="2022-01-01"
                                        confirmBtnText={i18n.t('other.confirm')}
                                        cancelBtnText={i18n.t('other.cancel')}
                                        showIcon={false}
                                        onDateChange={(date) => {
                                            if (this.checkDateInPast(date))
                                                this.setState({ dateEndEvent: date })
                                        }}
                                    />
                                    <DatePicker
                                        customStyles={{
                                            placeholderText: {
                                                color: 'black',
                                                fontFamily: 'Roboto_medium'
                                            }
                                        }}
                                        style={{ width: 80 }}
                                        date={this.state.endTime}
                                        placeholder={i18n.t('dashboard.eventinfo.endtime')}
                                        mode="time"
                                        format="HH:mm"
                                        confirmBtnText={i18n.t('other.confirm')}
                                        cancelBtnText={i18n.t('other.cancel')}
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
                                placeholder={i18n.t('dashboard.createvent.selectevent')}
                                placeholderStyle={{color: "#9EA0A4"}}
                                note
                                selectedValue={this.state.type}
                                mode="dropdown"
                                style={{ width: 120 }}
                                onValueChange={(value) => {
                                    this.setState({ type: value });
                                }}>
                                <Picker.Item label={i18n.t('dashboard.createvent.selectevent')} value={-1} key={-1}/>
                                {
                                    this.props.calendar.eventsType.map((type, index) => {
                                        return <Picker.Item label={type} value={index} key={index} />
                                    })
                                }
                            </Picker>
                        </Item>
                        <Item>
                            <Icon style={IconStyle} type='SimpleLineIcons' active name='calendar' />
                            <Picker
                                placeholder={i18n.t('dashboard.createvent.selectcalendar')}
                                placeholderStyle={{color: "#9EA0A4"}}
                                note
                                selectedValue={this.state.calendarId}
                                mode="dropdown"
                                style={{ width: 120 }}
                                onValueChange={(value) => {
                                    this.setState({ calendarId: value });
                                }}>
                                <Picker.Item label={i18n.t('dashboard.createvent.selectcalendar')} value={-1} key={-1}/>
                                {
                                    this.props.calendar.calendars.map(c => {
                                        return <Picker.Item label={c.name} value={c.id} key={c.id} />
                                    })
                                }
                            </Picker>
                        </Item>
                        <Item>
                            <Icon style={IconStyle} type='SimpleLineIcons' active name='lock' />
                            <Picker
                                placeholder={i18n.t('dashboard.createvent.selectvis')}
                                placeholderStyle={{color: "#9EA0A4"}}
                                note
                                // selectedValue={this.state.visibility}
                                mode="dropdown"
                                style={{ width: 120 }}
                                selectedValue={this.state.visibility}
                                onValueChange={(value) => {
                                    this.setState({ visibility: value });
                                }}>
                                <Picker.Item label={i18n.t('other.public')} value={'public'} key={0}/>
                                <Picker.Item label={i18n.t('other.private')} value={'private'} key={1}/>
                            </Picker>
                        </Item>

                        <ListUsers callAddUser={(userList) => {
                            this.setState({ usersToAdd: userList })
                        }} />
                        <Button success disabled={this.validator()}
                            rounded style={{ margin: 30, marginTop: 10 }}
                            onPress={() => {
                                // console.log(this.state)
                                this.props.login.analytics.event(new Event('Events', 'Creation'));
                                this.props.CreateNewEvent({
                                    ...this.state,
                                    type: this.props.calendar.eventsType[this.state.type]
                                })
                            }}>
                            <Text>
                                {i18n.t('dashboard.createvent.creat')}
                            </Text>
                        </Button>
                    </Form>
                </ScrollView>
            </View>
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

const IconStyle = { color: IconColor };

export const CreateEvent = connect(mapStateToProps, mapDispatchToProps)(_CreateEvent);