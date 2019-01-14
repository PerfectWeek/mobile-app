import React, {Component} from 'react';
import {Icon, Item, Input, CheckBox, Form, ListItem, Button, Content, Text, View, Body} from 'native-base';
import connect from "react-redux/es/connect/connect";
import Modal from "../../Components/Modal";
import Loader from "../../Components/Loader";
import {Dimensions, ScrollView} from "react-native";
import {GetAllUsersEvents, GetUsersEventsFiltered} from "../../redux/Calendar/calendar.actions";

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
        if (this.props.calendar.calendarFilters) {
            var filters = this.props.calendar.calendarFilters.map(f => f);
        }
        else
            var filters = [];
        return (
            <Modal
                // canValidate={(this.state.usersToAdd.length > 0 && this.props.groups.status !== GroupsActionType.AddGroupMembers)}
                // canClose={(this.props.groups.status !== GroupsActionType.AddGroupMembers)}
                onRef={ref => (this.modal = ref)} title='Filter'
                actionButtonTitle='Filter'
                validateCallback={() => {
                    this.props.GetUsersEventsFiltered(this.state.filters);
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
        GetUsersEventsFiltered: (filters) => dispatch(GetUsersEventsFiltered(filters)),
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        calendar: state.calendar,
    }
};

export const CalendarFilter = connect(mapStateToProps, mapDispatchToProps)(_CalendarFilter);
