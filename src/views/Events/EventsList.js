import React from 'react';
import { Platform, View, ScrollView, RefreshControl } from 'react-native';
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

import i18n from 'i18n-js';


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

        this.props.GetEventRecommendation(beg, end, 10);
    };

    render() {
        let top_header = <Header androidStatusBarColor="#00AE93" style={{ backgroundColor: HeaderBackgroundColor }}>
            <Body>
                <Title style={{ color: 'black', fontSize:16 }}>{i18n.t('event.public_event')}</Title>
            </Body>
            <Right>
                <Button transparent onPress={() => {
                    this.props.navigation.navigate({ routeName: 'Map' });
                }}>
                    <Text uppercase={false} style={{ fontSize: 18, fontWeight: 'bold', color: '#064C96' }}>

                        {i18n.t('event.map_view')}
                 </Text>
                    <Icon style={{ fontSize: 28, fontWeight: 'bold', color: '#064C96' }} type={"MaterialIcons"} name='location-on' />
                </Button>
            </Right>
        </Header>

        if (this.props.events === undefined || this.props.loading !== false)
            return (
                <View style={{
                    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
                    backgroundColor: ScreenBackgroundColor,
                    flex: 1
                }}>
                    {top_header}
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Loader />
                    </View>
                </View>
            );
        return (
            <View style={{
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
                backgroundColor: ScreenBackgroundColor
            }}>
                {top_header}
                <ScrollView style={{ backgroundColor: 'white' }}
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
                                    {i18n.t('events.nosugrestions')}
                       </Text>
                            </View>
                            :
                            Object.values(this.props.events).map((event, index) => {
                                return <EventCard navigation={this.props.navigation} event={this.props.events[event.id]}
                                    key={event.id} />
                            })
                    }
                    <View style={{ height: Expo.Constants.statusBarHeight + 50, backgroundColor: '#eae9ef' }}></View>
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
