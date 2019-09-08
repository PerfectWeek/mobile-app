import React from 'react';
import { Dimensions, Platform, View, ScrollView, RefreshControl } from 'react-native';
import {
    Header,
    Body,
    Title,
    Text, Button, Right, Icon
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import { HeaderBackgroundColor, ScreenBackgroundColor } from "../../../Style/Constant";
import Loader from "../../Components/Loader";
import EventCard from "../../Components/EventCard";
import { GetEventRecommendation } from "../../redux/Events/events.actions";
import { PageHit } from "expo-analytics";


export class _EventsList extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.props.login.analytics.hit(new PageHit('EventsPage'));
        var b = new Date();
        b.setDate(b.getDate());
        let beg = b.toISOString().split('.')[0]
        var e = new Date();
        e.setDate(e.getDate() + 20);
        let end = e.toISOString().split('.')[0]
        this.props.GetEventRecommendation(beg, end, 10);

    }

    _onRefresh = () => {
        var b = new Date();
        b.setDate(b.getDate());
        let beg = b.toISOString().split('.')[0]
        var e = new Date();
        e.setDate(e.getDate() + 20);
        let end = e.toISOString().split('.')[0]
        // this.props.GetEventRecommendation("2019-05-10T12:12:12", "2019-06-10T12:12:12", 10);
        // console.log(beg, end);

        this.props.GetEventRecommendation(beg, end, 10);
    };

    render() {
        if (this.props.events === undefined || this.props.loading !== false)
            return (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Loader />
                </View>
            );
        return (
            <View style={{
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
                backgroundColor: ScreenBackgroundColor
            }}>
                <Header androidStatusBarColor="#00AE93" style={{ backgroundColor: HeaderBackgroundColor }}>
                    <Body>
                        <Title style={{ color: 'black' }}>Public events</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate({ routeName: 'Map' });
                        }}>
                            <Icon style={{ fontSize: 28, fontWeight: 'bold', color: '#064C96' }} type={"MaterialIcons"} name='location-on' />
                        </Button>
                    </Right>
                </Header>
                <ScrollView style={{ backgroundColor: 'white'}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.loading}
                            onRefresh={this._onRefresh}
                        />}
                    contentContainerStyle={{
                        flexGrow: 1
                    }}>
                    {
                        Object.values(this.props.events).length === 0 ?
                            <View>
                                <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 22 }}>
                                    You have no suggestion at the moment
                            </Text>
                            </View>
                            :
                            Object.values(this.props.events).map((event, index) => {
                                return <EventCard navigation={this.props.navigation} event={this.props.events[event.id]}
                                    key={event.id} />
                            })
                    }
                    <View style={{height:Expo.Constants.statusBarHeight + 50, backgroundColor: '#eae9ef'}}></View>
                </ScrollView>
            </View>

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
        events: state.events.events,
        login: state.login

    }
};

export const EventsList = connect(mapStateToProps, mapDispatchToProps)(_EventsList);
