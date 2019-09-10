import React, {Component} from 'react';
import {Body, Container, Icon, Left, List, ListItem, Text, Thumbnail, View} from 'native-base';
import connect from 'react-redux/es/connect/connect';
import {Primary, ScreenBackgroundColor} from "../../../Style/Constant";
import {Dimensions, ScrollView, RefreshControl} from "react-native";
import {AddFriends} from "./AddFriends";
import {GetFriends} from "../../redux/Friends/friends.actions";
import Loader from "../../Components/Loader";
import {PageHit} from "expo-analytics";

import i18n from 'i18n-js';

export class _FriendsList extends Component {
    // static navigationOptions = {
    //     header: null
    // };

    constructor(props) {
        super(props);
        this.props.GetFriends();
        this.props.login.analytics.hit(new PageHit('FriendsList'));

    }

    _onRefresh = () => {
        this.props.GetFriends();
    };

    render() {
        if (this.props.friends === undefined)
            return (<Loader/>);
        return (
            <Container style={{
                backgroundColor: ScreenBackgroundColor
            }}>
                <AddFriends onRef={ref => (this.addUsers = ref)}/>
                <ScrollView style={{
                    backgroundColor: ScreenBackgroundColor,
                    marginLeft: 10,
                    marginRight: 10,
                    height: Dimensions.get('window').height - 10
                }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.props.loading}
                                    onRefresh={this._onRefresh}
                                />}>
                    <List>
                        <ListItem onPress={() => {
                            this.addUsers.openModal();
                        }}>
                            <Body style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                            <Icon style={{marginLeft: 10, color: Primary, fontSize: 32}}
                                  type='MaterialIcons'
                                  name='group-add'/>
                            <Text style={{marginBottom: 0, marginLeft: 30}}>{i18n.t('profile.addfriends')}</Text>
                            </Body>
                        </ListItem>
                        {
                            this.props.friends.map((friend, index) => {
                                return (

                                    <ListItem key={index} onPress={() => {
                                        // this.props.navigation.navigate('FriendDetails', {invite: invite});
                                    }} avatar>
                                        <Left>
                                            <Thumbnail
                                                large
                                                source={{uri: friend.image}}/>
                                        </Left>
                                        <Body style={{height: 60}}>
                                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{friend.pseudo}</Text>
                                        </Body>
                                    </ListItem>

                                )
                            })
                        }
                    </List>

                </ScrollView>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetFriends: () => dispatch(GetFriends())

    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        loading: state.friends.loading,
        friends: state.friends.friends,
        login: state.login

    }
};

export const FriendsList = connect(mapStateToProps, mapDispatchToProps)(_FriendsList);
