import React from 'react';
import {
    Dimensions,
    Platform,
    View,
    ScrollView,
    Alert,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';
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
    Icon,
    ActionSheet, Item, Input, Form
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {GetGroupMembers, GetGroupMembersSuccess, GetGroups, UpdateMemberRole} from "../../redux/Groups/groups.actions";
import * as Animatable from 'react-native-animatable';
import {HeaderBackgroundColor} from "../../../Style/Constant";
import {LoginActionsType} from "../../redux/Login/login.actions";
// import Modal from "../../Components/Modal";
import {validateEmail} from "../../Utils/utils";
import {AddUsers} from "./AddUsers";
// import AddUsers from "./AddUsers";

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
        if (group.members === undefined)
            return null;
        return (
            <ScrollView style={{marginLeft: 10, marginRight: 10, height: Dimensions.get('window').height}}>
                <Title
                    style={{color: 'black', fontFamily: 'Lato_Bold', fontSize: 22, marginTop: 20}}>{group.name}</Title>

                <View>
                    <Title style={{
                        color: 'black',
                        fontFamily: 'Lato_Bold',
                        fontSize: 18,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    }}>Members:</Title>
                    <List>
                        <ListItem onPress={() => {
                            // console.log(this.addUsers);
                            this.addUsers.openModal();
                        }}>
                            <Body style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                            }}>
                            <Icon style={{marginLeft: 10, color: HeaderBackgroundColor, fontSize: 32}}
                                  type='Ionicons'
                                  name='person-add'/>
                            <Text style={{marginBottom: 0, marginLeft: 30}}>Add Member</Text>
                            </Body>
                        </ListItem>
                        {group.members.map((member, index) => {
                            return (
                                <ListItem key={index} avatar>
                                    <Left>
                                        <Thumbnail source={{uri: 'https://picsum.photos/200/300/?random'}}/>
                                    </Left>
                                    <Body>
                                    <Text>{member.pseudo}</Text>
                                    <Text style={{color: '#ef3434'}}
                                          note>{member.role === 'Admin' ? 'Administrator' : null}</Text>
                                    </Body>
                                    <Right>
                                        <Icon type='SimpleLineIcons' name='options-vertical' onPress={() => {
                                            const BUTTONS = ["View Profile", (member.role === 'Admin' ? "Remove as admin" : "Make admin"), "Remove from group", "Cancel"];
                                            const CANCEL_INDEX = BUTTONS.length - 1;
                                            const ButtonsCallback = [() => {
                                            }, () => {
                                                this.ChangeRoleClicked(group.id, member);
                                            }, () => {
                                            }, () => {
                                            }];
                                            ActionSheet.show(
                                                {
                                                    options: BUTTONS,
                                                    cancelButtonIndex: CANCEL_INDEX,
                                                    title: "Manage member"
                                                },
                                                buttonIndex => {
                                                    ButtonsCallback[buttonIndex]();
                                                })

                                        }}/>
                                    </Right>
                                </ListItem>
                            );
                        })}
                    </List>
                </View>

                <AddUsers groupId={group.id} onRef={ref => (this.addUsers = ref)}/>

            </ScrollView>
        )
    }

    ChangeRoleClicked(groupId, member) {
        this.props.UpdateMemberRole(groupId, member, member.role === "Admin" ? "Spectator" : "Admin");
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetGroupMembers: (id) => dispatch(GetGroupMembers(id)),
        UpdateMemberRole: (groupId, member, newRole) => dispatch(UpdateMemberRole(groupId, member, newRole))
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
