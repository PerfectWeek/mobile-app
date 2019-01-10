import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Button, Form, Icon, Input, Item, Text, Title, Container} from "native-base";

import {ScreenBackgroundColor} from "../../../Style/Constant";
import {GetAllUsersEvents} from "../../redux/Calendar/calendar.actions";

export class _CreateEvent extends React.Component {
    static navigationOptions = {
        title: 'Create event'
    };


    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            description: '',
            searchBar: '',
            usersToAdd: []
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: ScreenBackgroundColor}}>

            </Container>
        )
    }
}

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

export const CreateEvent = connect(mapStateToProps, mapDispatchToProps)(_CreateEvent);