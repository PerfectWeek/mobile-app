import React, {Component} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Agenda} from 'react-native-calendars';
import {Body, Button, Container, Header, Icon, Right, Title} from "native-base";
import {GetAllUsersEvents, CalendarActionType, DeleteEvent} from "../../redux/Calendar/calendar.actions";
import Loader from "../../Components/Loader";
import {HeaderBackgroundColor} from "../../../Style/Constant";
import Swipeout from 'react-native-swipeout';


export class _CalendarDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ref: false,
            items: {},
            filled: false,
            new: false
        };
        this.props.GetAllUsersEvents(this.props.login);
    }

    static navigationOptions = {
        header: null
    };

    loadItems(day) {
        if (this.state.new === true) {
            this.setState({items: {}, new: false, filled: false})
        }
        if (this.props.calendar.status !== CalendarActionType.GetAllUsersEventsSuccess)
            return;
        const listCalendars = this.props.calendar.calendars;
        // console.log(listCalendars)
        for (let i = -150; i < 185; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const date = new Date(time);
            const strTime = date.toISOString().split('T')[0];
            if (!this.state.items[strTime]) {
                this.state.items[strTime] = [];
            }
        }
        if (this.state.filled === true)
            return;
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
                        id: event.id,
                        name: event.name,
                        color: calcol
                    });
                    strTimeStart.setDate(strTimeStart.getDate() + 1);
                }
            }
        }
        this.setState({filled: true});

        // console.log(this.state.items);
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

    removeEvent(event) {
        console.log('event: ', event)
        Alert.alert(
            'Confimation',
            'Delete ' + event.name + ' ?',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Delete', onPress: () => this.props.DeleteEvent(event.id)},
            ],
            { cancelable: true }
        )
    }

    renderItem(item) {
        const swipeoutBtns = [
            {
                text: 'Delete',
                color: 'white',
                backgroundColor: 'red',
                onPress : () => {this.removeEvent(item)}
            },
            {
                text: 'Modify',
                color: 'white',
                backgroundColor: 'green',
                onPress : () => { this.props.navigation.navigate('ModifyEvent', {eventId:item.id});}
            }
        ];
        return (
            <View style={[styles.item, {backgroundColor: item.color,}]}>
                <Swipeout autoClose={true} right={swipeoutBtns} style={{backgroundColor: item.color, borderRadius: 5}}>
                    <View style={{height: 50}}>
                        <Text>{item.name}</Text>
                    </View>
                </Swipeout>
            </View>
    )
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


        if (this.props.calendar.status === CalendarActionType.RefreshCalendar) {
            this.setState({new: true});
            this.props.GetAllUsersEvents(this.props.login);
        }
        if (this.props.calendar && (this.props.calendar.status === CalendarActionType.GetAllUsersEvents
            || this.props.calendar.status === CalendarActionType.CreateNewEventSuccess)
        )
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
            <Container
            >
                <Header androidStatusBarColor="#00AE93" style={{backgroundColor: HeaderBackgroundColor}}>
                    <Body>
                    <Title style={{color: 'black'}}>Calendar</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            // this.props.GetAllUsersEvents(this.props.login);
                            this.props.navigation.navigate({routeName: 'CreateEvent'});
                        }}>
                            <Icon style={{fontSize: 28, fontWeight: 'bold', color: '#064C96'}} type={"MaterialIcons"} name='add'/>
                        </Button>
                    </Right>
                </Header>
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
                    minDate={'2019-01-01'}
                    pastScrollRange={10}
                    onRefresh={() => {
                        // console.log('refreshing...');
                    this.setState({new: true});
                    this.props.GetAllUsersEvents(this.props.login);
                    // this.setState({ref: false})
                    }}
                    // Set this true while waiting for new data from a refresh
                    refreshing={this.state.ref}
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
        // padding: 10,
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
        GetAllUsersEvents: (pseudo) => dispatch(GetAllUsersEvents(pseudo)),
        DeleteEvent: (event) => dispatch(DeleteEvent(event))
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
