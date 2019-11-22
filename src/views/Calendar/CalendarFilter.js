import React, {Component} from 'react';
import {Icon, Item, Input, CheckBox, Form, ListItem, Button, Content, Text, View, Body} from 'native-base';
import connect from "react-redux/es/connect/connect";
import Modal from "../../Components/Modal";
import Loader from "../../Components/Loader";
import {Dimensions, ScrollView} from "react-native";
import {
    GetAllUsersEvents,
    GetUsersEventsFiltered,
    RefreshCalendar, ReloadEvents,
    SetFilters
} from "../../redux/Calendar/calendar.actions";

import i18n from 'i18n-js';

class _CalendarFilter extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    render() {
        // console.log("this.props.calendar : ", this.props.calendar.calendars);
        
        if (this.props.calendar.calendars) {
            var filters = this.props.calendar.calendars.map(f => f);
        }
        else
            var filters = [];
        return (
            <Modal
                onRef={ref => (this.modal = ref)} title={i18n.t('dashboard.filter')}
                actionButtonTitle={i18n.t('dashboard.filterButton')}
                validateCallback={() => {
                    // console.log('ti')
                    // console.log(this.state.filters)
                    this.props.SetFilters(this.state.filters);
                    this.props.RefreshCalendar(this.props.calendar.calendars);
                    this.modal.toggle();
                }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <Content>
                        <ScrollView style={{height: Dimensions.get('window').height / 3}}>
                            {
                                filters ? filters.map((f, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <CheckBox onPress={() => {
                                                f.show = !f.show;
                                                this.setState({filters: filters});
                                            }} checked={f.show}/>
                                            <Body>
                                            <Text>{f.name}</Text>
                                            </Body>
                                        </ListItem>
                                    )
                                }) : <Loader/>
                            }
                        </ScrollView>
                    </Content>
                </View>
            </Modal>
        )
    }

    openModal() {
        this.modal.toggle();
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        SetFilters: (calendars) => dispatch(SetFilters(calendars)),
        RefreshCalendar: (calendars) => dispatch(ReloadEvents(calendars)),


    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        calendar: state.calendar,
    }
};

export const CalendarFilter = connect(mapStateToProps, mapDispatchToProps)(_CalendarFilter);
