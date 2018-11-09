import React from 'react';
import {Platform, View} from 'react-native';
import {Container, Text, Header, Content, Footer, FooterTab, Button, Icon, Body, Title} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {GetGroup, GroupsActionType} from "../redux/Groups/groups.actions";


export class _Groups extends React.Component {
    constructor(props) {
        super(props);
        this.props.GetGroup(1);
    }

    render() {
        const groupInfo = this.props.groups.groups;
        return (
            <View style={{
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }}>
                <Header androidStatusBarColor="#34495e" style={{backgroundColor: '#2477d6'}}>
                    <Body>
                    <Title>Groups</Title>
                    </Body>
                </Header>
                {groupInfo !== undefined ?
                    <View>
                        <Text>Group name : {groupInfo.name}</Text>
                        <Text>Group members : </Text>
                        {groupInfo.members.map((data, idx) => {
                            console.log('data', data.pseudo);
                            return (
                                <View key={idx}>
                                    <Text>Pseudo : {data.pseudo}</Text>
                                </View>
                            );
                        })}
                    </View>
                    : null
                }
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetGroup: (groupId) => dispatch(GetGroup(groupId))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        groups: state.group
    }
};

export const Groups = connect(mapStateToProps, mapDispatchToProps)(_Groups);
