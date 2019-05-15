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
import {GetEventRecommendation} from "../../redux/Events/events.actions";

export class _EventsList extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.props.GetEventRecommendation("2019-05-10T12:12:12", "2019-06-10T12:12:12", 10);

    }


    render() {
        if (this.props.loading !== false)
            return (
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Loader/>
                </View>
            );
        return (
            <ScrollView style={{
                backgroundColor: ScreenBackgroundColor
            }}
                        contentContainerStyle={{
                            flexGrow: 1,
                            // justifyContent: 'space-between',
                            paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,

                        }}>
                <Header androidStatusBarColor="#00AE93" style={{backgroundColor: HeaderBackgroundColor}}>
                    <Body>
                    <Title style={{color: 'black'}}>Events</Title>
                    </Body>
                </Header>
                {
                    this.props.events.map((event, index) => {
                        return <EventCard event={event} key={index}/>
                    })
                }

            </ScrollView>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetEventRecommendation: (min_time, max_time, limit) => dispatch(GetEventRecommendation(min_time, max_time, limit)),
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        loading: state.events.loading,
        events: state.events.events

    }
};

export const EventsList = connect(mapStateToProps, mapDispatchToProps)(_EventsList);
