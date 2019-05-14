import React from 'react';
import {Dimensions, Platform, View, ScrollView} from 'react-native';
import {
    Header,
    Body,
    Title,
    Text
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {HeaderBackgroundColor, ScreenBackgroundColor} from "../../../Style/Constant";
import Loader from "../../Components/Loader";
import EventCard from "../../Components/EventCard";

export class _EventsList extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        // this.props.GetGroups(this.props.login.pseudo);

    }

    render() {
        let a = [1, 1, 1, 1, 1, 1, 1, 1, 1];
        return (
            <ScrollView style={{
                backgroundColor: '#cfced2'
            }}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'space-between',
                            paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,

                        }}>
                <Header androidStatusBarColor="#00AE93" style={{backgroundColor: HeaderBackgroundColor}}>
                    <Body>
                    <Title style={{color: 'black'}}>Events</Title>
                    </Body>
                </Header>
                {
                    a.map((a, index) => {
                        return <EventCard key={index}/>
                    })
                }

            </ScrollView>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        // GetGroups: (pseudo) => dispatch(GetGroups(pseudo)),
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        // login: state.login
    }
};

export const EventsList = connect(mapStateToProps, mapDispatchToProps)(_EventsList);
