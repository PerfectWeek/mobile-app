import React from 'react';
import {
    Dimensions,
    View,
    ScrollView
} from 'react-native';
import {
    Text,
    Body,
    Title,
    List,
    ListItem,
    Thumbnail,
    Left,
    Right,
    Icon,
    ActionSheet, Item, Input, Form, Container
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {
    GetGroupInfo,
    GetGroupMembers,
    RemoveGroupMember,
    UpdateMemberRole
} from "../../redux/Groups/groups.actions";
import {HeaderBackgroundColor, Primary} from "../../../Style/Constant";
import {AddUsers} from "./AddUsers";
import {GroupDetailScreenGroupName} from "./GroupDetailScreenGroupName";
import Loader from "../../Components/Loader";

export class _GroupDetailScreen extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.navigation.state.params.group.members === undefined) {
            this.props.GetGroupInfo(this.props.navigation.state.params.group.id);
            this.props.GetGroupMembers(this.props.navigation.state.params.group.id);
        }
    }

    render() {
        const group = this.props.groups.groups.find((g) => {
            return (g.id === this.props.navigation.state.params.group.id);
        });
        if (group.members === undefined || group.description === undefined)
            return (
                <Container style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Loader/>
                </Container>
            );
        return (
            <ScrollView style={{marginLeft: 10, marginRight: 10, height: Dimensions.get('window').height}}>
                <GroupDetailScreenGroupName group={group}/>
                <Title style={{
                    fontSize: 18,
                    color: 'grey',
                    fontFamily: 'Lato_Medium',
                    marginTop: 20,
                    textAlign: 'left',
                    marginLeft: 5
                }}>Description:</Title>
                <Text style={{
                    color: 'black',
                    fontFamily: 'Lato_Medium',
                    fontSize: 18,
                    marginTop: 20,
                    textAlign: 'left',
                    marginLeft: 5
                }}>{group.description}</Text>
                <View>
                    <Title style={{
                        fontSize: 18,
                        color: 'grey',
                        fontFamily: 'Lato_Medium',
                        marginTop: 20,
                        textAlign: 'left',
                        marginLeft: 5
                    }}>Members:</Title>
                    <List>
                        <ListItem onPress={() => {
                            this.addUsers.openModal();
                        }}>
                            <Body style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                            }}>
                            <Icon style={{marginLeft: 10, color: Primary, fontSize: 32}}
                                  type='MaterialIcons'
                                  name='group-add'/>
                            <Text style={{marginBottom: 0, marginLeft: 30}}>Add Members</Text>
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
                                        <Icon style={{marginTop:10, fontSize:28}} type='SimpleLineIcons' name='options-vertical' onPress={() => {
                                            // const BUTTONS = [(member.role === 'Admin' ? "Remove as admin" : "Make admin"), "Remove from group", "Cancel"];
                                            const BUTTONS = ["Remove from group", "Cancel"];
                                            const CANCEL_INDEX = BUTTONS.length - 1;
                                            // const ButtonsCallback = [() => {
                                            //     this.ChangeRoleClicked(group.id, member);
                                            // }, () => {
                                            //     this.props.RemoveGroupMember(group.id, member);
                                            // }, () => {
                                            // }];
                                            const ButtonsCallback = [() => {
                                                this.props.RemoveGroupMember(group.id, member);
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
        GetGroupInfo: (id) => dispatch(GetGroupInfo(id)),
        UpdateMemberRole: (groupId, member, newRole) => dispatch(UpdateMemberRole(groupId, member, newRole)),
        RemoveGroupMember: (groupId, member) => dispatch(RemoveGroupMember(groupId, member))
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
