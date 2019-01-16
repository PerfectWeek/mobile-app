import React, {Component} from 'react';
import {View, StyleSheet, Text, Alert, TouchableHighlight, ScrollView} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Agenda} from 'react-native-calendars';
import {Body, Button, Container, Header, Icon, Right, Title, Fab} from "native-base";
import {
    GetAllUsersEvents,
    CalendarActionType,
    DeleteEvent,
    GetUsersEventsFiltered, GetEvents, GetCalendars, ResetStatus
} from "../../redux/Calendar/calendar.actions";
import Loader from "../../Components/Loader";
import {HeaderBackgroundColor} from "../../../Style/Constant";
import Swipeout from 'react-native-swipeout';
import {CalendarFilter} from "./CalendarFilter";

export class _CalendarDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            scrolledDay: this.currentDate()
        };
        this.props.GetCalendars(this.props.login);
    }

    static navigationOptions = {
        header: null
    };

    loadItems(day) {
        if (day === undefined)
            return;
        console.log("LoadItems");
        this.state.scrolledDay = day;
        this.state.items = {};
            for (let i = -150; i < 185; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const date = new Date(time);
                const strTime = date.toISOString().split('T')[0];
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                }
            }
        // console.log(Object.keys(this.state.items).length);
        this.reloadEvents();
        console.log("finis");
        this.setState({...this.state, items: this.state.items});
    }

    reloadEvents() {
        const events = this.props.calendar.events;
        if (!events)
            return;
        for (let k = 0; k < events.length; ++k) {
            const event = events[k];
            let strTimeStart = new Date(event.start_time);
            const strTimee = new Date(event.end_time);
            // const calcol = this.getRandomColor();
            while (strTimeStart.getTime() <= strTimee.getTime()) {
                let isoDate = this.timeToString(strTimeStart);
                // if (!this.state.items[isoDate]) {
                this.state.items[isoDate] = [];
                // }
                this.state.items[isoDate].push({
                    id: event.id,
                    name: event.name
                    // color: calcol
                });
                strTimeStart.setDate(strTimeStart.getDate() + 1);
            }
        }
    }

    removeEvent(event) {
        Alert.alert(
            'Confimation',
            'Delete ' + event.name + ' ?',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Delete', onPress: () => this.props.DeleteEvent(event.id)},
            ],
            {cancelable: true}
        )
    }

    renderItem(item) {
        const swipeoutBtns = [
            {
                text: 'Delete',
                color: 'white',
                backgroundColor: 'red',
                onPress: () => {
                    this.removeEvent(item)
                }
            },
            {
                text: 'Modify',
                color: 'white',
                backgroundColor: 'green',
                onPress: () => {
                    this.props.navigation.navigate('ModifyEvent', {eventId: item.id});
                }
            }
        ];
        return (
            <View style={[styles.item,
                // {backgroundColor: item.color}
            ]}>

                <Swipeout autoClose={true} right={swipeoutBtns} style={{backgroundColor: '#d6d6d6', borderRadius: 5}}>
                    <TouchableHighlight
                        onPress={() => this.props.navigation.navigate('ConsultEvent', {eventId: item.id})}
                        underlayColor="rgba(52, 52, 52, 0.5)">
                        <View style={{height: 50}}>
                            <Text style={{fontSize: 15, paddingTop: 15, marginLeft: 15}}>{item.name}</Text>
                        </View>
                    </TouchableHighlight>
                </Swipeout>
            </View>
        )
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

    refreshCalendar() {
        this.props.GetEvents(this.props.calendar.calendars);
    }

    componentDidUpdate() {
        console.log("WillUpdate");
        console.log(this.props.calendar.status);
        if (this.props.calendar.status === CalendarActionType.GetCalendarsSuccess) {
            this.props.GetEvents(this.props.calendar.calendars);
            console.log("getting events");
        }
        if (this.props.calendar.status === CalendarActionType.GetEventsSuccess) {
            this.loadItems(this.state.scrolledDay);
            this.props.ResetStatus();
        }
        if (this.props.calendar.status === CalendarActionType.RefreshCalendar)
            this.props.GetEvents(this.props.calendar.calendars);
    }

    render() {
        console.log("render");
        // console.log(this.props.calendar.status);
        // if (this.props.calendar.events)
        //     console.log(this.props.calendar.events);
        // else
        //     console.log("loadingCalendars");
        if (this.props.calendar.status === CalendarActionType.GetCalendars
        // || this.props.calendar.status === CalendarActionType.GetEvents
        )
            return (
                <Container style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Loader/>
                </Container>
            );
        return (
            <Container>
                <Container>
                    <Header androidStatusBarColor="#00AE93" style={{backgroundColor: HeaderBackgroundColor}}>
                        <Body>
                        <Title style={{color: 'black'}}>Calendar</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => {
                                this.calendarFilter.openModal();
                            }}>
                                <Icon style={{fontSize: 28, fontWeight: 'bold', color: '#064C96'}}
                                      type={"FontAwesome"} name='filter'/>
                            </Button>
                        </Right>
                    </Header>
                    <CalendarFilter onRef={ref => (this.calendarFilter = ref)}/>

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
                        pastScrollRange={50}
                        futureScrollRange={50}
                        onRefresh={() => {
                            this.refreshCalendar();
                        }}
                        // Set this true while waiting for new data from a refresh
                    />
                </Container>
                <Fab
                    containerStyle={{}}
                    style={{backgroundColor: '#5067FF'}}
                    position="bottomRight"
                    onPress={() => {
                        // this.loadItems(this.state.scrolledDay);
                        // this.setState({...this.state, items:{}});
                        this.props.navigation.navigate({routeName: 'CreateEvent'});
                    }}>
                    <Icon name="add"/>
                </Fab>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        // padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 17
    }
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetCalendars: (pseudo) => dispatch(GetCalendars(pseudo)),
        GetEvents: (calendars) => dispatch(GetEvents(calendars)),
        DeleteEvent: (event) => dispatch(DeleteEvent(event)),
        ResetStatus: () => dispatch(ResetStatus())
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
