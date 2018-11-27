import React from 'react';
import {Dimensions, Platform, View, ScrollView, Alert} from 'react-native';
import {
    Text,
    Header,
    Body,
    Title,
    List,
    ListItem,
    Card,
    CardItem,
    Thumbnail,
    Left,
    Right,
    Content,
    Button,
    Icon
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {GetGroupMembers, GetGroupMembersSuccess, GetGroups} from "../redux/Groups/groups.actions";
import * as Animatable from 'react-native-animatable';
import {HeaderBackgroundColor} from "../../Style/Constant";

export class _GroupDetailScreen extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.navigation.state.params.group.members === undefined) {
            this.props.GetGroupMembers(this.props.navigation.state.params.group.id);
        }
    }

    render() {
        const group = this.props.groups.groups.find((g) => {
            return (g.id === this.props.navigation.state.params.group.id);
        });
        return (
            <ScrollView style={{marginLeft: 10, marginRight: 10, height: Dimensions.get('window').height}}>
                {
                    group.members === undefined ? null :
                        <List>
                            {group.members.map((member, index) => {
                                return (
                                    <ListItem key={index} avatar>
                                        <Left>
                                            <Thumbnail source={{uri: 'https://picsum.photos/200/300/?random'}}/>
                                        </Left>
                                        <Body>
                                        <Text>{member.pseudo}</Text>
                                        </Body>
                                        <Right>
                                            <Icon type='SimpleLineIcons' name='options-vertical'/>
                                        </Right>
                                    </ListItem>
                                );
                            })}
                        </List>
                }
            </ScrollView>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetGroupMembers: (id) => dispatch(GetGroupMembers(id))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        groups: state.group,
        login: state.login
    }
};

export const GroupDetailScreen = connect(mapStateToProps, mapDispatchToProps)(_GroupDetailScreen);
