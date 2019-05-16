import React from 'react';
import {
    Dimensions,
    View,
    ScrollView, Alert
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
    ActionSheet, Item, Input, Form, Container, Button
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {
    GetGroupInfo,
    GetGroupMembers, GroupsActionType,
    RemoveGroupMember,
    UpdateMemberRole
} from "../../redux/Groups/groups.actions";
import {HeaderBackgroundColor, Primary, ScreenBackgroundColor} from "../../../Style/Constant";
import {AddUsers} from "./AddUsers";
import {GroupDetailScreenGroupName} from "./GroupDetailScreenGroupName";
import Loader from "../../Components/Loader";
import {GroupDetailScreenImagePicker} from "./GroupDetailScreenImagePicker";

export class _GroupDetailScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        if (navigation.state.params !== undefined) {
            return {
                headerRight: <View>{navigation.state.params.headerRight}</View>
            }
        }
    };

    constructor(props) {
        super(props);
        if (this.props.navigation.state.params.group.members === undefined) {
            // this.props.GetGroupDetail(this.props.navigation.state.params.group.id);
            this.props.GetGroupInfo(this.props.navigation.state.params.group.id);
            // this.props.GetGroupMembers(this.props.navigation.state.params.group.id);
        }
    }

    componentWillMount() {
        const {setParams} = this.props.navigation;
        setParams({headerRight: this.headerRightRender()});
    }

    headerRightRender() {
        return (
            <Button transparent onPress={() => {
                const BUTTONS = [];
                const ButtonsCallback = [];
                BUTTONS.push("Edit group info");
                ButtonsCallback.push(() => {
                    this.groupName.openEditModal();
                });
                BUTTONS.push("Edit group image");
                ButtonsCallback.push(() => {
                    this.groupImage.openEditModal();
                });
                BUTTONS.push("Cancel");
                ButtonsCallback.push(() => {
                });
                const CANCEL_INDEX = BUTTONS.length - 1;
                ActionSheet.show(
                    {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        title: "Edit group"
                    },
                    buttonIndex => {
                        ButtonsCallback[buttonIndex]();
                    })

            }}>
                <Icon type={"SimpleLineIcons"} name='options-vertical' style={{color: '#064C96'}}/>
            </Button>
        )
    }

    render() {
        const group = this.props.groups.groups[this.props.navigation.state.params.group.id];
        if (group === undefined || group.members === undefined || group.description === undefined)
            return (
                <Container style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Loader/>
                </Container>
            );
        console.log('gourp',group.members)
        let isAdmin = false
        for (let i = 0; i < group.members.length; i++) {
            if (this.props.login.pseudo === group.members[i].pseudo && group.members[i].role === 'admin') {
                isAdmin = true
            }
        }
        // const isAdmin = group.members[this.props.login.pseudo].role === "Admin";
        console.log('users', isAdmin, this.props)
        return (
            <ScrollView style={{paddingLeft: 10, paddingRight: 10, height: Dimensions.get('window').height, backgroundColor: ScreenBackgroundColor}}>
                <GroupDetailScreenGroupName group={group} onRef={ref => (this.groupName = ref)}/>
                <GroupDetailScreenImagePicker group={group} onRef={ref => (this.groupImage = ref)}/>
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
                        {Object.values(group.members).map((member, index) => {
                            return (
                                <ListItem key={index} avatar>
                                    <Left>
                                        <Thumbnail source={{uri: this.props.users[member.pseudo] === undefined ? null : this.props.users[member.pseudo].image}}/>
                                    </Left>
                                    <Body>
                                    <Text>{member.pseudo}</Text>
                                    {/*<Text style={{color: '#ef3434'}}*/}
                                    {/*note>{member.role === 'Admin' ? 'Administrator' : null}</Text>*/}
                                    </Body>
                                    <Right>
                                        <Icon style={{marginTop: 10, fontSize: 28}} type='SimpleLineIcons'
                                              name='options-vertical' onPress={() => {
                                            const BUTTONS = [];
                                            const ButtonsCallback = [];
                                            if (isAdmin) {
                                                // BUTTONS.push((member.role === 'Admin' ? "Remove as admin" : "Make admin"));
                                                BUTTONS.push(this.props.login.pseudo === member.pseudo ? "Quit group" : "Remove from group");
                                                // ButtonsCallback.push(() => {
                                                //     this.ChangeRoleClicked(group.id, member);
                                                // });
                                                ButtonsCallback.push(() => {
                                                    this.props.RemoveGroupMember(group.id, member, this.props.login.pseudo);
                                                });
                                            }
                                            else if (this.props.login.pseudo === member.pseudo) {
                                                BUTTONS.push("Quit group");
                                                ButtonsCallback.push(() => {
                                                    this.props.RemoveGroupMember(group.id, member, this.props.login.pseudo);
                                                });
                                            }
                                            BUTTONS.push("Cancel");
                                            ButtonsCallback.push(() => {
                                            });
                                            const CANCEL_INDEX = BUTTONS.length - 1;
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
        RemoveGroupMember: (groupId, member, Selfpseudo) => dispatch(RemoveGroupMember(groupId, member, Selfpseudo))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        groups: state.group,
        login: state.login,
        users : state.user.users
    }
};

export const GroupDetailScreen = connect(mapStateToProps, mapDispatchToProps)(_GroupDetailScreen);
