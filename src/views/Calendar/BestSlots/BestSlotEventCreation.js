import React, {Component} from 'react';
import {Button, View} from 'react-native'
import connect from "react-redux/es/connect/connect";
import {Agenda} from 'react-native-calendars';
import {
    CreateNewEvent,
    RefreshCalendar,
    ResetStatus
} from "../../../redux/Calendar/calendar.actions";
// import {dateDiffInDays, getRandomColor, timeToString} from "../../../Utils/utils";

class _BestSlotEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    static navigationOptions = {
        header: null
    };


    render(){
        return (
            <View>
                <Button onPress={() => this.props.navigation.navigate('Master')} title="happy"/>

            </View>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    // let events = [];
    // if (state.calendar.events) {
    //     events = Object.values(state.calendar.events).map(e => {
    //         return {...e, calendar_name: state.calendar.calendars.find(c => c.id === e.calendar_id).name}
    //     });
    // }
    // let items = {};
    // for (let i = -150; i < 185; i++) {
    //     const time = new Date().getTime() + i * 24 * 60 * 60 * 1000;
    //     const date = new Date(time);
    //     const strTime = date.toISOString().split('T')[0];
    //     if (!items[strTime]) {
    //         items[strTime] = [];
    //     }
    // }
    //
    // for (let k = 0; k < events.length; ++k) {
    //     const event = events[k];
    //     let strTimeStart = new Date(event.start_time);
    //     const strTimee = new Date(event.end_time);
    //     const color = getRandomColor();
    //
    //
    //     let diffInDays = Math.abs(dateDiffInDays(new Date(event.end_time), new Date(event.start_time)));
    //     for (let i = diffInDays; i >= 0; --i) {
    //         let isoDate = timeToString(strTimeStart);
    //         if (items[isoDate] === undefined)
    //             items[isoDate] = [];
    //         let start = new Date(event.start_time);
    //         let end = new Date(event.end_time);
    //
    //         if (i > 0) {
    //             end.setUTCHours(0);
    //             end.setUTCMinutes(0);
    //         }
    //         if (diffInDays > 0 && i < diffInDays) {
    //             start.setUTCHours(0);
    //             start.setUTCMinutes(0);
    //         }
    //
    //         // if (strTimeStart > start && dateDiffInDays(end, strTimeStart) !== 0) {
    //         //     end.setUTCHours(0);
    //         //     end.setUTCMinutes(0);
    //         // }
    //         // if (strTimeStart > start) {
    //         //     start.setUTCHours(0);
    //         //     start.setUTCMinutes(0);
    //         // }
    //
    //         // if (strTimeStart <= start && dateDiffInDays(end, start) !== 0) {
    //         //     end.setUTCHours(0);
    //         //     end.setUTCMinutes(0);
    //         // }
    //         // if (strTimeStart > start && dateDiffInDays(end, strTimeStart) !== 0) {
    //         //     end.setUTCHours(0);
    //         //     end.setUTCMinutes(0);
    //         // }
    //         // if (strTimeStart > start) {
    //         //     start.setUTCHours(0);
    //         //     start.setUTCMinutes(0);
    //         // }
    //         items[isoDate].push({
    //             id: event.id,
    //             name: event.name,
    //             calendar_name: event.calendar_name,
    //             start_time: new Date(start),
    //             end_time: end,
    //             color: color,
    //             image: event.image
    //         });
    //         items[isoDate] = items[isoDate].sort((a, b) => {
    //             return a.start_time > b.start_time;
    //         });
    //         strTimeStart.setDate(strTimeStart.getDate() + 1);
    //     }
    // }
    return {
        ...ownProps,
        calendar: state.calendar,
        login: state.login,
        // items
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        // ReloadEvents: (calendars) => dispatch(ReloadEvents(calendars)),
        CreateNewEvent: (event) => dispatch(CreateNewEvent(event)),
        RefreshCalendar: () => dispatch(RefreshCalendar()),
        ResetStatus: () => dispatch(ResetStatus())
    }
};

export const BestSlotEventCreation = connect(mapStateToProps, mapDispatchToProps)(_BestSlotEvent);
