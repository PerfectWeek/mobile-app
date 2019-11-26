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

import i18n from 'i18n-js';
import axios from "react-native-axios";
const uuidv4 = require('uuid/v4');

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
            console.log(this.props.navigation.state.params)
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
                BUTTONS.push(i18n.t('groups.edit.grpinfo'));
                ButtonsCallback.push(() => {
                    this.groupName.openEditModal();
                });
                BUTTONS.push(i18n.t('groups.edit.title'));
                ButtonsCallback.push(() => {
                    this.groupImage.openEditModal();
                });
                BUTTONS.push(i18n.t('other.cancel'));
                ButtonsCallback.push(() => {
                });
                const CANCEL_INDEX = BUTTONS.length - 1;
                ActionSheet.show(
                    {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        title: i18n.t('groups.edit.grpinfo')
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
        // console.log("DEL", this.props.groups, this.props.navigation.state.params.group.id)
        const group = this.props.groups.groups[this.props.navigation.state.params.group.id];
        // console.log('DL', group)
        if (group === undefined || group.members === undefined)
            return (
                <Container style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Loader/>
                </Container>
            );


        let isAdmin = false;
        group.members.forEach((mem) => {
            if (mem.id === this.props.login.id && mem.role === 'admin')
                isAdmin = true;
        })
        return (
            <ScrollView style={{
                paddingLeft: 10,
                paddingRight: 10,
                height: Dimensions.get('window').height,
                backgroundColor: ScreenBackgroundColor
            }}>
                <GroupDetailScreenGroupName group={group} onRef={ref => (this.groupName = ref)}/>
                <GroupDetailScreenImagePicker group={group} onRef={ref => (this.groupImage = ref)}/>
                <View>
                    <Title style={{
                        fontSize: 18,
                        color: 'grey',
                        fontFamily: 'Lato_Medium',
                        marginTop: 20,
                        textAlign: 'left',
                        marginLeft: 5
                    }}>{i18n.t('groups.members')} :</Title>
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
                            <Text style={{marginBottom: 0, marginLeft: 30}}>{i18n.t('other.addusers.addmembers')}</Text>
                            </Body>
                        </ListItem>
                        {Object.values(group.members).map((member, index) => {
                            console.log('mm', member)
                            return (
                                <ListItem key={index} avatar>
                                    <Left>
                                        <Thumbnail
                                            source={{uri: `${axios.defaults.baseURL}/users/${member.id}/images/profile?rand=${uuidv4()}`}}/>
                                    </Left>
                                    <Body>
                                    <Text>{member.name}</Text>
                                    <Text style={{color: 'gray'}}
                                          note>{member.role}</Text>
                                    </Body>
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
        this.props.UpdateMemberRole(groupId, member, member.role === "admin" ? "spectator" : "admin");
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
        users: state.user.users
    }
};

export const GroupDetailScreen = connect(mapStateToProps, mapDispatchToProps)(_GroupDetailScreen);
