import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Agenda} from 'react-native-calendars';
import {Container} from "native-base";
import {GetAllUsersEvents, CalendarActionType} from "../redux/Calendar/calendar.actions";
import Loader from "../Components/Loader";

// import {} from "../redux/User/user.actions";
// import {} from "../redux/Login/login.actions";

export class _CalendarDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            filled: false
        };
        this.props.GetAllUsersEvents(this.props.login);
    }

    loadItems(day) {
        if (this.props.calendar.status !== CalendarActionType.GetAllUsersEventsSuccess)
            return;

        const listCalendars = this.props.calendar.calendars;

        // setTimeout(() => {
        for (let i = -150; i < 185; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            // const strTime = this.timeToString(time);
            const date = new Date(time);
            const strTime = date.toISOString().split('T')[0];
            // console.log(time, strTime)
            if (!this.state.items[strTime]) {
                this.state.items[strTime] = [];
                // const numItems = Math.floor(Math.random() * 5);
                // for (let j = 0; j < numItems; j++) {
                //     this.state.items[strTime].push({
                //         name: 'Item for ' + strTime,
                //         height: Math.max(50, Math.floor(Math.random() * 150))
                //     });
                // }
            }
        }
        // console.log(listCalendars)
        //     let items = {}
        if (this.state.filled === true)
            return;
        this.setState({filled: true});
        for (let i = 0; i < listCalendars.length; ++i) {
            const events = listCalendars[i].events;
            for (let k = 0; k < events.length; ++k) {
                const event = events[k];
                let strTimeStart = new Date(event.start_time);
                const strTimee = new Date(event.end_time);
                const calcol = this.getRandomColor();
                while (strTimeStart.getTime() <= strTimee.getTime()) {
                    let isoDate = this.timeToString(strTimeStart);
                    if (!this.state.items[isoDate]) {
                        this.state.items[isoDate] = [];
                    }
                    this.state.items[isoDate].push({
                        name: event.name,
                        height: 5,
                        color: calcol
                    });
                    strTimeStart.setDate(strTimeStart.getDate() + 1);
                }
            }
        }

        console.log(this.state.items);
        // const newItems = {};
        // Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        // this.setState({
        //     items: newItems
        // });
        // }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    renderItem(item) {
        return (
            <View style={[styles.item, {
                height: item.height,
                backgroundColor: item.color
            }]}><Text>{item.name}</Text></View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        // const date = new Date(time);
        return time.toISOString().split('T')[0];
    }

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

    render() {
        // console.log(this.props.calendar)
        if (this.props.calendar && this.props.calendar.status !== CalendarActionType.GetAllUsersEventsSuccess)
            return (
                <Container style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Loader />
                </Container>
            );
        // const current = new Date();
        // console.log('cal', this.props.calendar)
        return (
            <Container
                style={{paddingTop: Expo.Constants.statusBarHeight}}
            >
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={this.currentDate()}
                    renderItem={this.renderItem.bind(this)}
                    // renderEmptyDate={this.renderEmptyDate.bind(this)}
                    renderEmptyDate={() => {
                        return (<View style={{backgroundColor: 'red'}}/>);
                    }}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    minDate={'2015-01-01'}
                    pastScrollRange={10}
                    // markingType={'period'}
                    // markedDates={{
                    //    '2017-05-08': {textColor: '#666'},
                    //    '2017-05-09': {textColor: '#666'},
                    //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                    //    '2017-05-21': {startingDay: true, color: 'blue'},
                    //    '2017-05-22': {endingDay: true, color: 'gray'},
                    //    '2017-05-24': {startingDay: true, color: 'gray'},
                    //    '2017-05-25': {color: 'gray'},
                    //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                    // monthFormat={'yyyy'}
                    // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                    //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                />
            </Container>
        )
    }

}


const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});

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

export const CalendarDashboard = connect(mapStateToProps, mapDispatchToProps)(_CalendarDashboard);
