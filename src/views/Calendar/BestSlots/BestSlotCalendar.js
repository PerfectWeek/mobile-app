import React, {Component} from 'react';
import {View, Button, TouchableHighlight, Text, Platform} from 'react-native'
import connect from "react-redux/es/connect/connect";
import {Agenda} from 'react-native-calendars';
import {DeleteEvent, LoadCalendar, ReloadEvents, ResetStatus} from "../../../redux/Calendar/calendar.actions";
import {dateDiffInDays, getRandomColor, timeToString} from "../../../Utils/utils";
import Swipeout from "../CalendarDashboard";
import {Container, Thumbnail} from "native-base";
import * as Animatable from 'react-native-animatable';


class _BestSlotCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            scrolledDay: this.currentDate()
        };
    }
    static navigationOptions = {
        header: null
    };

    currentDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        return today
    }
    rowHasChanged(r1, r2) {
        return JSON.stringify(r1) !== JSON.stringify(r2);
    }

    loadItems(day) {
        if (day === undefined)
            return;
        this.state.scrolledDay = day;

        // this.reloadEvents();
        this.setState({...this.state});
    }

    renderItem(item) {
        const start = new Date(item.start_time);
        const start_string = ("0" + start.getUTCHours()).slice(-2) + ":" + ("0" + start.getUTCMinutes()).slice(-2);
        const end = new Date(item.end_time);
        const end_string = ("0" + end.getUTCHours()).slice(-2) + ":" + ("0" + end.getUTCMinutes()).slice(-2);
        return (
            <View
                      style={{
                          backgroundColor: 'white', marginTop: 15, marginRight: 15, borderWidth: 2,
                          borderColor: 'grey',
                          borderRadius: 5
                      }}>
                <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('ConsultEvent', {eventId: item.id})}
                    underlayColor="rgba(52, 52, 52, 0.5)">

                    <View style={{
                        margin: 15,
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        {item.image === undefined || item.image === null ? null :
                            <Animatable.View animation="fadeIn">
                                <Thumbnail source={{uri: item.image}}/>
                            </Animatable.View>
                        }

                        <View>
                            <Text style={{fontSize: 18, fontFamily: 'Lato_Bold'}}>{item.name}</Text>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: 'Lato_Medium'
                            }}>
                                {start_string} - {end_string}
                            </Text>
                        </View>
                        <Text style={{
                            alignSelf: 'flex-start',
                            fontSize: 18,
                            fontFamily: 'Lato_Medium'
                        }}>{item.calendar_name}</Text>
                    </View>

                </TouchableHighlight>
            </View>
        )
    }

    // renderItem(item) {
    //     const start = new Date(item.start_time);
    //     const start_string = ("0" + start.getUTCHours()).slice(-2) + ":" + ("0" + start.getUTCMinutes()).slice(-2);
    //     const end = new Date(item.end_time);
    //     const end_string = ("0" + end.getUTCHours()).slice(-2) + ":" + ("0" + end.getUTCMinutes()).slice(-2);
    //     return (
    //         <View
    //             style={{
    //                 backgroundColor: 'white', marginTop: 15, marginRight: 15, borderWidth: 2,
    //                 borderColor: item.color,
    //                 borderRadius: 5
    //             }}>
    //             <TouchableHighlight
    //                 onPress={() => this.props.navigation.navigate('ConsultEvent', {eventId: item.id})}
    //                 underlayColor="rgba(52, 52, 52, 0.5)">
    //
    //                 <View style={{
    //                     margin: 15,
    //                     flex: 1,
    //                     flexDirection: 'row',
    //                     justifyContent: 'space-between',
    //                     alignItems: 'center'
    //                 }}>
    //                     {item.image === undefined || item.image === null ? null :
    //                         <Animatable.View animation="fadeIn">
    //                             <Thumbnail source={{uri: item.image}}/>
    //                         </Animatable.View>
    //                     }
    //
    //                     <View>
    //                         <Text style={{fontSize: 18, fontFamily: 'Lato_Bold'}}>{item.name}</Text>
    //                         <Text style={{
    //                             fontSize: 14,
    //                             fontFamily: 'Lato_Medium'
    //                         }}>
    //                             {start_string} - {end_string}
    //                         </Text>
    //                     </View>
    //                     <Text style={{
    //                         alignSelf: 'flex-start',
    //                         fontSize: 18,
    //                         fontFamily: 'Lato_Medium'
    //                     }}>{item.calendar_name}</Text>
    //                 </View>
    //
    //             </TouchableHighlight>
    //         </View>
    //     )
    // }

    render(){
        // console.log(this.props.items)
        return (
            <Container style={{
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }}>
                <Agenda
                    items={this.props.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={this.currentDate()}
                    renderItem={this.renderItem.bind(this)}
                    // renderEmptyDate={this.renderEmptyDate.bind(this)}
                    renderEmptyDate={() => {
                        return (<View style={{backgroundColor: 'red'}}/>);
                    }}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    pastScrollRange={50}
                    futureScrollRange={50}
                    onRefresh={() => {
                        // this.refreshCalendar();
                    }}
                />
                {/*<Button onPress={() => this.props.navigation.navigate('BestSlotEventCreation', {eventId: 'sd'})} title="sad"/>*/}
            </Container>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    let events = [];
    if (state.calendar.events) {
        events = Object.values(state.calendar.events).map(e => {
            return {...e, calendar_name: state.calendar.calendars.find(c => c.id === e.calendar_id).name}
        });
    }
    let items = {};
    for (let i = -150; i < 185; i++) {
        const time = new Date().getTime() + i * 24 * 60 * 60 * 1000;
        const date = new Date(time);
        const strTime = date.toISOString().split('T')[0];
        if (!items[strTime]) {
            items[strTime] = [];
        }
    }

    for (let k = 0; k < events.length; ++k) {
        const event = events[k];
        let strTimeStart = new Date(event.start_time);
        const strTimee = new Date(event.end_time);
        const color = getRandomColor();


        let diffInDays = Math.abs(dateDiffInDays(new Date(event.end_time), new Date(event.start_time)));
        for (let i = diffInDays; i >= 0; --i) {
            let isoDate = timeToString(strTimeStart);
            if (items[isoDate] === undefined)
                items[isoDate] = [];
            let start = new Date(event.start_time);
            let end = new Date(event.end_time);

            if (i > 0) {
                end.setUTCHours(0);
                end.setUTCMinutes(0);
            }
            if (diffInDays > 0 && i < diffInDays) {
                start.setUTCHours(0);
                start.setUTCMinutes(0);
            }

            // if (strTimeStart > start && dateDiffInDays(end, strTimeStart) !== 0) {
            //     end.setUTCHours(0);
            //     end.setUTCMinutes(0);
            // }
            // if (strTimeStart > start) {
            //     start.setUTCHours(0);
            //     start.setUTCMinutes(0);
            // }

            // if (strTimeStart <= start && dateDiffInDays(end, start) !== 0) {
            //     end.setUTCHours(0);
            //     end.setUTCMinutes(0);
            // }
            // if (strTimeStart > start && dateDiffInDays(end, strTimeStart) !== 0) {
            //     end.setUTCHours(0);
            //     end.setUTCMinutes(0);
            // }
            // if (strTimeStart > start) {
            //     start.setUTCHours(0);
            //     start.setUTCMinutes(0);
            // }
            items[isoDate].push({
                id: event.id,
                name: event.name,
                calendar_name: event.calendar_name,
                start_time: new Date(start),
                end_time: end,
                color: color,
                image: event.image
            });
            items[isoDate] = items[isoDate].sort((a, b) => {
                return a.start_time > b.start_time;
            });
            strTimeStart.setDate(strTimeStart.getDate() + 1);
        }
    }
    return {
        ...ownProps,
        calendar: state.calendar,
        login: state.login,
        items
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        ReloadEvents: (calendars) => dispatch(ReloadEvents(calendars)),
        LoadCalendar: (pseudo) => dispatch(LoadCalendar(pseudo)),
        DeleteEvent: (event) => dispatch(DeleteEvent(event)),
        ResetStatus: () => dispatch(ResetStatus())
    }
};

export const BestSlotCalendar = connect(mapStateToProps, mapDispatchToProps)(_BestSlotCalendar);
